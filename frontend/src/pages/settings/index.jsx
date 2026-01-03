import React, { useEffect, useState } from 'react';
import SidebarNavigation from '../../components/ui/SidebarNavigation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const DEFAULT = {
  name: 'Travel Explorer',
  email: 'explorer@globetrotter.com',
  theme: 'light',
  notifications: true,
};

export default function Settings() {
  const [settings, setSettings] = useState(DEFAULT);

  useEffect(() => {
    const raw = localStorage.getItem('gt_settings');
    if (raw) {
      try {
        setSettings(JSON.parse(raw));
      } catch {
        setSettings(DEFAULT);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('gt_settings', JSON.stringify(settings));
    if (settings.theme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [settings]);

  const update = (patch) => setSettings((s) => ({ ...s, ...patch }));

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

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
                    value={settings.name}
                    onChange={(e) => update({ name: e.target.value })}
                  />
                </div>

                <div className="animate-fade-in" style={{ animationDelay: '150ms' }}>
                  <label className="block text-sm font-semibold mb-2 text-muted-foreground uppercase tracking-wide">Email</label>
                  <input
                    className="w-full px-4 py-3 rounded-lg border border-border focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all text-foreground placeholder:text-muted-foreground bg-background/50 hover:border-border/80"
                    value={settings.email}
                    onChange={(e) => update({ email: e.target.value })}
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
                        value={settings.theme}
                        onChange={(e) => update({ theme: e.target.value })}
                      >
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                      </select>

                      <button
                        className="inline-flex items-center gap-2 px-4 py-3 rounded-lg border border-border bg-transparent hover:bg-muted/20 transition-all"
                        onClick={() => update({ theme: settings.theme === 'dark' ? 'light' : 'dark' })}
                        aria-label="Toggle theme"
                        title="Toggle theme"
                      >
                        {settings.theme === 'dark' ? (
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
                        checked={settings.notifications}
                        onChange={(e) => update({ notifications: e.target.checked })}
                      />
                      <label htmlFor="notif" className="text-sm text-foreground cursor-pointer">
                        Enable notifications
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                <Button
                  variant="default"
                  onClick={() => {
                    localStorage.setItem('gt_settings', JSON.stringify(settings));
                    window?.toast?.success?.('Settings saved');
                    if (!window?.toast) alert('Settings saved');
                  }}
                  className="shadow-lg"
                >
                  Save Changes
                </Button>

                <Button
                  variant="outline"
                  onClick={() => {
                    localStorage.removeItem('gt_settings');
                    setSettings(DEFAULT);
                  }}
                >
                  Reset
                </Button>
              </div>
            </div>
          </div>

          <aside className="space-y-8 animate-fade-in" style={{ animationDelay: '300ms' }}>
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-border rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-2xl font-bold shadow-lg">TE</div>
                <div>
                  <div className="font-bold text-foreground text-lg">{settings.name}</div>
                  <div className="text-sm text-muted-foreground">{settings.email}</div>
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

            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon name="Bell" size={20} className="text-primary" />
                </div>
                <h4 className="text-sm font-bold text-foreground">Notifications</h4>
              </div>
              <div className="text-sm text-muted-foreground leading-relaxed">Get updates about your trips, community activity, and important reminders when notifications are enabled.</div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
