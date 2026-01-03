import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TrendingDestinationCard = ({ destination }) => {
  return (
    <div className="relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all cursor-pointer group h-64">
      <div className="relative h-full">
        <Image
          src={destination?.image}
          alt={destination?.imageAlt}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        
        <button
          onClick={(e) => {
            e?.stopPropagation();
          }}
          className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
          aria-label="Add to favorites"
        >
          <Icon name="Heart" size={16} color="#6B7280" />
        </button>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-lg font-bold text-white mb-1">{destination?.name}</h3>
          <p className="text-sm text-gray-200 line-clamp-2">{destination?.description}</p>
          <button className="mt-3 px-4 py-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2">
            Explore Guide
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrendingDestinationCard;