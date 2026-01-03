from App.database import engine, create_db_and_table
from sqlmodel import SQLModel, Session
from App.models import User
from App.utils import hash_password

def reset_database():
    print("Resetting database...")
    print("Dropping all tables...")
    SQLModel.metadata.drop_all(engine)
    
    print("Creating tables...")
    create_db_and_table()
    
    print("Seeding test user...")
    with Session(engine) as session:
        user = User(
            name="Test User",
            username="test@example.com",
            email="test@example.com",
            hashed_password=hash_password("password123")
        )
        session.add(user)
        session.commit()
    
    print("Database reset complete.")

if __name__ == "__main__":
    reset_database()
