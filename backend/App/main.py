import time
from .config import settings
from .database import lifespan
from fastapi import FastAPI,Request
from fastapi.openapi.utils import get_openapi
from .routers import auth  # Import auth
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware
from .routers import google_auth # Import new router
from .routers import trips # Import trips router
from .routers import users # Import users router

from fastapi.staticfiles import StaticFiles

app = FastAPI(lifespan=lifespan)
# Serve Uploads
app.mount("/static", StaticFiles(directory="App/uploads"), name="static")

# This encrypts cookies so we can safely store the "state" during the Google dance
app.add_middleware(SessionMiddleware, secret_key=settings.secret_key)

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:4028",
    "http://127.0.0.1:4028",
    "http://172.18.15.10:4028",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# app.include_router(items.router)
app.include_router(google_auth.router)
app.include_router(auth.router) # Plug it in
app.include_router(trips.router) # Register Trips Router
app.include_router(users.router) # Register Users Router

# Expose a simple HTTP Bearer (JWT) security scheme in the OpenAPI docs so
# the Swagger "Authorize" modal accepts a raw token (Authorization: Bearer <token>).
# This does not change your runtime security checks — it only adds the UI helper.
def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema
    openapi_schema = get_openapi(
        title=app.title,
        version=app.version,
        description=app.description,
        routes=app.routes,
    )
    components = openapi_schema.setdefault("components", {})
    security_schemes = components.setdefault("securitySchemes", {})
    security_schemes["BearerAuth"] = {
        "type": "http",
        "scheme": "bearer",
        "bearerFormat": "JWT",
    }
    app.openapi_schema = openapi_schema
    return app.openapi_schema

app.openapi = custom_openapi

@app.get("/")
def root():
    return {"message": "System Online"}