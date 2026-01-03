import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import SidebarNavigation from '../../components/ui/SidebarNavigation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

import TripCard from './components/TripCard';
import BudgetOverviewCard from './components/BudgetOverviewCard';
import TrendingDestinationCard from './components/TrendingDestinationCard';
import TripMapVisualization from './components/TripMapVisualization';
import QuickToolsCard from './components/QuickToolsCard';
import InviteFriendsCard from './components/InviteFriendsCard';

const Dashboard = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showMap, setShowMap] = useState(false); // Default to standard Hero view

  const mockTrips = [
    {
      id: 1,
      title: "Rajasthan Heritage Tour",
      cities: ["Jaipur", "Udaipur"],
      image: "https://images.unsplash.com/photo-1612105301362-0d4900e364fa",
      imageAlt: "Majestic Hawa Mahal palace",
      startDate: "2026-01-10",
      endDate: "2026-01-24",
      completionPercentage: 80,
      status: "active"
    },
    {
      id: 2,
      title: "South India Temple Trail",
      cities: ["Madurai", "Chennai"],
      image: "https://images.unsplash.com/flagged/photo-1582101164197-78a982d7724d",
      imageAlt: "Ancient Meenakshi Temple",
      startDate: "2026-02-15",
      endDate: "2026-03-05",
      completionPercentage: 0,
      status: "planned"
    },
    {
      id: 3,
      title: "Goa Beach Retreat",
      cities: ["North Goa", "South Goa"],
      image: "https://images.unsplash.com/photo-1586971265827-96808ac11d74",
      startDate: "2025-11-20",
      endDate: "2025-11-28",
      completionPercentage: 100,
      status: "completed"
    },
    {
      id: 4,
      title: "Himalayan Adventure",
      cities: ["Manali", "Leh"],
      image: "https://images.unsplash.com/photo-1622172327433-fff482ffd21b",
      startDate: "2026-04-05",
      status: "planned"
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

                {/* Visual Hero / Map Section */}
                <div className="relative bg-gray-900 rounded-3xl overflow-hidden min-h-[400px] shadow-2xl border border-gray-800 transition-all duration-500">
                  {/* Toggle Switch */}
                  <div className="absolute top-4 right-4 z-20 bg-white/10 backdrop-blur-md rounded-lg p-1 flex border border-white/20">
                    <button
                      onClick={() => setShowMap(true)}
                      className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${showMap ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-300 hover:text-white'}`}
                    >
                      Map View
                    </button>
                    <button
                      onClick={() => setShowMap(false)}
                      className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${!showMap ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-300 hover:text-white'}`}
                    >
                      Cards
                    </button>
                  </div>

                  {showMap ? (
                    <div className="w-full h-full min-h-[400px]">
                      <TripMapVisualization trips={mockTrips} />
                      {/* Overlay Text for Map Mode */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent p-6 pointer-events-none">
                        <h2 className="text-2xl font-bold text-white mb-1">Your Journey Map</h2>
                        <p className="text-gray-400 text-sm">Visualizing {mockTrips.length} adventures across the globe.</p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="absolute inset-0 opacity-60">
                        <img
                          src="https://images.unsplash.com/photo-1699958110629-608c883131b8"
                          alt="Landscape"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="relative z-10 p-8 md:p-12 h-full flex flex-col justify-center bg-gradient-to-r from-gray-900/80 to-transparent">
                        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
                          Good Morning, Alex.<br />
                          <span className="text-blue-400">Ready to explore?</span>
                        </h1>
                        <p className="text-gray-200 text-lg mb-8 max-w-xl">
                          You have <span className="text-white font-bold">1 active trip</span> and <span className="text-white font-bold">2 planned</span>. Continue where you left off.
                        </p>
                        <div className="flex flex-wrap gap-3">
                          <Button
                            variant="default"
                            size="lg"
                            onClick={() => navigate('/plan-trip')}
                            className="bg-blue-600 hover:bg-blue-700 border-none shadow-lg shadow-blue-900/20">
                            Plan New Trip
                          </Button>
                          <Button
                            variant="outline" // Changed since ghost on dark bg needs handling, utilizing outline with white styling via className
                            size="lg"
                            onClick={() => navigate('/my-trips')}
                            className="text-white border-white/30 hover:bg-white/10">
                            View All Trips
                          </Button>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Recent Adventures */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-gray-900">Recent Adventures</h2>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate('/my-trips')}
                      className="h-9">
                      View All
                      <Icon name="ChevronRight" size={16} />
                    </Button>
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
                <QuickToolsCard onShowMap={() => setShowMap(true)} />

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