# app/routers/auth.py
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm 
from typing import Optional

from sqlmodel import Session, select
from pydantic import BaseModel
from ..database import get_session
from ..models import User
from ..utils import hash_password, verify_password, create_access_token

router = APIRouter(tags=["authentication"])

class UserRegister(BaseModel):
    name: str
    username: str
    email: str
    password: str
    bio: Optional[str] = None
    home_city: Optional[str] = None

class UserLogin(BaseModel):
    username: str
    password: str

@router.post("/register")
def register_user(user_data: UserRegister, session: Session = Depends(get_session)):
    
    statement = select(User).where(
        (User.username == user_data.username) | (User.email == user_data.email)
    )
    existing_user = session.exec(statement).first()
    
    if existing_user:
        raise HTTPException(status_code=400, detail="Username or Email already taken")
    
    hashed_pwd = hash_password(user_data.password)
    
    new_user = User(
        name=user_data.name,
        username=user_data.username,
        email=user_data.email,
        hashed_password=hashed_pwd,
        bio=user_data.bio,
        home_city=user_data.home_city
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
    statement = select(User).where(User.username == user_credentials.username)
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