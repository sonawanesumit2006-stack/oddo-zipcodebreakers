import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const QuickToolsCard = ({ onShowMap }) => {
  const navigate = useNavigate();

  const tools = [
    { icon: 'Map', label: 'Map View', action: 'map', color: '#8B5CF6' },
    { icon: 'List', label: 'Pack List', path: '/my-trips', color: '#10B981' },
    { icon: 'DollarSign', label: 'Converter', path: '/budget-management', color: '#F59E0B' },
    { icon: 'Plane', label: 'Flights', path: '/activity-management', color: '#EC4899' }
  ];

  const handleToolClick = (tool) => {
    if (tool.action === 'map' && onShowMap) {
      onShowMap();
      // Scroll to top to see the map if needed
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (tool.path) {
      navigate(tool.path);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Tools</h3>
      <div className="grid grid-cols-2 gap-4">
        {tools?.map((tool, index) => (
          <button
            key={index}
            onClick={() => handleToolClick(tool)}
            className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-gray-50 transition-colors group"
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform"
              style={{ backgroundColor: `${tool?.color}15` }}
            >
              <Icon name={tool?.icon} size={24} color={tool?.color} />
            </div>
            <span className="text-sm font-medium text-gray-700">{tool?.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickToolsCard;