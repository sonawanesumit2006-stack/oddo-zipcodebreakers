import React, { useState, useEffect } from 'react';
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

  /* Load User Data */
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse user data", e);
      }
    }
  }, []);

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
        className={`fixed lg:fixed top-0 left-0 h-full bg-card border-r border-border/50 z-100 transition-smooth overflow-y-auto ${isCollapsed ? 'w-20' : 'w-64'
          } ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Logo Section */}
        <div className="flex items-center gap-3 px-6 py-6 border-b border-border/30">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
            <Icon name="Plane" size={24} color="#FFFFFF" />
          </div>
          {!isCollapsed && (
            <span className="font-bold text-lg bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">GlobeTrotter</span>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1 p-4">
          {navigationItems?.map((item, idx) => (
            <Link
              key={item?.path}
              to={item?.path}
              onClick={handleNavItemClick}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive(item?.path)
                  ? 'bg-primary text-primary-foreground shadow-lg scale-105'
                  : 'text-foreground hover:bg-muted/60 hover:shadow-md'
                } ${isCollapsed ? 'justify-center' : 'animate-fade-in'}`}
              style={!isCollapsed ? { animationDelay: `${idx * 50}ms` } : {}}
            >
              <Icon
                name={item?.icon}
                size={20}
                color={isActive(item?.path) ? 'var(--color-primary-foreground)' : 'var(--color-foreground)'}
              />
              {!isCollapsed && <span className="font-semibold text-sm">{item?.label}</span>}
            </Link>
          ))}
        </nav>

        {/* User Profile Button */}
        <div className={`absolute bottom-6 z-50 ${isCollapsed ? 'left-4' : 'left-6'}`}>
          <Link
            to="/settings"
            onClick={handleNavItemClick}
            title="Account Settings"
            className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all duration-200"
            aria-label="Account Settings"
          >
            <Icon name="User" size={20} color="#FFFFFF" />
            <span className="sr-only">Account Settings</span>
          </Link>
        </div>
      </aside>
    </>
  );
};

export default SidebarNavigation;