import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import LandingPage from './pages/landing';
import Login from './pages/login';
import Signup from './pages/signup';
import BudgetManagement from './pages/budget-management';
import ActivityManagement from './pages/activity-management';
import Dashboard from './pages/dashboard';
import MyTrips from './pages/my-trips';
import TripDetail from './pages/trip-detail';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          {/* Define your route here */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/budget-management" element={<BudgetManagement />} />
          <Route path="/activity-management" element={<ActivityManagement />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/my-trips" element={<MyTrips />} />
          <Route path="/trip-detail" element={<TripDetail />} />
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
