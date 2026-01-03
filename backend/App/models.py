from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List
from datetime import date, time, datetime
from enum import Enum

# --- ENUMS ---
class ExpenseCategory(str, Enum):
    TRANSPORT = "Transport"
    STAY = "Stay"
    FOOD = "Food"
    ACTIVITY = "Activity"
    OTHER = "Other"

class TripStatus(str, Enum):
    PLANNING = "Planning"
    ACTIVE = "Active"
    COMPLETED = "Completed"
    CANCELLED = "Cancelled"


# --- USERS ---
class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str # Full Name
    username: str = Field(index=True, unique=True)
    email: str = Field(index=True, unique=True)
    hashed_password: str
    
    # Profile Fields
    avatar_url: Optional[str] = None
    bio: Optional[str] = None
    home_city: Optional[str] = None
    
    # Relationships
    trips: List["Trip"] = Relationship(back_populates="owner")

# --- MASTER DATA ---
class City(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(index=True)
    country: str
    image_url: Optional[str] = None
    description: Optional[str] = None
    
    # Relationships
    stops: List["ItineraryStop"] = Relationship(back_populates="city")

# --- TRIPS ---
class Trip(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    description: Optional[str] = None
    start_date: Optional[date] = None
    end_date: Optional[date] = None
    budget_limit: float = 0.0
    travelers: int = 1
    status: TripStatus = TripStatus.PLANNING
    destination_cache: Optional[str] = None # Stores "Where to?" string
    is_public: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    # Foreign Key
    owner_id: int = Field(foreign_key="user.id")
    
    # Relationships
    owner: User = Relationship(back_populates="trips")
    stops: List["ItineraryStop"] = Relationship(back_populates="trip")

class ItineraryStop(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    
    # Foreign Keys
    trip_id: int = Field(foreign_key="trip.id")
    city_id: int = Field(foreign_key="city.id")
    
    arrival_date: Optional[date] = None
    departure_date: Optional[date] = None
    order_index: int = 0
    
    # Relationships
    trip: Trip = Relationship(back_populates="stops")
    city: City = Relationship(back_populates="stops")
    activities: List["Activity"] = Relationship(back_populates="stop")

class Activity(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    
    stop_id: int = Field(foreign_key="itinerarystop.id")
    
    title: str
    description: Optional[str] = None
    activity_date: Optional[date] = None
    start_time: Optional[time] = None
    is_completed: bool = False
    
    # Budget Fields
    category: ExpenseCategory = ExpenseCategory.OTHER
    cost: float = 0.0
    
    # Relationships
    stop: ItineraryStop = Relationship(back_populates="activities")