import React from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const TripCard = ({ trip }) => {
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-IN', {
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusColor = () => {
    if (trip?.status?.includes('Confirmed')) return 'bg-green-100 text-green-700';
    if (trip?.status?.includes('Planned')) return 'bg-orange-100 text-orange-700';
    return 'bg-blue-100 text-blue-700';
  };

  const getProgressColor = () => {
    if (trip?.completionPercentage >= 80) return 'bg-blue-500';
    return 'bg-orange-500';
  };

  return (
    <div
      onClick={() => navigate('/trip-detail', { state: { tripId: trip?.id } })}
      className="bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all cursor-pointer group hover:scale-105 duration-300 animate-fade-in"
    >
      <div className="relative h-56 overflow-hidden">
        <Image
          src={trip?.image}
          alt={trip?.imageAlt}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor()} shadow-sm`}>
            {trip?.status}
          </span>
        </div>
        <button
          onClick={(e) => {
            e?.stopPropagation();
          }}
          className="absolute top-3 left-3 w-9 h-9 bg-card/80 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-card/95 transition-all hover:shadow-lg active:scale-95"
          aria-label="Add to favorites"
        >
          <Icon name="Heart" size={16} className="text-muted-foreground" />
        </button>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-1 group-hover:text-primary transition-colors">{trip?.title}</h3>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Icon name="Calendar" size={14} />
          <span>
            {formatDate(trip?.startDate)} - {formatDate(trip?.endDate)}
          </span>
        </div>
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-semibold text-foreground">{trip?.completionPercentage}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
            <div
              className={`h-full rounded-full ${getProgressColor()} transition-all duration-500 shadow-sm`}
              style={{ width: `${trip?.completionPercentage}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripCard;