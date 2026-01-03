from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from typing import List, Optional
from datetime import date, time, datetime 
from sqlalchemy.orm import selectinload

from ..database import get_session
from ..models import Trip, City, ItineraryStop, Activity, User, ExpenseCategory, TripStatus
from ..oauth2 import get_current_user

router = APIRouter(prefix="/trips", tags=["Trips"])

# --- Pydantic Models for Requests/Responses ---
from pydantic import BaseModel

# --- Pydantic Models for Requests/Responses ---
from pydantic import BaseModel

class cityRead(BaseModel):
    id: int
    name: str
    country: str
    image_url: Optional[str] = None

class ActivityRead(BaseModel):
    id: int
    title: str
    description: Optional[str] = None
    category: ExpenseCategory
    cost: float = 0.0
    activity_date: Optional[date] = None
    start_time: Optional[time] = None
    is_completed: bool = False

class StopRead(BaseModel):
    id: int
    city: cityRead
    arrival_date: Optional[date] = None
    departure_date: Optional[date] = None
    order_index: int
    activities: List[ActivityRead] = []

class TripRead(BaseModel):
    id: int
    title: str
    description: Optional[str] = None
    destination_cache: Optional[str] = None
    cover_image_url: Optional[str] = None
    start_date: Optional[date] = None
    end_date: Optional[date] = None
    budget_limit: float = 0.0
    travelers: int = 1
    status: TripStatus
    is_public: bool = False
    created_at: datetime
    owner_id: int
    stops: List[StopRead] = []
    total_spent: Optional[float] = 0.0

class TripCreateSchema(BaseModel):
    destination: str
    start_date: date
    end_date: date
    travelers: int = 1
    budget: float = 0.0
    stops: List[str] = []

class StopCreate(BaseModel):
    city_id: Optional[int] = None
    city_name: Optional[str] = None
    arrival_date: Optional[date] = None
    departure_date: Optional[date] = None
    order_index: int = 0

class ActivityCreate(BaseModel):
    title: str
    description: Optional[str] = None
    activity_date: Optional[date] = None
    start_time: Optional[time] = None
    category: ExpenseCategory = ExpenseCategory.OTHER
    cost: float = 0.0

# --- ENDPOINTS ---

@router.post("/", response_model=Trip)
def create_trip(
    trip_data: TripCreateSchema, 
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    # Auto-generate Title
    generated_title = f"Trip to {trip_data.destination}"

    new_trip = Trip(
        title=generated_title,
        destination_cache=trip_data.destination,
        start_date=trip_data.start_date,
        end_date=trip_data.end_date,
        travelers=trip_data.travelers,
        budget_limit=trip_data.budget,
        owner_id=current_user.id,
        # Default status is PLANNING via Model
    )
    
    session.add(new_trip)
    session.commit()
    session.refresh(new_trip)

    # Process Stops
    for index, city_name in enumerate(trip_data.stops):
        # 1. Get or Create City
        # Check case-insensitive existence if possible, but safe simple match for now
        city = session.exec(select(City).where(City.name == city_name)).first()
        if not city:
            city = City(name=city_name, country="Unknown") # Default country
            session.add(city)
            session.commit()
            session.refresh(city)
        
        # 2. Create Stop
        new_stop = ItineraryStop(
            trip_id=new_trip.id,
            city_id=city.id,
            order_index=index
        )
        session.add(new_stop)
    
    session.commit()
    session.refresh(new_trip)
    return new_trip

@router.get("/", response_model=List[TripRead])
def get_my_trips(
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    # Eager load stops, cities, and activities for the list view as well (optional but good for consistency)
    statement = select(Trip).where(Trip.owner_id == current_user.id).options(
        selectinload(Trip.stops).selectinload(ItineraryStop.city),
        selectinload(Trip.stops).selectinload(ItineraryStop.activities)
    )
    trips = session.exec(statement).all()
    
    # Calculate total_spent for each trip
    # This might be expensive for lists, but requested for TripRead
    trip_reads = []
    for trip in trips:
        total = sum(act.cost for stop in trip.stops for act in stop.activities)
        # Convert to Pydantic model and patch total_spent
        # Or let Pydantic construct it if we pass a dict-like or just assign attribute if it was a dynamic object
        # Since SQLModel objects are not dicts, we can use TripRead.from_orm(trip) but adding total_spent is tricky
        # Easiest: Construct TripRead manually or extend result
        
        # Simple hack: Attach property if valid, or construct Pydantic obj
        # Because we need to map internal structure, automatic mapping is best. 
        # But total_spent is not on SQLModel. 
        # We can construct the dict.
        trip_dict = trip.model_dump()
        trip_dict['stops'] = [
            {
                **stop.model_dump(),
                'city': stop.city.model_dump(),
                'activities': [act.model_dump() for act in stop.activities]
            } for stop in trip.stops
        ]
        trip_dict['total_spent'] = total
        trip_reads.append(TripRead(**trip_dict))
        
    return trip_reads

@router.get("/{trip_id}", response_model=TripRead)
def get_trip_details(
    trip_id: int,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    statement = select(Trip).where(Trip.id == trip_id).options(
        selectinload(Trip.stops).selectinload(ItineraryStop.city),
        selectinload(Trip.stops).selectinload(ItineraryStop.activities)
    )
    trip = session.exec(statement).first()
    
    if not trip:
        raise HTTPException(status_code=404, detail="Trip not found")
        
    # Check permission (Owner or Public)
    if trip.owner_id != current_user.id and not trip.is_public:
         raise HTTPException(status_code=403, detail="Not authorized to view this trip")
    
    # Calculate total spent
    total_spent = sum(act.cost for stop in trip.stops for act in stop.activities)
    
    # Return as TripRead with computed field
    trip_dict = trip.model_dump()
    # Explicitly map stops because model_dump might only dump immediate fields or fail on relations depending on config
    # SQLModel model_dump generally doesn't recurse relations unless configured?
    # Actually for response_model it does validation from ORM object. 
    # But for 'total_spent' we need to pass it. 
    # Let's construct TripRead explicitly using model_validate but passing extra context? 
    # Or just dict construction.
    
    trip_dict['stops'] = [
            {
                **stop.model_dump(),
                'city': stop.city.model_dump(),
                'activities': [act.model_dump() for act in stop.activities]
            } for stop in trip.stops
        ]
    trip_dict['total_spent'] = total_spent
    
    return TripRead(**trip_dict)

@router.get("/{trip_id}/stats")
def get_trip_stats(
    trip_id: int,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    statement = select(Trip).where(Trip.id == trip_id).options(
        selectinload(Trip.stops).selectinload(ItineraryStop.city),
        selectinload(Trip.stops).selectinload(ItineraryStop.activities)
    )
    trip = session.exec(statement).first()
    
    if not trip:
        raise HTTPException(status_code=404, detail="Trip not found")
    if trip.owner_id != current_user.id and not trip.is_public:
        raise HTTPException(status_code=403, detail="Not authorized")
        
    # Calculations
    total_budget = trip.budget_limit
    total_spent = 0.0
    category_breakdown = {}
    city_breakdown = []
    
    for stop in trip.stops:
        city_spent = 0.0
        for act in stop.activities:
            cost = act.cost
            total_spent += cost
            city_spent += cost
            
            # Category Breakdown
            cat_name = act.category.value if act.category else "Other"
            category_breakdown[cat_name] = category_breakdown.get(cat_name, 0) + cost
            
        city_breakdown.append({
            "city": stop.city.name,
            "amount": city_spent
        })
        
    return {
        "total_budget": total_budget,
        "total_spent": total_spent,
        "remaining_budget": total_budget - total_spent,
        "category_breakdown": category_breakdown,
        "city_breakdown": city_breakdown
    }

@router.post("/{trip_id}/stops", response_model=ItineraryStop)
def add_stop_to_trip(
    trip_id: int,
    stop_data: StopCreate,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    # 1. Verify Trip + Ownership
    trip = session.get(Trip, trip_id)
    if not trip:
        raise HTTPException(status_code=404, detail="Trip not found")
    if trip.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not owner of this trip")
    
    city_id = stop_data.city_id
    
    # Handle City Name if provided
    if not city_id and stop_data.city_name:
        city = session.exec(select(City).where(City.name == stop_data.city_name)).first()
        if not city:
            city = City(name=stop_data.city_name, country="Unknown")
            session.add(city)
            session.commit()
            session.refresh(city)
        city_id = city.id
        
    if not city_id:
        raise HTTPException(status_code=400, detail="City ID or Name required")
        
    # 2. Verify City (Redundant if we just created it, but good safety)
    city = session.get(City, city_id)
    if not city:
        raise HTTPException(status_code=404, detail="City not found")
        
    # 3. Create Stop
    new_stop = ItineraryStop(
        trip_id=trip_id,
        city_id=city_id, # type: ignore
        order_index=stop_data.order_index,
        arrival_date=stop_data.arrival_date,
        departure_date=stop_data.departure_date
    )
    session.add(new_stop)
    session.commit()
    session.refresh(new_stop)
    return new_stop

@router.post("/stops/{stop_id}/activities", response_model=Activity)
def add_activity_to_stop(
    stop_id: int,
    activity_data: ActivityCreate,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    # 1. Verify Stop
    stop = session.get(ItineraryStop, stop_id)
    if not stop:
        raise HTTPException(status_code=404, detail="Stop not found")
        
    # 2. Verify Trip Ownership (via stop.trip)
    # Note: stop.trip is lazy loaded, but session.get usually works perfectly for this check or we query join
    # For safety with SQLModel sync, access attribute triggers fetch
    if stop.trip.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not owner of this trip")
        
    # 3. Create Activity
    new_activity = Activity(
        stop_id=stop_id,
        **activity_data.dict()
    )
    session.add(new_activity)
    session.commit()
    session.refresh(new_activity)
    return new_activity
