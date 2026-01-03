from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from typing import List, Optional
from datetime import date, time

from ..database import get_session
from ..models import Trip, City, ItineraryStop, Activity, User, ExpenseCategory
from ..oauth2 import get_current_user

router = APIRouter(prefix="/trips", tags=["Trips"])

# --- Pydantic Models for Requests ---
from pydantic import BaseModel

class TripCreateSchema(BaseModel):
    destination: str
    start_date: date
    end_date: date
    travelers: int = 1
    budget: float = 0.0

class StopCreate(BaseModel):
    city_id: int
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
    return new_trip

@router.get("/", response_model=List[Trip])
def get_my_trips(
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    statement = select(Trip).where(Trip.owner_id == current_user.id)
    return session.exec(statement).all()

@router.get("/{trip_id}")
def get_trip_details(
    trip_id: int,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    trip = session.get(Trip, trip_id)
    if not trip:
        raise HTTPException(status_code=404, detail="Trip not found")
        
    # Check permission (Owner or Public)
    if trip.owner_id != current_user.id and not trip.is_public:
         raise HTTPException(status_code=403, detail="Not authorized to view this trip")
    
    return trip

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
        
    # 2. Verify City
    city = session.get(City, stop_data.city_id)
    if not city:
        raise HTTPException(status_code=404, detail="City not found")
        
    # 3. Create Stop
    new_stop = ItineraryStop(
        trip_id=trip_id,
        **stop_data.dict()
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
