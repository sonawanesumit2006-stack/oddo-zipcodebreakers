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
import JoinTrip from './pages/join-trip';
import GoogleCallback from './pages/google-callback';
import PlanTrip from './pages/plan-trip';
import CurrencyConverter from './pages/currency-converter';
import PackList from './pages/pack-list';
import Transport from './pages/transport';
import Community from './pages/community';
import EventsList from './pages/community/components/EventsList';
import PostDetails from './pages/community/PostDetails';
import Settings from './pages/settings';

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
          <Route path="/google-callback" element={<GoogleCallback />} />
          <Route path="/budget-management" element={<BudgetManagement />} />
          <Route path="/activity-management" element={<ActivityManagement />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/my-trips" element={<MyTrips />} />
          <Route path="/trip-detail/:tripId" element={<TripDetail />} />
          <Route path="/trip/share/:tripId" element={<JoinTrip />} />
          <Route path="/plan-trip" element={<PlanTrip />} />
          <Route path="/currency-converter" element={<CurrencyConverter />} />
          <Route path="/pack-list" element={<PackList />} />
          <Route path="/transport" element={<Transport />} />
          {/* Community and settings routes */}
          <Route path="/community" element={<Community />} />
          <Route path="/community/post/:id" element={<PostDetails />} />
          <Route path="/community/events" element={<EventsList />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </RouterRoutes >
      </ErrorBoundary >
    </BrowserRouter >
  );
};

export default Routes;
