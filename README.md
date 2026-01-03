# Globe Trotter 🌍✈️

Globe Trotter is a travel planning application backend built for a hackathon. It provides a robust API for managing user profiles, trips, itineraries, and activities, with secure authentication via JWT and Google OAuth.

## 🚀 Features

### **Phase 1: Authentication & User Management**
- **Dual Login Methods**:
  - **Email & Password**: Secure registration and login with bcrypt hashing.
  - **Google OAuth**: One-click sign-in using Google accounts.
- **Profile Customization**:
  - Users can set a **Bio** and **Home City**.
  - **Profile Picture Upload**: Users can upload image files directly.
  - **Google Avatar**: Automatically fetches profile picture from Google for OAuth users.
- **JWT Security**: All authenticated routes are protected by JSON Web Tokens.

### **Phase 2: Core Trip Logic (NEW)**
- **Trips Management**:
  - Create and list personal trips with budgets and privacy settings.
  - Public vs Private visibility toggle.
- **Itinerary Planning**:
  - **Stops**: Add Cities to your trip with arrival/departure dates.
  - **Master City List**: Centralized database of destinations.
- **Activities & Expenses**:
  - Add specific activities (Stay, Food, Transport) to each stop.
  - Track costs against your budget.

## 🛠️ Tech Stack

- **Framework**: [FastAPI](https://fastapi.tiangolo.com/) (High-performance Async Python API)
- **Database**: [PostgreSQL](https://www.postgresql.org/) (Production) / SQLite (Dev) via [SQLModel](https://sqlmodel.tiangolo.com/) (SQLAlchemy + Pydantic)
- **Authentication**: `Authlib` (OAuth), `Passlib` (Hashing), `Python-Jose` (JWT)
- **File Handling**: Native `multipart/form-data` support for image uploads.
- **Project Manager**: `uv` (Fast Python package installer and resolver).

## 🏃‍♂️ Getting Started

### Prerequisites
- Python 3.13+
- `uv` package manager installed.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-repo/oddo-zipcodebreakers.git
   cd oddo-zipcodebreakers
   ```

2. **Install dependencies**:
   ```bash
   uv sync
   ```

3. **Configure Environment**:
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL=postgresql://user:password@host/dbname
   SECRET_KEY=your_super_secure_secret
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   ```

### Database Management (Development)

**⚠️ Reset Database:**
If you encounter schema errors or want a fresh start, run the reset script. **This deletes all data!**
```bash
uv run reset_db.py
```

### Running the Server

Start the backend development server:
```bash
uv run main.py
```
The API will be available at `http://localhost:8000`.

### Testing with Frontend Simulator

We have included a lightweight frontend simulator to test the entire flow:
1. **Authentication**: Register/Login (Email or Google).
2. **Profile**: Upload avatars and view profile info.
3. **Trips**: Create new trips and view your list of trips.

Run the simulator:
```bash
uv run test_frontend.py
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📚 API Documentation

FastAPI automatically generates interactive API documentation. Once the server is running, visit:

- **Swagger UI**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **ReDoc**: [http://localhost:8000/redoc](http://localhost:8000/redoc)

## 📂 Project Structure

```
.
├── App/
│   ├── main.py            # App Entry point & Static Mounts
│   ├── models.py          # Database Schemas (User, Trip, City, Activity)
│   ├── database.py        # DB Connection & Session Management
│   ├── uploads/           # Directory for uploaded profile images
│   └── routers/
│       ├── auth.py        # Email/Password Auth & Registration
│       ├── google_auth.py # Google OAuth2 Logic
│       └── trips.py       # (NEW) Trip & Itinerary Management Logic
├── main.py                # Root Entry Point
├── test_frontend.py       # HTML/JS Simulator for Testing
├── reset_db.py            # Database Reset Utility
└── pyproject.toml         # Dependencies managed by uv
```
