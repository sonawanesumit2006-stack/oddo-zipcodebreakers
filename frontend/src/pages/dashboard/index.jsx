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
import CommunityCard from './components/CommunityCard';

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
      imageAlt: "Amber Fort palace in Jaipur with golden sunset light illuminating sandstone walls and Mughal architecture",
    highlights: ["Amber Fort", "City Palace", "Hawa Mahal", "Local bazaars"],
    whyVisit: "Rich Rajasthani architecture, vibrant bazaars, historic forts and palaces, and excellent handicraft shopping."
    },
    {
      id: 2,
      name: "Goa Beaches",
      description: "Golden beaches, Portuguese heritage...",
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_1ea0d9e38-1764660929642.png",
      imageAlt: "Pristine Goa beach with golden sand, palm trees, and turquoise Arabian Sea waters at sunset",
    highlights: ["Baga Beach", "Colva Beach", "Watersports", "Beach shacks & nightlife"],
    whyVisit: "Perfect for sun, sand, seafood, lively nightlife, and a relaxed coastal vibe."
    },
    {
      id: 3,
      name: "Manali, Himachal",
      description: "Snow-capped peaks, adventure sports...",
      image: "https://images.unsplash.com/photo-1579171634079-9bae0cc73d75",
      imageAlt: "Snow-covered Himalayan mountains in Manali with pine forests and traditional wooden houses",
    highlights: ["Rohtang Pass", "Solang Valley", "Hadimba Temple", "Trekking & skiing"],
    whyVisit: "Scenic Himalayan valleys offering adventure sports, cool climate, and beautiful mountain views."
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
      <div className="min-h-screen bg-background">
        <SidebarNavigation isCollapsed={isSidebarCollapsed} />

        <main className={`transition-smooth ${isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-60'}`}>
          <div className="px-4 md:px-6 lg:px-8 py-8 md:py-12 max-w-[1600px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content Area */}
              <div className="lg:col-span-2 space-y-8">

                {/* Hero Section with Map Toggle */}
                <div className="relative bg-gradient-to-br from-primary via-primary/80 to-secondary rounded-3xl overflow-hidden h-[380px] shadow-2xl border border-border/20 transition-all duration-300 hover:shadow-3xl animate-fade-in">
                  {/* Background Image - Fully Visible */}
                  <div className="absolute inset-0">
                    <img
                      src="https://images.unsplash.com/photo-1699958110629-608c883131b8"
                      alt="Mountain landscape"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/40"></div>
                  </div>

                  {/* Map/Hero Toggle */}
                  <div className="absolute top-4 right-4 z-20 bg-card/80 backdrop-blur-md rounded-lg p-1 flex border border-border shadow-lg">
                    <button
                      onClick={() => setShowMap(false)}
                      className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${!showMap ? 'bg-primary text-white shadow-lg' : 'text-muted-foreground hover:text-foreground'}`}
                    >
                      Home
                    </button>
                    <button
                      onClick={() => setShowMap(true)}
                      className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${showMap ? 'bg-primary text-white shadow-lg' : 'text-muted-foreground hover:text-foreground'}`}
                    >
                      Map
                    </button>
                  </div>

                  {showMap ? (
                    <div className="w-full h-full">
                      <TripMapVisualization trips={mockTrips} />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-6 pointer-events-none">
                        <h2 className="text-2xl font-bold text-white mb-1">Your Journey Map</h2>
                        <p className="text-gray-300 text-sm">Visualizing {mockTrips.length} adventures across India</p>
                      </div>
                    </div>
                  ) : (
                    <div className="relative z-10 p-8 md:p-12 h-full flex flex-col justify-center">
                      <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-tight">
                        Explore the
                        <br />
                        <span className="bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent">World</span>
                      </h1>
                      <p className="text-white/90 text-lg md:text-xl mb-8 max-w-2xl leading-relaxed">
                        Plan, track, and share your most memorable adventures across the globe.
                      </p>
                      <div className="flex flex-wrap gap-4">
                        <Button
                          variant="default"
                          size="lg"
                          iconName="Plus"
                          iconPosition="left"
                          onClick={() => navigate('/plan-trip')}
                          className="bg-white text-primary hover:bg-white/90 shadow-lg">
                          Plan New Trip
                        </Button>
                        <Button
                          variant="ghost"
                          size="lg"
                          onClick={() => navigate('/my-trips')}
                          className="text-white border-white/40 hover:bg-white/10 hover:text-white shadow-lg">
                          View Trips
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Recent Adventures Section */}
                <div className="animate-fade-in">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold text-foreground">Your Trips</h2>
                      <p className="text-sm text-muted-foreground mt-1">Active, planned, and completed adventures</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate('/my-trips')}
                      className="h-9">
                      View All
                      <Icon name="ChevronRight" size={16} />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {mockTrips?.slice(0, 4).map((trip, idx) =>
                      <div key={trip?.id} style={{ animationDelay: `${idx * 50}ms` }} className="animate-fade-in">
                        <TripCard trip={trip} />
                      </div>
                    )}
                  </div>
                </div>

                {/* Trending Destinations */}
                <div className="animate-fade-in">
                  <div className="mb-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground">Trending Destinations for You</h2>
                    <p className="text-sm text-muted-foreground mt-1">Discover popular travel spots and get inspired</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {trendingDestinations?.map((destination, idx) =>
                      <div key={destination?.id} style={{ animationDelay: `${idx * 100}ms` }} className="animate-fade-in">
                        <TrendingDestinationCard destination={destination} />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Sidebar */}
              <div className="space-y-8">
                <div className="sticky top-24 space-y-8">
                  {/* Budget Overview */}
                  <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
                    <BudgetOverviewCard budgetData={budgetData} />
                  </div>

                {/* Quick Tools */}
                <div className="animate-fade-in" style={{ animationDelay: '300ms' }}>
                  <QuickToolsCard />
                </div>

                  {/* Community */}
                  <div className="animate-fade-in" style={{ animationDelay: '400ms' }}>
                    <CommunityCard />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>);

};

export default Dashboard;