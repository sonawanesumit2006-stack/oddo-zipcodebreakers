import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../AppIcon';

const NavigationItem = ({ item, isActive, onClick, isCollapsed = false }) => {
  return (
    <Link
      to={item?.path}
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-smooth ${
        isActive
          ? 'bg-primary text-primary-foreground shadow-elevation-1'
          : 'text-foreground hover:bg-muted hover:shadow-elevation-1'
      } ${isCollapsed ? 'justify-center' : ''}`}
    >
      <Icon
        name={item?.icon}
        size={20}
        color={isActive ? 'var(--color-primary-foreground)' : 'var(--color-foreground)'}
      />
      {!isCollapsed && <span className="font-medium">{item?.label}</span>}
    </Link>
  );
};

export default NavigationItem;