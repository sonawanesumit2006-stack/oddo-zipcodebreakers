import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SidebarNavigation from '../../components/ui/SidebarNavigation';
import Button from '../../components/ui/Button';
import TripHeader from './components/TripHeader';
import BudgetOverviewCard from './components/BudgetOverviewCard';
import CityBudgetBreakdown from './components/CityBudgetBreakdown';
import TimelineViewToggle from './components/TimelineViewToggle';
import DayTimeline from './components/DayTimeline';
import ShareModal from './components/ShareModal';
import api from '../../api/axios';

const TripDetail = () => {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeView, setActiveView] = useState('day');
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const contentRef = useRef(null);
  const [isExporting, setIsExporting] = useState(false);

  // Data States
  const [trip, setTrip] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTripData = async () => {
      try {
        setLoading(true);
        const [tripRes, statsRes] = await Promise.all([
          api.get(`/trips/${tripId}`),
          api.get(`/trips/${tripId}/stats`)
        ]);
        setTrip(tripRes.data);
        setStats(statsRes.data);
      } catch (err) {
        console.error("Error fetching trip details:", err);
        setError("Failed to load trip details.");
      } finally {
        setLoading(false);
      }
    };

    if (tripId) {
      fetchTripData();
    }
  }, [tripId]);

  // Transform Data for UI
  const getTimelineData = () => {
    if (!trip) return [];

    // Create a map of activities by date
    const activitiesByDate = {};
    if (trip.stops) {
      trip.stops.forEach(stop => {
        if (stop.activities) {
          stop.activities.forEach(act => {
            const dateStr = act.activity_date; // YYYY-MM-DD
            if (dateStr) {
              if (!activitiesByDate[dateStr]) activitiesByDate[dateStr] = [];
              // Add city info to activity for display if needed
              activitiesByDate[dateStr].push({ ...act, city: stop.city.name });
            }
          });
        }
      });
    }

    // Generate days array
    const start = new Date(trip.start_date);
    const end = new Date(trip.end_date);
    const timeline = [];
    let current = new Date(start);
    let dayNum = 1;

    while (current <= end) {
      const dateKey = current.toISOString().split('T')[0];
      const dayActivities = activitiesByDate[dateKey] || [];

      // Find city for this day (heuristic: city of first activity, or first stop with this arrival date?)
      // Simple fallback: use destination or find a stop that covers this date
      let city = trip.destination_cache;
      if (dayActivities.length > 0) {
        city = dayActivities[0].city;
      } else {
        // Try to find a stop overlapping this day
        // For now default to first city or destination
        if (trip.stops && trip.stops.length > 0) city = trip.stops[0].city.name;
      }

      timeline.push({
        dayNumber: dayNum,
        date: current.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        city: city,
        activities: dayActivities.map(act => ({
          id: act.id,
          title: act.title,
          category: act.category || "Activity",
          time: act.start_time || "All Day",
          location: act.description || "", // Mapping description to location if empty? 
          cost: act.cost,
          isPaid: act.is_completed, // Using is_completed as proxy or just false?
          description: act.description,
          notes: ""
        }))
      });

      current.setDate(current.getDate() + 1);
      dayNum++;
    }
    return timeline;
  };

  const tripData = trip ? {
    id: trip.id,
    title: trip.title,
    description: trip.description || `Trip to ${trip.destination_cache}`,
    coverImage: trip.cover_image_url || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800", // Default
    coverImageAlt: trip.destination_cache,
    startDate: new Date(trip.start_date).toLocaleDateString(),
    endDate: new Date(trip.end_date).toLocaleDateString(),
    cities: trip.stops ? trip.stops.map(s => s.city.name) : [trip.destination_cache],
    travelers: trip.travelers,
    totalBudget: trip.budget_limit,
    totalSpent: stats?.total_spent || 0,
    remainingBudget: stats?.remaining_budget || 0,
    dailyAverage: stats?.remaining_budget ? Math.round(stats.remaining_budget / Math.max(1, (new Date(trip.end_date) - new Date(trip.start_date)) / (1000 * 60 * 60 * 24))) : 0
  } : null;

  const timelineData = getTimelineData();

  const budgetBreakdown = stats?.city_breakdown?.map((item, idx) => ({
    id: idx,
    name: item.city,
    budget: 0, // Backend doesn't give per-city budget limit yet
    spent: item.amount
  })) || [];

  if (loading) return <div className="flex h-screen items-center justify-center">Loading...</div>;
  if (error) return <div className="flex h-screen items-center justify-center text-red-500">{error}</div>;
  if (!tripData) return <div className="flex h-screen items-center justify-center">Trip not found</div>;



  const handleShare = () => {
    setIsShareModalOpen(true);
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

  const handleExportPdf = async () => {
    if (!contentRef?.current) return;
    setIsExporting(true);
    try {
      // Try to dynamically import libraries; if not available we'll fallback to print
      const jspdfModule = await import('jspdf').catch(() => null);
      const html2canvasModule = await import('html2canvas').catch(() => null);

      if (jspdfModule && (jspdfModule.jsPDF || jspdfModule.default) && html2canvasModule) {
        const jsPDF = jspdfModule.jsPDF || jspdfModule.default;
        const html2canvas = html2canvasModule.default || html2canvasModule;

        const element = contentRef.current;
        const canvas = await html2canvas(element, { scale: 2, useCORS: true, allowTaint: true, scrollY: -window.scrollY });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        // Add first page
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

        // Handle multi-page by slicing canvas vertically
        let remainingHeight = imgProps.height - (imgProps.height * (pdf.internal.pageSize.getHeight() / pdfHeight));
        let sliceHeightPx = Math.floor((canvas.height * pdf.internal.pageSize.getHeight()) / pdfHeight);
        let page = 1;
        while (remainingHeight > 0) {
          const tmpCanvas = document.createElement('canvas');
          tmpCanvas.width = canvas.width;
          tmpCanvas.height = Math.min(sliceHeightPx, canvas.height - (page * sliceHeightPx));
          const ctx = tmpCanvas.getContext('2d');
          ctx.drawImage(canvas, 0, page * sliceHeightPx, canvas.width, tmpCanvas.height, 0, 0, canvas.width, tmpCanvas.height);
          const tmpImg = tmpCanvas.toDataURL('image/png');
          pdf.addPage();
          const tmpImgProps = pdf.getImageProperties(tmpImg);
          const tmpPdfHeight = (tmpImgProps.height * pdfWidth) / tmpImgProps.width;
          pdf.addImage(tmpImg, 'PNG', 0, 0, pdfWidth, tmpPdfHeight);
          remainingHeight -= sliceHeightPx;
          page += 1;
        }

        const fileName = `${(tripData?.title || 'itinerary').replace(/\s+/g, '_')}.pdf`;
        pdf.save(fileName);

      } else {
        // Fallback: open printable window (works without extra deps)
        const elementHtml = contentRef.current.innerHTML;
        const newWin = window.open('', '_blank', 'width=800,height=600');
        newWin.document.write(`
          <html>
            <head>
              <title>${tripData?.title || 'itinerary'}</title>
              <meta name="viewport" content="width=device-width,initial-scale=1" />
              <style>body{margin:0;padding:20px;background:white;color:#111;font-family:system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;} img{max-width:100%;height:auto}</style>
            </head>
            <body>${elementHtml}</body>
          </html>`);
        newWin.document.close();
        newWin.focus();
        setTimeout(() => { newWin.print(); }, 600);
      }
    } catch (err) {
      console.error(err);
      const msg = (err && err.message) || String(err || 'Unknown error');
      if (/tainted|cross-origin|CORS/i.test(msg)) {
        alert('Export failed due to cross-origin (CORS) issues on images. Use images with CORS enabled or host them on the same origin.');
      } else {
        alert('Export failed. Install `jspdf` and `html2canvas` for best results (`npm install jspdf html2canvas`) or check the console for details.');
      }
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SidebarNavigation isCollapsed={isSidebarCollapsed} />
      <main
        className={`transition-smooth ${isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-60'} pt-16 lg:pt-0`
        }>

        <div ref={contentRef} id="export-area" className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8">
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
                  onClick={handleExportPdf}
                  loading={isExporting}
                  disabled={isExporting}>

                  {isExporting ? 'Exporting…' : 'Export Itinerary'}
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

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        tripTitle={tripData.title}
      />
    </div>);
};

export default TripDetail;