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
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all cursor-pointer group"
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={trip?.image}
          alt={trip?.imageAlt}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor()}`}>
            {trip?.status}
          </span>
        </div>
        <button
          onClick={(e) => {
            e?.stopPropagation();
          }}
          className="absolute top-3 left-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
          aria-label="Add to favorites"
        >
          <Icon name="Heart" size={16} color="#6B7280" />
        </button>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">{trip?.title}</h3>
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
          <Icon name="Calendar" size={14} color="#6B7280" />
          <span>
            {formatDate(trip?.startDate)} - {formatDate(trip?.endDate)}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-full rounded-full ${getProgressColor()} transition-all`}
            style={{ width: `${trip?.completionPercentage}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default TripCard;