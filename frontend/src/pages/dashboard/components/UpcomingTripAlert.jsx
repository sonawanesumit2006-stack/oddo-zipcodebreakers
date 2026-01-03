import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UpcomingTripAlert = ({ trip }) => {
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const calculateDaysRemaining = () => {
    const today = new Date();
    const startDate = new Date(trip.startDate);
    const diffTime = startDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysRemaining = calculateDaysRemaining();

  if (daysRemaining > 7) return null;

  return (
    <div className="bg-gradient-to-r from-primary to-secondary rounded-xl shadow-elevation-3 p-4 md:p-5 lg:p-6 text-white">
      <div className="flex items-start gap-3 md:gap-4 mb-4">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
          <Icon name="Plane" size={24} color="#FFFFFF" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg md:text-xl font-semibold mb-1">Your trip is coming up!</h3>
          <p className="text-sm md:text-base opacity-90">
            {trip?.title} starts in {daysRemaining} {daysRemaining === 1 ? 'day' : 'days'}
          </p>
        </div>
      </div>
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2">
          <Icon name="Calendar" size={16} color="#FFFFFF" />
          <span className="text-sm opacity-90">{formatDate(trip?.startDate)}</span>
        </div>
        <div className="flex items-center gap-2">
          <Icon name="MapPin" size={16} color="#FFFFFF" />
          <span className="text-sm opacity-90">{trip?.destinationCount} destinations planned</span>
        </div>
      </div>
      <Button
        variant="default"
        className="bg-white text-primary hover:bg-white/90"
        iconName="ArrowRight"
        iconPosition="right"
        onClick={() => navigate('/trip-detail', { state: { tripId: trip?.id } })}
      >
        Review Itinerary
      </Button>
    </div>
  );
};

export default UpcomingTripAlert;