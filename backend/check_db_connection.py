from sqlmodel import create_engine, text
from App.config import settings
import sys

def check_connection():
    print(f"Testing connection to: {settings.database_url.split('@')[-1]}") # Hide password
    try:
        engine = create_engine(settings.database_url)
        with engine.connect() as conn:
            result = conn.execute(text("SELECT 1"))
            print("Connection Successful! Result:", result.fetchone())
    except Exception as e:
        print("Connection Failed!")
        print(e)
        sys.exit(1)

if __name__ == "__main__":
    check_connection()
