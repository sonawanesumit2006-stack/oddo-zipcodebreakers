import React from 'react';
import Icon from '../AppIcon';

const MobileMenuToggle = ({ isOpen, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="fixed top-4 left-4 z-50 lg:hidden w-11 h-11 flex items-center justify-center bg-card rounded-lg shadow-elevation-2 transition-smooth hover:shadow-elevation-3 active:scale-97"
      aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
      aria-expanded={isOpen}
    >
      <Icon name={isOpen ? 'X' : 'Menu'} size={24} color="var(--color-foreground)" />
    </button>
  );
};

export default MobileMenuToggle;