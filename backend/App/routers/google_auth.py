from fastapi import APIRouter, Request, Depends, HTTPException
from authlib.integrations.starlette_client import OAuth
from sqlmodel import Session, select
from ..config import settings
from ..database import get_session
from ..models import User
from ..utils import create_access_token
import secrets # To generate random passwords for Google users

router = APIRouter(prefix="/auth/google", tags=["google_auth"])

# 1. SETUP OAUTH
oauth = OAuth()
oauth.register(
    name='google',
    client_id=settings.google_client_id,
    client_secret=settings.google_client_secret,
    server_metadata_url='https://accounts.google.com/.well-known/openid-configuration',
    client_kwargs={'scope': 'openid email profile'}
)

# 2. LOGIN ROUTE (Redirects to Google)
@router.get("/login")
async def google_login(request: Request):
    # Redirect URI must match what you put in Google Console EXACTLY
    redirect_uri = request.url_for('google_auth')
    return await oauth.google.authorize_redirect(request, redirect_uri)

# 3. CALLBACK ROUTE (Google comes back here)
@router.get("/callback", name="google_auth")
async def google_auth(request: Request, session: Session = Depends(get_session)):
    try:
        token = await oauth.google.authorize_access_token(request)
    except Exception as e:
        raise HTTPException(status_code=400, detail="Google Auth Failed")

    # Get User Info from Google
    user_info = token.get('userinfo')
    if not user_info:
        # Fallback if userinfo is missing from token
        user_info = await oauth.google.userinfo(token=token)
        
    email = user_info.get("email")
    name = user_info.get("name")
    picture = user_info.get("picture")
    
    # --- LOGIC: REGISTER OR LOGIN ---
    
    # A. Check if user exists
    statement = select(User).where(User.email == email)
    user = session.exec(statement).first()
    
    if not user:
        # B. Create New User
        # Since they used Google, they don't have a password. 
        # But our DB requires one. We generate a random one they will never use.
        random_password = secrets.token_urlsafe(32)
        
        # We assume username is email for Google users to avoid conflicts
        user = User(
            email=email,
            username=email, 
            name=name,
            hashed_password="GOOGLE_LOGIN_NO_PASSWORD", # Or hash the random string
            avatar_url=picture
        )
        session.add(user)
        session.commit()
        session.refresh(user)

    # C. Generate OUR Token (The same JWT we used for password login)
    access_token = create_access_token(data={"user_id": user.id})
    
    # D. Redirect to Frontend
    # We pass the token in the URL so the frontend can grab it
    # In production, using cookies is safer, but this is standard for simple apps.
    return RedirectResponse(url=f"http://localhost:4028/google-callback?token={access_token}")

# Helper for Redirect
from fastapi.responses import RedirectResponse