import React from 'react';
import Icon from '../../../components/AppIcon';

const StatsOverview = ({ stats }) => {
  const statCards = [
    {
      label: 'Total Trips',
      value: stats?.totalTrips,
      icon: 'Map',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      label: 'Active Trips',
      value: stats?.activeTrips,
      icon: 'Plane',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      label: 'Total Budget',
      value: `₹${stats?.totalBudget?.toLocaleString('en-IN')}`,
      icon: 'Wallet',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      label: 'Cities Visited',
      value: stats?.citiesVisited,
      icon: 'MapPin',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6 mb-6 md:mb-7 lg:mb-8">
      {statCards?.map((stat, index) => (
        <div
          key={index}
          className="bg-card rounded-xl shadow-elevation-1 p-4 md:p-5 lg:p-6 border border-border transition-smooth hover:shadow-elevation-2"
        >
          <div className="flex items-start justify-between mb-3">
            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg ${stat?.bgColor} flex items-center justify-center`}>
              <Icon name={stat?.icon} size={20} color={`var(--color-${stat?.color?.replace('text-', '')})`} />
            </div>
          </div>
          <p className="text-xs md:text-sm text-muted-foreground mb-1">{stat?.label}</p>
          <p className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground">{stat?.value}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsOverview;