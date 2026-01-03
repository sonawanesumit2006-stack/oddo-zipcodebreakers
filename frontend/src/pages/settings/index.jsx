import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarNavigation from '../../components/ui/SidebarNavigation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import api from '../../api/axios';

const DEFAULT_PREFERENCES = {
  theme: 'light',
  notifications: true,
};

export default function Settings() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [user, setUser] = useState({
    name: '',
    email: '',
    bio: '',
    home_city: '',
    avatar_url: null
  });
  const [preferences, setPreferences] = useState(DEFAULT_PREFERENCES);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Initial load from local storage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(prev => ({ ...prev, ...JSON.parse(storedUser) }));
      } catch (e) {
        console.error("Failed to parse local user", e);
      }
    }

    // Fetch fresh data from API
    const fetchUser = async () => {
      try {
        const response = await api.get('/users/me');
        setUser(response.data);
        localStorage.setItem('user', JSON.stringify(response.data));
      } catch (error) {
        console.error("Failed to fetch user profile", error);
        // If 401, maybe redirect? For now, just log.
      }
    };
    fetchUser();

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
  const update = (patch) => setUser((u) => ({ ...u, ...patch }));

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await api.put('/users/profile', {
        name: user.name,
        bio: user.bio,
        home_city: user.home_city
      });
      setUser(response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile", error);
      alert("Failed to update profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await api.post('/users/avatar', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setUser(response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
    } catch (error) {
      console.error("Failed to upload avatar", error);
      alert("Failed to upload avatar.");
    }
  };

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
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Settings</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Manage your account preferences and application settings.</p>
              </div>
            </div>

            <div className="bg-card p-8 rounded-2xl shadow-sm border border-border/50 hover:shadow-md transition-all duration-300">
              <h2 className="text-lg font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
                <Icon name="User" size={20} /> Account Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="animate-fade-in" style={{ animationDelay: '100ms' }}>
                  <label
                    className="block text-sm font-semibold mb-2 uppercase tracking-wide"
                    style={{ color: preferences.theme === 'dark' ? '#d1d5db' : '#4b5563' }}
                  >
                    Display name
                  </label>
                  <input
                    className="w-full px-4 py-3 rounded-lg border border-border focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 bg-white dark:bg-gray-800 hover:border-border/80"
                    value={user?.name || ''}
                    onChange={(e) => update({ name: e.target.value })}
                  />
                </div>

                <div className="animate-fade-in" style={{ animationDelay: '150ms' }}>
                  <label
                    className="block text-sm font-semibold mb-2 uppercase tracking-wide"
                    style={{ color: preferences.theme === 'dark' ? '#d1d5db' : '#4b5563' }}
                  >
                    Email
                  </label>
                  <input
                    className="w-full px-4 py-3 rounded-lg border border-border focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 bg-white dark:bg-gray-800 hover:border-border/80"
                    value={user?.email || ''}
                    readOnly
                    title="Email cannot be changed"
                  />
                </div>

                <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
                  <label
                    className="block text-sm font-semibold mb-2 uppercase tracking-wide"
                    style={{ color: preferences.theme === 'dark' ? '#d1d5db' : '#4b5563' }}
                  >
                    Home City
                  </label>
                  <input
                    className="w-full px-4 py-3 rounded-lg border border-border focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 bg-white dark:bg-gray-800 hover:border-border/80"
                    value={user?.home_city || ''}
                    placeholder="e.g. New York, London"
                    onChange={(e) => update({ home_city: e.target.value })}
                  />
                </div>

                <div className="md:col-span-2 animate-fade-in" style={{ animationDelay: '250ms' }}>
                  <label
                    className="block text-sm font-semibold mb-2 uppercase tracking-wide"
                    style={{ color: preferences.theme === 'dark' ? '#d1d5db' : '#4b5563' }}
                  >
                    Bio
                  </label>
                  <textarea
                    className="w-full px-4 py-3 rounded-lg border border-border focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 bg-white dark:bg-gray-800 hover:border-border/80 min-h-[100px]"
                    value={user?.bio || ''}
                    placeholder="Tell us a bit about yourself..."
                    onChange={(e) => update({ bio: e.target.value })}
                  />
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-border">
                <h3 className="text-lg font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
                  <Icon name="Palette" size={20} /> Preferences
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
                    <label
                      className="block text-sm font-semibold mb-3 uppercase tracking-wide"
                      style={{ color: preferences.theme === 'dark' ? '#d1d5db' : '#4b5563' }}
                    >
                      Theme
                    </label>
                    <div className="flex items-center gap-3">
                      <button
                        className={`inline-flex items-center gap-2 px-4 py-3 rounded-lg border transition-all ${preferences.theme === 'light'
                          ? 'border-primary bg-primary text-white'
                          : 'border-border bg-transparent text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                          }`}
                        onClick={() => updatePreferences({ theme: 'light' })}
                        aria-label="Light mode"
                        title="Light mode"
                      >
                        <Icon name="Sun" size={18} color={preferences.theme === 'light' ? '#ffffff' : undefined} />
                        <span className="text-sm font-medium">Light</span>
                      </button>

                      <button
                        className={`inline-flex items-center gap-2 px-4 py-3 rounded-lg border transition-all ${preferences.theme === 'dark'
                          ? 'border-primary bg-primary text-white'
                          : 'border-border bg-transparent text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                          }`}
                        onClick={() => updatePreferences({ theme: 'dark' })}
                        aria-label="Dark mode"
                        title="Dark mode"
                      >
                        <Icon name="Moon" size={18} color={preferences.theme === 'dark' ? '#ffffff' : undefined} />
                        <span className="text-sm font-medium">Dark</span>
                      </button>
                    </div>
                  </div>

                  <div className="animate-fade-in" style={{ animationDelay: '250ms' }}>
                    <label
                      className="block text-sm font-semibold mb-3 uppercase tracking-wide"
                      style={{ color: preferences.theme === 'dark' ? '#d1d5db' : '#4b5563' }}
                    >
                      Notifications
                    </label>
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

              <div className="mt-8 flex gap-3 pt-4 border-t border-border justify-between items-center">
                <Button
                  variant="default"
                  className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
                  onClick={handleSave}
                  disabled={isSaving}
                >
                  <div className="flex items-center gap-2">
                    <Icon name="Check" size={18} />
                    {isSaving ? "Saving..." : "Save Changes"}
                  </div>
                </Button>

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
            {/* Hidden File Input */}
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleImageUpload}
              accept="image/*"
            />

            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-border rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-center gap-4 group cursor-pointer" onClick={() => fileInputRef.current.click()}>
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center overflow-hidden shadow-lg border-2 border-white relative">
                  {user?.avatar_url ? (
                    <img
                      src={user.avatar_url.startsWith('http') ? user.avatar_url : `http://localhost:8000${user.avatar_url}`}
                      alt={user?.name || 'User'}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-white text-2xl font-bold">{(user?.name || '?').charAt(0).toUpperCase()}</span>
                  )}
                  {/* Overlay on Hover */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Icon name="Camera" size={20} className="text-white" />
                  </div>
                </div>
                <div>
                  <div className="font-bold text-foreground text-lg">{user?.name || 'Guest'}</div>
                  <div className="text-sm text-muted-foreground">{user?.email || ''}</div>
                  <div className="text-xs text-primary mt-1 group-hover:underline">Click to change avatar</div>
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

