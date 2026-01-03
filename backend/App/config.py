# app/config.py
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    # These variables must exist in your .env file
    database_url: str
    secret_key: str
    algorithm: str = "HS256" # Default value if not in .env
    google_client_id: str
    google_client_secret: str
    access_token_expire_minutes: int = 30


    class Config:
        env_file = ".env" # Tells Pydantic to read from this file

# Create a single instance to use everywhere
settings = Settings()
print(settings.database_url)