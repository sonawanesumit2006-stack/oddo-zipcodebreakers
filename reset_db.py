from sqlmodel import SQLModel
from App.database import engine
from App.models import User, Trip, City, ItineraryStop, Activity

def reset_db():
    print("Dropping all tables...")
    SQLModel.metadata.drop_all(engine)
    print("Creating all tables...")
    SQLModel.metadata.create_all(engine)
    print("Database reset successfully.")

if __name__ == "__main__":
    reset_db()
