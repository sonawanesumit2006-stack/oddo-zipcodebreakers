import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const QuickActionCard = ({ icon, title, description, path, iconBgColor, iconColor }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(path)}
      className="bg-card rounded-xl shadow-elevation-2 p-4 md:p-5 lg:p-6 transition-smooth hover:shadow-elevation-3 hover:scale-102 text-left w-full"
    >
      <div className={`w-12 h-12 md:w-14 md:h-14 rounded-lg flex items-center justify-center mb-4 ${iconBgColor || 'bg-primary/10'}`}>
        <Icon name={icon} size={24} color={iconColor || 'var(--color-primary)'} />
      </div>

      <h3 className="text-base md:text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>

      <div className="flex items-center gap-2 mt-4 text-primary">
        <span className="text-sm font-medium">Get Started</span>
        <Icon name="ArrowRight" size={16} color="var(--color-primary)" />
      </div>
    </button>
  );
};

export default QuickActionCard;