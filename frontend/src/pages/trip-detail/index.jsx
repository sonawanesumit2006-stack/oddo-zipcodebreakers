import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarNavigation from '../../components/ui/SidebarNavigation';
import Button from '../../components/ui/Button';
import TripHeader from './components/TripHeader';
import BudgetOverviewCard from './components/BudgetOverviewCard';
import CityBudgetBreakdown from './components/CityBudgetBreakdown';
import TimelineViewToggle from './components/TimelineViewToggle';
import DayTimeline from './components/DayTimeline';

const TripDetail = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeView, setActiveView] = useState('day');

  const tripData = {
    id: 1,
    title: "Rajasthan Heritage Tour 2026",
    description: "A comprehensive journey through the royal heritage of Rajasthan, exploring magnificent forts, palaces, vibrant culture, and traditional Rajasthani cuisine across the desert state.",
    coverImage: "https://images.unsplash.com/photo-1575188566830-ccc495d2f7af",
    coverImageAlt: "Illuminated Hawa Mahal palace in Jaipur with pink sandstone facade and intricate lattice windows at night",
    startDate: "01/15/2026",
    endDate: "01/28/2026",
    cities: ["Jaipur", "Udaipur", "Jodhpur"],
    travelers: 4,
    totalBudget: 12500,
    totalSpent: 8750,
    remainingBudget: 3750,
    dailyAverage: 625
  };

  const budgetBreakdown = [
  { id: 1, name: "Jaipur", budget: 5000, spent: 4200 },
  { id: 2, name: "Udaipur", budget: 4000, spent: 2800 },
  { id: 3, name: "Jodhpur", budget: 3500, spent: 1750 }];


  const timelineData = [
  {
    dayNumber: 1,
    date: "January 15, 2026",
    city: "Jaipur",
    activities: [
    {
      id: 1,
      title: "Flight to Jaipur",
      category: "Transport",
      time: "08:00 AM - 11:30 AM",
      location: "Jaipur International Airport",
      cost: 450,
      isPaid: true,
      description: "Direct flight from Delhi to Jaipur International Airport. Economy class with meal service included.",
      notes: "Check-in opens 2 hours before departure. Arrive at airport by 6:30 AM."
    },
    {
      id: 2,
      title: "Hotel Check-in - Heritage Haveli",
      category: "Accommodation",
      time: "02:00 PM",
      location: "Old City, Jaipur",
      cost: 280,
      isPaid: true,
      description: "Traditional heritage haveli in the old city with views of City Palace. Includes breakfast and WiFi.",
      notes: "Early check-in confirmed. Room 405 with palace view."
    },
    {
      id: 3,
      title: "Hawa Mahal Visit & Dinner",
      category: "Activity",
      time: "06:00 PM - 10:00 PM",
      location: "Hawa Mahal, Jaipur",
      cost: 180,
      isPaid: false,
      description: "Evening visit to the iconic Palace of Winds with skip-the-line tickets. Followed by dinner at a traditional Rajasthani restaurant.",
      notes: "Tickets booked for 6:30 PM. Restaurant reservation at 8:30 PM."
    }]

  },
  {
    dayNumber: 2,
    date: "January 16, 2026",
    city: "Jaipur",
    activities: [
    {
      id: 4,
      title: "Amber Fort Tour",
      category: "Activity",
      time: "09:00 AM - 01:00 PM",
      location: "Amber Fort, Jaipur",
      cost: 120,
      isPaid: true,
      description: "Guided tour of the magnificent Amber Fort featuring Sheesh Mahal, Diwan-i-Aam, and stunning Rajput architecture.",
      notes: "Meet guide at main entrance. Elephant ride optional."
    },
    {
      id: 5,
      title: "Lunch at Chokhi Dhani",
      category: "Food",
      time: "01:30 PM - 03:00 PM",
      location: "Chokhi Dhani, Jaipur",
      cost: 95,
      isPaid: false,
      description: "Traditional Rajasthani village resort offering authentic dal baati churma and other local delicacies with cultural performances.",
      notes: "Reservation under name. Try the thali."
    },
    {
      id: 6,
      title: "City Palace Evening Tour",
      category: "Activity",
      time: "07:00 PM - 09:00 PM",
      location: "City Palace, Jaipur",
      cost: 85,
      isPaid: true,
      description: "Evening tour of the royal City Palace complex with live commentary about Jaipur\'s royal history and architecture.",
      notes: "Entry starts at 6:45 PM. Dress code: Modest attire."
    }]

  },
  {
    dayNumber: 3,
    date: "January 17, 2026",
    city: "Jaipur",
    activities: [
    {
      id: 7,
      title: "Train to Udaipur",
      category: "Transport",
      time: "10:00 AM - 01:30 PM",
      location: "Jaipur Junction to Udaipur City",
      cost: 320,
      isPaid: true,
      description: "Express train journey through the Aravalli hills from Jaipur to the City of Lakes, Udaipur.",
      notes: "AC chair car tickets. Seats 21A-21D. Arrive 30 minutes early."
    }]

  },
  {
    dayNumber: 4,
    date: "January 18, 2026",
    city: "Udaipur",
    activities: []
  }];


  const handleShare = () => {
    alert('Share functionality: Trip link copied to clipboard!\n\nShare this trip with friends and family to collaborate on planning.');
  };

  const handleEditTrip = () => {
    navigate('/my-trips');
  };

  const handleAddActivity = (dayNumber) => {
    navigate('/activity-management', { state: { dayNumber, tripId: tripData?.id } });
  };

  const handleEditActivity = (activity) => {
    navigate('/activity-management', { state: { activity, tripId: tripData?.id } });
  };

  const handleDeleteActivity = (activityId) => {
    if (window.confirm('Are you sure you want to delete this activity?')) {
      alert(`Activity ${activityId} deleted successfully!`);
    }
  };

  const handleAddNewDay = () => {
    alert('Add New Day functionality: Create a new day in your itinerary with custom date and city selection.');
  };

  const handleViewBudget = () => {
    navigate('/budget-management');
  };

  return (
    <div className="min-h-screen bg-background">
      <SidebarNavigation isCollapsed={isSidebarCollapsed} />
      <main
        className={`transition-smooth ${
        isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-60'} pt-16 lg:pt-0`
        }>

        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8">
          <TripHeader
            trip={tripData}
            onShare={handleShare}
            onEdit={handleEditTrip} />


          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
            <BudgetOverviewCard
              title="Total Budget"
              amount={tripData?.totalBudget}
              subtitle={`${tripData?.cities?.length} cities, ${Math.ceil((new Date(tripData.endDate) - new Date(tripData.startDate)) / (1000 * 60 * 60 * 24))} days`}
              icon="Wallet"
              iconColor="#3B82F6" />

            <BudgetOverviewCard
              title="Total Spent"
              amount={tripData?.totalSpent}
              subtitle={`${Math.round(tripData?.totalSpent / tripData?.totalBudget * 100)}% of budget used`}
              icon="TrendingUp"
              iconColor="#F59E0B"
              trend={{
                isPositive: false,
                value: "70% utilized",
                label: "of total budget"
              }} />

            <BudgetOverviewCard
              title="Remaining"
              amount={tripData?.remainingBudget}
              subtitle={`₹${tripData?.dailyAverage}/day average`}
              icon="PiggyBank"
              iconColor="#22C55E"
              trend={{
                isPositive: true,
                value: "₹625/day",
                label: "available budget"
              }} />

          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
            <CityBudgetBreakdown cities={budgetBreakdown} />
            
            <div className="bg-card rounded-xl p-4 md:p-6 shadow-elevation-2 border border-border">
              <h3 className="text-lg md:text-xl font-semibold text-foreground mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  fullWidth
                  iconName="DollarSign"
                  iconPosition="left"
                  onClick={handleViewBudget}>

                  View Detailed Budget
                </Button>
                <Button
                  variant="outline"
                  fullWidth
                  iconName="Calendar"
                  iconPosition="left"
                  onClick={handleAddNewDay}>

                  Add New Day
                </Button>
                <Button
                  variant="outline"
                  fullWidth
                  iconName="Download"
                  iconPosition="left"
                  onClick={() => alert('Export itinerary as PDF')}>

                  Export Itinerary
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl shadow-elevation-2 border border-border p-4 md:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <h2 className="text-xl md:text-2xl font-semibold text-foreground">Trip Timeline</h2>
              <TimelineViewToggle
                activeView={activeView}
                onViewChange={setActiveView} />

            </div>

            <div className="space-y-4 md:space-y-6">
              {timelineData?.map((day) =>
              <DayTimeline
                key={day?.dayNumber}
                day={day}
                onAddActivity={handleAddActivity}
                onEditActivity={handleEditActivity}
                onDeleteActivity={handleDeleteActivity} />

              )}
            </div>

            <div className="mt-6 flex justify-center">
              <Button
                variant="default"
                size="lg"
                iconName="Plus"
                iconPosition="left"
                onClick={handleAddNewDay}>

                Add New Day to Itinerary
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>);

};

export default TripDetail;