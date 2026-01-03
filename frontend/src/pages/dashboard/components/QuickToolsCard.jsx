import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const QuickToolsCard = () => {
  const navigate = useNavigate();

  const tools = [
    { icon: 'Map', label: 'Map View', path: '/my-trips', color: '#8B5CF6' },
    { icon: 'List', label: 'Pack List', path: '/my-trips', color: '#10B981' },
    { icon: 'DollarSign', label: 'Converter', path: '/budget-management', color: '#F59E0B' },
    { icon: 'Plane', label: 'Flights', path: '/activity-management', color: '#EC4899' }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h3 className="text-lg font-bold text-foreground mb-4">Quick Tools</h3>
      <div className="grid grid-cols-2 gap-4">
        {tools?.map((tool, index) => (
          <button
            key={index}
            onClick={() => navigate(tool?.path)}
            className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-gray-50 transition-colors group"
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform"
              style={{ backgroundColor: `${tool?.color}15` }}
            >
              <Icon name={tool?.icon} size={24} color={tool?.color} />
            </div>
            <span className="text-sm font-medium text-muted-foreground">{tool?.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickToolsCard;