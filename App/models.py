from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List
from datetime import date, time
from enum import Enum

# --- ENUMS ---
class ActivityCategory(str, Enum):
    STAY = "Stay"
    TRAVEL = "Travel"
    FOOD = "Food"
    ACTIVITY = "Activity"

# --- USERS ---
class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    username: str = Field(index=True, unique=True)
    email: str = Field(index=True, unique=True)
    hashed_password: str
    
    # New Profile Fields
    avatar_url: Optional[str] = None
    bio: Optional[str] = None
    home_city: Optional[str] = None
    
    # Relationships
    trips: List["Trip"] = Relationship(back_populates="user")

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
    is_public: bool = False
    budget_limit: Optional[float] = None
    
    # Foreign Key
    user_id: int = Field(foreign_key="user.id")
    
    # Relationships
    user: User = Relationship(back_populates="trips")
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
    category: ActivityCategory
    cost: Optional[float] = 0.0
    activity_date: Optional[date] = None
    start_time: Optional[time] = None
    is_completed: bool = False
    
    # Relationships
    stop: ItineraryStop = Relationship(back_populates="activities")