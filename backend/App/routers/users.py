from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from typing import Optional
from pydantic import BaseModel

from ..database import get_session
from ..models import User
from ..oauth2 import get_current_user

router = APIRouter(prefix="/users", tags=["Users"])

class UserProfileUpdate(BaseModel):
    name: Optional[str] = None
    bio: Optional[str] = None
    home_city: Optional[str] = None

@router.get("/me", response_model=User)
def get_current_user_profile(current_user: User = Depends(get_current_user)):
    return current_user

@router.put("/profile", response_model=User)
def update_user_profile(
    profile_data: UserProfileUpdate,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    # Fetch fresh user object from session to ensure tracking
    user = session.get(User, current_user.id)
    if not user:
         raise HTTPException(status_code=404, detail="User not found")
    
    if profile_data.name is not None:
        user.name = profile_data.name
    if profile_data.bio is not None:
        user.bio = profile_data.bio
    if profile_data.home_city is not None:
        user.home_city = profile_data.home_city
        
    session.add(user)
    session.commit()
    session.refresh(user)
    return user
