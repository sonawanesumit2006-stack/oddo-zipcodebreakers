# Globe Trotter 🌍✈️

Globe Trotter is a full-stack travel planning application. It consists of a robust FastAPI backend and a modern React frontend.

---

## 🐍 Backend (FastAPI)

Globe Trotter's backend is built for a hackathon, providing a robust API for managing user profiles, trips, itineraries, and activities, with secure authentication via JWT and Google OAuth.

### 🚀 Backend Features

#### **Phase 1: Authentication & User Management**
- **Dual Login Methods**:
  - **Email & Password**: Secure registration and login with bcrypt hashing.
  - **Google OAuth**: One-click sign-in using Google accounts.
- **Profile Customization**:
  - Users can set a **Bio** and **Home City**.
  - **Profile Picture Upload**: Users can upload image files directly.
  - **Google Avatar**: Automatically fetches profile picture from Google for OAuth users.
- **JWT Security**: All authenticated routes are protected by JSON Web Tokens.

#### **Phase 2: Core Trip Logic (NEW)**
- **Trips Management**:
  - Create and list personal trips with budgets and privacy settings.
  - Public vs Private visibility toggle.
- **Itinerary Planning**:
  - **Stops**: Add Cities to your trip with arrival/departure dates.
  - **Master City List**: Centralized database of destinations.
- **Activities & Expenses**:
  - Add specific activities (Stay, Food, Transport) to each stop.
  - Track costs against your budget.

### 🛠️ Backend Tech Stack

- **Framework**: [FastAPI](https://fastapi.tiangolo.com/) (High-performance Async Python API)
- **Database**: [PostgreSQL](https://www.postgresql.org/) (Production) / SQLite (Dev) via [SQLModel](https://sqlmodel.tiangolo.com/) (SQLAlchemy + Pydantic)
- **Authentication**: `Authlib` (OAuth), `Passlib` (Hashing), `Python-Jose` (JWT)
- **File Handling**: Native `multipart/form-data` support for image uploads.
- **Project Manager**: `uv` (Fast Python package installer and resolver).

### 📂 Backend Structure

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

### 🏃‍♂️ Backend Setup & Run

#### Prerequisites
- Python 3.13+
- `uv` package manager installed.

#### Installation

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

#### Database Management (Development)
**⚠️ Reset Database:**
```bash
uv run reset_db.py
```

#### Running the Server
Start the backend development server:
```bash
uv run main.py
```
The API will be available at `http://localhost:8000`.

### 📚 API Documentation
- **Swagger UI**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **ReDoc**: [http://localhost:8000/redoc](http://localhost:8000/redoc)

---

## ⚛️ Frontend (React)

A modern React-based project utilizing the latest frontend technologies and tools for building responsive web applications.

### 🚀 Frontend Features

- **React 18** - React version with improved rendering and concurrent features
- **Vite** - Lightning-fast build tool and development server
- **Redux Toolkit** - State management with simplified Redux setup
- **TailwindCSS** - Utility-first CSS framework with extensive customization
- **React Router v6** - Declarative routing for React applications
- **Data Visualization** - Integrated D3.js and Recharts for powerful data visualization
- **Form Management** - React Hook Form for efficient form handling
- **Animation** - Framer Motion for smooth UI animations
- **Testing** - Jest and React Testing Library setup

### 📂 Frontend Structure

```
frontend/
├── public/             # Static assets
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page components
│   ├── styles/         # Global styles and Tailwind configuration
│   ├── App.jsx         # Main application component
│   ├── Routes.jsx      # Application routes
│   └── index.jsx       # Application entry point
├── .env                # Environment variables
├── index.html          # HTML template
├── package.json        # Project dependencies and scripts
├── tailwind.config.js  # Tailwind CSS configuration
└── vite.config.js      # Vite configuration
```

### 🛠️ Frontend Setup & Run

#### Prerequisites
- Node.js (v14.x or higher)
- npm or yarn

#### Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

### 🧩 Adding Routes

To add new routes to the application, update the `Routes.jsx` file:

```jsx
import { useRoutes } from "react-router-dom";
import HomePage from "pages/HomePage";
import AboutPage from "pages/AboutPage";

const ProjectRoutes = () => {
  let element = useRoutes([
    { path: "/", element: <HomePage /> },
    { path: "/about", element: <AboutPage /> },
    // Add more routes as needed
  ]);

  return element;
};
```

### 🎨 Styling

This project uses Tailwind CSS for styling. The configuration includes:
- Forms plugin for form styling
- Typography plugin for text styling
- Aspect ratio plugin for responsive elements
- Container queries for component-specific responsive design
- Fluid typography for responsive text
- Animation utilities

### 📱 Responsive Design / Deployment

The app is built with responsive design using Tailwind CSS breakpoints.

Build the application for production:
```bash
npm run build
```
