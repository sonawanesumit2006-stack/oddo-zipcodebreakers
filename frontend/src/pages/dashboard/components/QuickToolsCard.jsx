import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const QuickToolsCard = ({ onShowMap }) => {
  const navigate = useNavigate();

  const tools = [
    { icon: 'Map', label: 'Map View', action: 'map', color: '#8B5CF6' },
    { icon: 'List', label: 'Pack List', path: '/pack-list', color: '#10B981' },
    { icon: 'DollarSign', label: 'Converter', path: '/currency-converter', color: '#F59E0B' },
    { icon: 'Train', label: 'Transport', path: '/transport', color: '#EC4899' }
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
    <div className="bg-card rounded-2xl shadow-sm border border-border/50 hover:shadow-lg p-6 transition-all duration-300 animate-fade-in">
      <h3 className="text-lg font-bold text-foreground mb-5 flex items-center gap-2">
        <Icon name="Zap" size={20} className="text-primary" />
        Quick Tools
      </h3>
      <div className="grid grid-cols-2 gap-4">
        {tools?.map((tool, index) => (
          <button
            key={index}
            onClick={() => handleToolClick(tool)}
            className="flex flex-col items-center gap-3 p-4 rounded-2xl hover:bg-muted/30 transition-all duration-200 group hover:scale-105 active:scale-95"
          >
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm"
              style={{ backgroundColor: `${tool?.color}15` }}
            >
              <Icon name={tool?.icon} size={24} style={{ color: tool?.color }} />
            </div>
            <span className="text-sm font-semibold text-foreground">{tool?.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickToolsCard;