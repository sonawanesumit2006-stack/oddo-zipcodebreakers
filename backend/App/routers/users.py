from fastapi import APIRouter, Depends, HTTPException, status, File, UploadFile
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

@router.post("/avatar", response_model=User)
def upload_avatar(
    file: UploadFile = File(...),
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    import shutil
    import os
    
    # Create upload directory if not exists
    UPLOAD_DIR = "App/uploads"
    os.makedirs(UPLOAD_DIR, exist_ok=True)
    
    # Generate unique filename or overwrite user's file
    # Simple strategy: user_{id}_avatar.ext
    file_ext = file.filename.split('.')[-1]
    filename = f"user_{current_user.id}_avatar.{file_ext}"
    file_path = os.path.join(UPLOAD_DIR, filename)
    
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
        
    # Update user profile
    # URL should be relative path served by StaticFiles
    # In main.py: app.mount("/static", StaticFiles(directory="App/uploads"), name="static")
    avatar_url = f"/static/{filename}"
    
    user = session.get(User, current_user.id)
    user.avatar_url = avatar_url
    session.add(user)
    session.commit()
    session.refresh(user)
    return user
