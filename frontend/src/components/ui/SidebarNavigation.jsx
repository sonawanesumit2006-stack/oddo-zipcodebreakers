import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const SidebarNavigation = ({ isCollapsed = false }) => {
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: 'LayoutDashboard',
    },
    {
      label: 'My Trips',
      path: '/my-trips',
      icon: 'Map',
    },
    {
      label: 'Budget',
      path: '/budget-management',
      icon: 'Wallet',
    },
    {
      label: 'Community',
      path: '/community',
      icon: 'Users',
    },
    {
      label: 'Settings',
      path: '/settings',
      icon: 'Settings',
    },
  ];

  const isActive = (path) => {
    return location?.pathname === path;
  };

  const handleMobileToggle = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const handleNavItemClick = () => {
    if (window.innerWidth < 1024) {
      setIsMobileOpen(false);
    }
  };

  return (
    <>
      <button
        onClick={handleMobileToggle}
        className="fixed top-4 left-4 z-50 lg:hidden w-11 h-11 flex items-center justify-center bg-card rounded-lg shadow-elevation-2 transition-smooth hover:shadow-elevation-3"
        aria-label="Toggle navigation menu"
      >
        <Icon name={isMobileOpen ? 'X' : 'Menu'} size={24} color="var(--color-foreground)" />
      </button>
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-background z-75 lg:hidden"
          onClick={handleMobileToggle}
          aria-hidden="true"
        />
      )}
      <aside
        className={`fixed lg:fixed top-0 left-0 h-full bg-card border-r border-border z-100 transition-smooth ${
          isCollapsed ? 'w-20' : 'w-60'
        } ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        <div className={`sidebar-header ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
          <div className="sidebar-logo">
            <Icon name="Plane" size={24} color="#FFFFFF" />
          </div>
          <span className="sidebar-logo-text">GlobeTrotter</span>
        </div>

        <nav className="flex flex-col gap-2 p-6">
          {navigationItems?.map((item) => (
            <Link
              key={item?.path}
              to={item?.path}
              onClick={handleNavItemClick}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-smooth ${
                isActive(item?.path)
                  ? 'bg-primary text-primary-foreground shadow-elevation-1'
                  : 'text-foreground hover:bg-muted hover:shadow-elevation-1'
              } ${isCollapsed ? 'justify-center' : ''}`}
            >
              <Icon
                name={item?.icon}
                size={20}
                color={isActive(item?.path) ? 'var(--color-primary-foreground)' : 'var(--color-foreground)'}
              />
              {!isCollapsed && <span className="font-medium">{item?.label}</span>}
            </Link>
          ))}
        </nav>

        <div className="fixed bottom-6 left-4 z-50">
          <Link to="/settings" onClick={handleNavItemClick} title="Account" className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-elevation-2 hover:shadow-elevation-3 focus:outline-none focus:ring-2 focus:ring-primary/40" aria-label="Account">
            <Icon name="User" size={18} color="var(--color-primary-foreground)" />
            <span className="sr-only">Account</span>
          </Link>
        </div>
      </aside>
    </>
  );
};

export default SidebarNavigation;