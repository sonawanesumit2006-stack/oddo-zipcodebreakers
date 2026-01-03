# app/routers/auth.py
from fastapi import APIRouter, Depends, HTTPException, status, File, UploadFile, Form
from fastapi.security import OAuth2PasswordRequestForm 
from typing import Optional
import shutil
from pathlib import Path
import uuid

from sqlmodel import Session, select
from pydantic import BaseModel
from ..database import get_session
from ..models import User
from ..utils import hash_password, verify_password, create_access_token

router = APIRouter(tags=["authentication"])

# Define path for uploads
UPLOAD_DIR = Path("App/uploads")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

class UserLogin(BaseModel):
    username: str
    password: str

@router.post("/register")
async def register_user(
    name: str = Form(...),
    username: str = Form(...),
    email: str = Form(...),
    password: str = Form(...),
    bio: Optional[str] = Form(None),
    home_city: Optional[str] = Form(None),
    avatar_file: Optional[UploadFile] = File(None),
    session: Session = Depends(get_session)
):
    
    statement = select(User).where(
        (User.username == username) | (User.email == email)
    )
    existing_user = session.exec(statement).first()
    
    if existing_user:
        raise HTTPException(status_code=400, detail="Username or Email already taken")
    
    hashed_pwd = hash_password(password)
    
    # Handle Avatar Upload
    avatar_url = None
    if avatar_file:
        # Create unique filename
        file_extension = Path(avatar_file.filename).suffix
        filename = f"{uuid.uuid4()}{file_extension}"
        file_path = UPLOAD_DIR / filename
        
        # Save file
        with file_path.open("wb") as buffer:
            shutil.copyfileobj(avatar_file.file, buffer)
            
        # Set URL (assuming mounted at /static)
        avatar_url = f"/static/{filename}"

    new_user = User(
        name=name,
        username=username,
        email=email,
        hashed_password=hashed_pwd,
        bio=bio,
        home_city=home_city,
        avatar_url=avatar_url 
    )
    
    session.add(new_user)
    session.commit()
    session.refresh(new_user)
    
    return {"message": "User created successfully", "user_id": new_user.id}

class UserPublic(BaseModel):
    id: int
    name: str
    username: str
    email: str
    avatar_url: Optional[str] = None
    bio: Optional[str] = None
    home_city: Optional[str] = None

class LoginResponse(BaseModel):
    access_token: str
    token_type: str
    user: UserPublic

@router.post("/login", response_model=LoginResponse)
def login_user(
    user_credentials: OAuth2PasswordRequestForm = Depends(), 
    session: Session = Depends(get_session)
):
    # Search by EMAIL instead of username
    statement = select(User).where(User.email == user_credentials.username)
    user = session.exec(statement).first()

    if not user or not verify_password(user_credentials.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, 
            detail="Invalid Credentials"
        )

    access_token = create_access_token(data={"user_id": user.id})

    return {
        "access_token": access_token, 
        "token_type": "bearer",
        "user": user
    }