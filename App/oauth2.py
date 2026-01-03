# app/oauth2.py
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from sqlmodel import Session
from .database import get_session
from .models import User
from .config import settings

# This tells FastAPI: "Look for the token in the URL header: Authorization: Bearer <token>"
# tokenUrl="login" tells Swagger UI where to send the username/password to get a token.
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

def get_current_user(token: str = Depends(oauth2_scheme), session: Session = Depends(get_session)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        # 1. DECODE THE TOKEN
        payload = jwt.decode(token, settings.secret_key, algorithms=[settings.algorithm])
        
        # 2. EXTRACT ID
        # "user_id" must match what we put in create_access_token
        user_id: int = payload.get("user_id")
        
        if user_id is None:
            raise credentials_exception
            
    except JWTError:
        raise credentials_exception

    # 3. FETCH USER FROM DB
    # We check if the user actually still exists (maybe they were deleted 5 mins ago)
    user = session.get(User, user_id)
    
    if user is None:
        raise credentials_exception
        
    return user