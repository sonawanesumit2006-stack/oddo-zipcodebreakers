import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarNavigation from '../../components/ui/SidebarNavigation';
import Button from '../../components/ui/Button';
import TripCard from './components/TripCard';
import FilterPanel from './components/FilterPanel';
import EmptyState from './components/EmptyState';
import StatsOverview from './components/StatsOverview';
import api from '../../api/axios';

const MyTrips = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [realTrips, setRealTrips] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    sortBy: 'departure-desc',
    dateFrom: '',
    dateTo: '',
    budgetMin: '',
    budgetMax: ''
  });

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await api.get('/trips/');
        // Map backend format to frontend format
        const formattedTrips = response.data.map(trip => ({
          id: trip.id, // Use actual ID for navigation
          title: trip.title,
          image: trip.cover_image_url || "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1",
          imageAlt: `Trip to ${trip.destination_cache}`,
          cities: trip.stops && trip.stops.length > 0
            ? trip.stops.map(stop => stop.city.name)
            : [trip.destination_cache],
          startDate: trip.start_date,
          endDate: trip.end_date,
          duration: Math.max(1, Math.ceil((new Date(trip.end_date) - new Date(trip.start_date)) / (1000 * 60 * 60 * 24))),
          totalBudget: trip.budget_limit,
          spent: trip.total_spent || 0,
          status: trip.status ? trip.status.toLowerCase() : 'planned',
          completionPercentage: 0, // Could calculate based on date?
          createdDate: new Date(trip.created_at).toISOString().split('T')[0],
          isReal: true
        }));
        setRealTrips(formattedTrips);
      } catch (error) {
        console.error("Failed to fetch trips", error);
      }
    };
    fetchTrips();
  }, []);

  const mockTrips = [
    {
      id: 101,
      title: "Rajasthan Heritage Tour 2026",
      image: "https://images.unsplash.com/photo-1619663157564-ef32b3dfe257",
      imageAlt: "Aerial view of Jaipur Pink City with historic forts, palaces, and traditional Rajasthani architecture under blue sky",
      cities: ["Jaipur", "Udaipur", "Jodhpur"],
      startDate: "2026-06-15",
      endDate: "2026-06-30",
      duration: 15,
      totalBudget: 5000,
      spent: 3200,
      status: "planned",
      completionPercentage: 45,
      createdDate: "2026-01-02",
      isReal: false
    },
    {
      id: 102,
      title: "South India Temple Trail",
      image: "https://images.unsplash.com/photo-1727993995329-fe20d4f65972",
      imageAlt: "Magnificent Meenakshi Temple with colorful gopuram towers and intricate South Indian temple architecture at sunset",
      cities: ["Chennai", "Madurai", "Kanyakumari"],
      startDate: "2026-03-10",
      endDate: "2026-03-25",
      duration: 15,
      totalBudget: 4200,
      spent: 4100,
      status: "active",
      completionPercentage: 75,
      createdDate: "2025-12-15",
      isReal: false
    },
    {
      id: 103,
      title: "Goa Beach Retreat",
      image: "https://images.unsplash.com/photo-1586971265827-96808ac11d74",
      imageAlt: "Pristine Goa beach with golden sand, swaying palm trees, and turquoise Arabian Sea waters at golden hour",
      cities: ["North Goa", "South Goa"],
      startDate: "2025-11-20",
      endDate: "2025-11-28",
      duration: 8,
      totalBudget: 3000,
      spent: 3000,
      status: "completed",
      completionPercentage: 100,
      createdDate: "2025-10-01",
      isReal: false
    },
    {
      id: 104,
      title: "Himalayan Adventure",
      image: "https://images.unsplash.com/photo-1622172327433-fff482ffd21b",
      imageAlt: "Majestic snow-capped Himalayan peaks with colorful Buddhist prayer flags and mountain monastery in foreground",
      cities: ["Manali", "Leh", "Dharamshala"],
      startDate: "2026-04-05",
      endDate: "2026-04-18",
      duration: 13,
      totalBudget: 6500,
      spent: 1200,
      status: "planned",
      completionPercentage: 20,
      createdDate: "2025-12-28",
      isReal: false
    },
    {
      id: 105,
      title: "Kerala Backwaters Journey",
      image: "https://images.unsplash.com/photo-1634141693341-9d51836aa188",
      imageAlt: "Traditional Kerala houseboat on tranquil backwaters with coconut palms and lush tropical greenery reflected in water",
      cities: ["Kochi", "Alleppey", "Munnar"],
      startDate: "2026-08-12",
      endDate: "2026-08-28",
      duration: 16,
      totalBudget: 7200,
      spent: 0,
      status: "planned",
      completionPercentage: 10,
      createdDate: "2026-01-01",
      isReal: false
    },
    {
      id: 106,
      title: "Northeast India Discovery",
      image: "https://images.unsplash.com/photo-1682134936734-6cc2a4258a77",
      imageAlt: "Lush green valleys and misty mountains of Northeast India with traditional tribal villages and terraced fields",
      cities: ["Shillong", "Kaziranga"],
      startDate: "2026-02-14",
      endDate: "2026-02-26",
      duration: 12,
      totalBudget: 5800,
      spent: 5600,
      status: "active",
      completionPercentage: 85,
      createdDate: "2025-11-20",
      isReal: false
    }];

  // Combine mock and real trips
  const allTrips = useMemo(() => [...realTrips, ...mockTrips], [realTrips]);

  const filteredAndSortedTrips = useMemo(() => {
    let result = [...allTrips];

    if (filters?.search) {
      const searchLower = filters?.search?.toLowerCase();
      result = result?.filter(
        (trip) =>
          trip?.title?.toLowerCase()?.includes(searchLower) ||
          trip?.cities?.some((city) => city?.toLowerCase()?.includes(searchLower))
      );
    }

    if (filters?.status !== 'all') {
      result = result?.filter((trip) => trip?.status === filters?.status);
    }

    if (filters?.dateFrom) {
      result = result?.filter((trip) => new Date(trip.startDate) >= new Date(filters.dateFrom));
    }

    if (filters?.dateTo) {
      result = result?.filter((trip) => new Date(trip.endDate) <= new Date(filters.dateTo));
    }

    if (filters?.budgetMin) {
      result = result?.filter((trip) => trip?.totalBudget >= parseFloat(filters?.budgetMin));
    }

    if (filters?.budgetMax) {
      result = result?.filter((trip) => trip?.totalBudget <= parseFloat(filters?.budgetMax));
    }

    result?.sort((a, b) => {
      switch (filters?.sortBy) {
        case 'departure-desc':
          return new Date(b.startDate) - new Date(a.startDate);
        case 'departure-asc':
          return new Date(a.startDate) - new Date(b.startDate);
        case 'created-desc':
          return new Date(b.createdDate) - new Date(a.createdDate);
        case 'created-asc':
          return new Date(a.createdDate) - new Date(b.createdDate);
        case 'budget-desc':
          return b?.totalBudget - a?.totalBudget;
        case 'budget-asc':
          return a?.totalBudget - b?.totalBudget;
        case 'name-asc':
          return a?.title?.localeCompare(b?.title);
        case 'name-desc':
          return b?.title?.localeCompare(a?.title);
        default:
          return 0;
      }
    });

    return result;
  }, [filters, allTrips]);

  const stats = useMemo(() => {
    return {
      totalTrips: allTrips?.length,
      activeTrips: allTrips?.filter((t) => t?.status === 'active')?.length,
      totalBudget: allTrips?.reduce((sum, t) => sum + t?.totalBudget, 0),
      citiesVisited: new Set(allTrips.flatMap((t) => t.cities))?.size
    };
  }, [allTrips]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      status: 'all',
      sortBy: 'departure-desc',
      dateFrom: '',
      dateTo: '',
      budgetMin: '',
      budgetMax: ''
    });
  };

  const hasActiveFilters = () => {
    return filters?.search ||
      filters?.status !== 'all' ||
      filters?.dateFrom ||
      filters?.dateTo ||
      filters?.budgetMin || filters?.budgetMax;
  };

  return (
    <div className="min-h-screen bg-background">
      <SidebarNavigation isCollapsed={isSidebarCollapsed} />
      <main
        className={`transition-smooth pt-20 lg:pt-0 ${isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-60'}`
        }>

        <div className="p-4 md:p-6 lg:p-8">
          <div className="mb-6 md:mb-7 lg:mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              <div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2">My Trips</h1>
                <p className="text-sm md:text-base text-muted-foreground">
                  Manage and organize all your travel adventures
                </p>
              </div>
              <Button
                variant="default"
                size="lg"
                iconName="Plus"
                iconPosition="left"
                onClick={() => navigate('/plan-trip')}>

                Create New Trip
              </Button>
            </div>

            <StatsOverview stats={stats} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-7 lg:gap-8">
            <div className="lg:col-span-1">
              <FilterPanel
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
                isOpen={isFilterOpen}
                onToggle={() => setIsFilterOpen(!isFilterOpen)} />

            </div>

            <div className="lg:col-span-3">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm md:text-base text-muted-foreground">
                  Showing {filteredAndSortedTrips?.length} of {allTrips?.length} trips
                </p>
              </div>

              {filteredAndSortedTrips?.length === 0 ?
                <EmptyState hasFilters={hasActiveFilters()} onClearFilters={handleClearFilters} /> :

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5 lg:gap-6">
                  {filteredAndSortedTrips?.map((trip) =>
                    <TripCard key={`${trip.isReal ? 'real' : 'mock'}-${trip.id}`} trip={trip} />
                  )}
                </div>
              }
            </div>
          </div>
        </div>
      </main>
    </div>);

};

export default MyTrips;