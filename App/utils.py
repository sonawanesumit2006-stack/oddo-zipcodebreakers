# app/utils.py
from passlib.context import CryptContext
from datetime import datetime, timedelta
from jose import jwt
from .config import settings

# Setup the hashing engine (bcrypt is the industry standard)
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict):
    # 1. Copy the data so we don't modify the original
    to_encode = data.copy()
    
    # 2. Set Expiration Time
    expire = datetime.utcnow() + timedelta(minutes=settings.access_token_expire_minutes)
    
    # 3. Add 'exp' (Expiration) to the payload
    to_encode.update({"exp": expire})
    
    # 4. Create the JWT String
    # We sign it using our SECRET_KEY and the chosen ALGORITHM
    encoded_jwt = jwt.encode(to_encode, settings.secret_key, algorithm=settings.algorithm)
    
    return encoded_jwt
