import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import SidebarNavigation from '../../components/ui/SidebarNavigation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

import TripCard from './components/TripCard';
import BudgetOverviewCard from './components/BudgetOverviewCard';
import TrendingDestinationCard from './components/TrendingDestinationCard';
import QuickToolsCard from './components/QuickToolsCard';
import InviteFriendsCard from './components/InviteFriendsCard';

const Dashboard = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const mockTrips = [
  {
    id: 1,
    title: "Rajasthan Heritage Tour",
    image: "https://images.unsplash.com/photo-1612105301362-0d4900e364fa",
    imageAlt: "Majestic Hawa Mahal palace in Jaipur with pink sandstone facade and intricate lattice windows against blue sky",
    startDate: "2026-01-10",
    endDate: "2026-01-24",
    completionPercentage: 80,
    status: "80% Planned"
  },
  {
    id: 2,
    title: "South India Temple Trail",
    image: "https://images.unsplash.com/flagged/photo-1582101164197-78a982d7724d",
    imageAlt: "Ancient Meenakshi Temple in Madurai with colorful gopuram towers and intricate Dravidian architecture",
    startDate: "2026-02-15",
    endDate: "2026-03-05",
    completionPercentage: 100,
    status: "Confirmed"
  }];


  const trendingDestinations = [
  {
    id: 1,
    name: "Jaipur, Rajasthan",
    description: "Pink city palaces, traditional handicrafts...",
    image: "https://images.unsplash.com/photo-1641231825326-6c2593710812",
    imageAlt: "Amber Fort palace in Jaipur with golden sunset light illuminating sandstone walls and Mughal architecture"
  },
  {
    id: 2,
    name: "Goa Beaches",
    description: "Golden beaches, Portuguese heritage...",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1ea0d9e38-1764660929642.png",
    imageAlt: "Pristine Goa beach with golden sand, palm trees, and turquoise Arabian Sea waters at sunset"
  },
  {
    id: 3,
    name: "Manali, Himachal",
    description: "Snow-capped peaks, adventure sports...",
    image: "https://images.unsplash.com/photo-1579171634079-9bae0cc73d75",
    imageAlt: "Snow-covered Himalayan mountains in Manali with pine forests and traditional wooden houses"
  }];


  const budgetData = {
    totalBudget: 50000,
    spent: 21000,
    remaining: 29000,
    spentPercentage: 42,
    categories: [
    { name: 'Flights', spent: 12000, icon: 'Plane' },
    { name: 'Hotels', spent: 8000, icon: 'Hotel' }]

  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Dashboard - GlobeTrotter</title>
        <meta name="description" content="Manage your travel plans, track budgets, and explore new destinations with GlobeTrotter's comprehensive dashboard." />
      </Helmet>
      <div className="min-h-screen bg-gray-50">
        <SidebarNavigation isCollapsed={isSidebarCollapsed} />

        <main className={`transition-smooth ${isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-60'}`}>
          <div className="px-4 md:px-6 lg:px-8 py-6 md:py-8 max-w-[1600px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content Area */}
              <div className="lg:col-span-2 space-y-6">
                {/* Hero Section */}
                <div className="relative bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 rounded-2xl overflow-hidden h-[400px] shadow-xl">
                  <div className="absolute inset-0 opacity-30">
                    <img
                      src="https://images.unsplash.com/photo-1699958110629-608c883131b8"
                      alt="Mountain landscape with forest silhouette at sunset"
                      className="w-full h-full object-cover" />

                  </div>
                  <div className="relative z-10 p-8 md:p-12 h-full flex flex-col justify-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                      Good Morning, Alex.
                      <br />
                      Ready for your next
                      <br />
                      adventure?
                    </h1>
                    <p className="text-gray-200 text-lg mb-8 max-w-xl">
                      Start planning your dream itinerary today or pick up exactly
                      where you left off on your summer plans.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <Button
                        variant="default"
                        size="lg"
                        iconName="Plus"
                        iconPosition="left"
                        onClick={() => navigate('/my-trips')}
                        className="bg-blue-500 hover:bg-blue-600 text-white">

                        Plan New Trip
                      </Button>
                      <Button
                        variant="outline"
                        size="lg"
                        onClick={() => navigate('/my-trips')}
                        className="bg-transparent border-2 border-white text-white hover:bg-white/10">

                        Resume Planning
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Recent Adventures */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-gray-900">Recent Adventures</h2>
                    <button
                      onClick={() => navigate('/my-trips')}
                      className="text-blue-500 hover:text-blue-600 font-medium text-sm flex items-center gap-1">

                      View All
                      <Icon name="ChevronRight" size={16} />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {mockTrips?.map((trip) =>
                    <TripCard key={trip?.id} trip={trip} />
                    )}
                  </div>
                </div>

                {/* Trending Destinations */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Trending Destinations for You</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {trendingDestinations?.map((destination) =>
                    <TrendingDestinationCard key={destination?.id} destination={destination} />
                    )}
                  </div>
                </div>
              </div>

              {/* Right Sidebar */}
              <div className="space-y-6">
                {/* Budget Overview */}
                <BudgetOverviewCard budgetData={budgetData} />

                {/* Quick Tools */}
                <QuickToolsCard />

                {/* Invite Friends */}
                <InviteFriendsCard />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>);

};

export default Dashboard;