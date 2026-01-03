import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarNavigation from '../../components/ui/SidebarNavigation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const DEFAULT_PREFERENCES = {
  theme: 'light',
  notifications: true,
};

export default function Settings() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: 'Guest User',
    email: 'guest@example.com',
    avatar_url: null
  });
  const [preferences, setPreferences] = useState(DEFAULT_PREFERENCES);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    // Load User
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse user", e);
      }
    }

    // Load Preferences
    const rawPrefs = localStorage.getItem('gt_preferences');
    if (rawPrefs) {
      try {
        setPreferences(JSON.parse(rawPrefs));
      } catch {
        setPreferences(DEFAULT_PREFERENCES);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('gt_preferences', JSON.stringify(preferences));
    if (preferences.theme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [preferences]);

  const updatePreferences = (patch) => setPreferences((s) => ({ ...s, ...patch }));

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      localStorage.removeItem('isAuthenticated');
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SidebarNavigation isCollapsed={isSidebarCollapsed} />
      <main className={`transition-smooth ${isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-60'}`}>
        <div className="max-w-6xl mx-auto p-6 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 animate-fade-in">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
                <Icon name="Settings" size={28} className="text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">Settings</h1>
                <p className="text-sm text-muted-foreground mt-1">Manage your account preferences and application settings.</p>
              </div>
            </div>

            <div className="bg-card p-8 rounded-2xl shadow-sm border border-border/50 hover:shadow-md transition-all duration-300">
              <h2 className="text-lg font-bold mb-6 text-foreground flex items-center gap-2">
                <Icon name="User" size={20} /> Account Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="animate-fade-in" style={{ animationDelay: '100ms' }}>
                  <label className="block text-sm font-semibold mb-2 text-muted-foreground uppercase tracking-wide">Display name</label>
                  <input
                    className="w-full px-4 py-3 rounded-lg border border-border focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all text-foreground placeholder:text-muted-foreground bg-background/50 hover:border-border/80"
                    value={user.name}
                    readOnly
                  // Editable logic would require backend update
                  />
                </div>

                <div className="animate-fade-in" style={{ animationDelay: '150ms' }}>
                  <label className="block text-sm font-semibold mb-2 text-muted-foreground uppercase tracking-wide">Email</label>
                  <input
                    className="w-full px-4 py-3 rounded-lg border border-border focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all text-foreground placeholder:text-muted-foreground bg-background/50 hover:border-border/80"
                    value={user.email}
                    readOnly
                  />
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-border">
                <h3 className="text-lg font-bold mb-6 text-foreground flex items-center gap-2">
                  <Icon name="Palette" size={20} /> Preferences
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
                    <label className="block text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">Theme</label>
                    <div className="flex items-center gap-3">
                      <select
                        className="px-4 py-3 rounded-lg border border-border focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all text-foreground bg-background/50 hover:border-border/80"
                        value={preferences.theme}
                        onChange={(e) => updatePreferences({ theme: e.target.value })}
                      >
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                      </select>

                      <button
                        className="inline-flex items-center gap-2 px-4 py-3 rounded-lg border border-border bg-transparent hover:bg-muted/20 transition-all"
                        onClick={() => updatePreferences({ theme: preferences.theme === 'dark' ? 'light' : 'dark' })}
                        aria-label="Toggle theme"
                        title="Toggle theme"
                      >
                        {preferences.theme === 'dark' ? (
                          <>
                            <Icon name="Sun" size={18} />
                            <span className="text-sm text-foreground">Light</span>
                          </>
                        ) : (
                          <>
                            <Icon name="Moon" size={18} />
                            <span className="text-sm text-foreground">Dark</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="animate-fade-in" style={{ animationDelay: '250ms' }}>
                    <label className="block text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">Notifications</label>
                    <div className="flex items-center gap-3">
                      <input
                        id="notif"
                        type="checkbox"
                        className="h-5 w-5 rounded cursor-pointer accent-primary"
                        checked={preferences.notifications}
                        onChange={(e) => updatePreferences({ notifications: e.target.checked })}
                      />
                      <label htmlFor="notif" className="text-sm text-foreground cursor-pointer">
                        Enable notifications
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex gap-3 pt-4 border-t border-border">
                <Button
                  variant="default" // Using default style but red color via className if supported, or just distinct
                  className="bg-red-600 hover:bg-red-700 text-white shadow-lg border-red-600"
                  onClick={handleLogout}
                >
                  <div className="flex items-center gap-2">
                    <Icon name="LogOut" size={18} />
                    Logout
                  </div>
                </Button>
              </div>
            </div>
          </div>

          <aside className="space-y-8 animate-fade-in" style={{ animationDelay: '300ms' }}>
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-border rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center overflow-hidden shadow-lg border-2 border-white">
                  {user.avatar_url ? (
                    <img
                      src={user.avatar_url.startsWith('http') ? user.avatar_url : `http://localhost:8000${user.avatar_url}`}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-white text-2xl font-bold">{user.name.charAt(0).toUpperCase()}</span>
                  )}
                </div>
                <div>
                  <div className="font-bold text-foreground text-lg">{user.name}</div>
                  <div className="text-sm text-muted-foreground">{user.email}</div>
                </div>
              </div>

              <div className="mt-6 space-y-3 border-t border-border pt-6">
                <button className="w-full text-left text-sm text-primary font-medium hover:underline transition-all flex items-center gap-2">
                  <Icon name="Lock" size={16} /> Change password
                </button>
                <button className="w-full text-left text-sm text-muted-foreground hover:text-foreground transition-all flex items-center gap-2">
                  <Icon name="Link" size={16} /> Manage connected accounts
                </button>
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon name="Palette" size={20} className="text-primary" />
                </div>
                <h4 className="text-sm font-bold text-foreground">Theme Customization</h4>
              </div>
              <div className="text-sm text-muted-foreground leading-relaxed">Toggle between light and dark mode to customize your experience. Your preference is saved automatically.</div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
