from sqlmodel import create_engine, Session, SQLModel
from fastapi import FastAPI
from contextlib import asynccontextmanager
from .config import settings

engine = create_engine(settings.database_url)
def create_db_and_table():
    SQLModel.metadata.create_all(engine)

def get_session():
    with Session(engine) as session:
        yield session

@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db_and_table()
    yield