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
        <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Icon name="Settings" size={24} />
              <div>
                <h1 className="text-2xl font-semibold text-foreground">Settings</h1>
                <p className="text-sm text-muted-foreground">Manage your account preferences and application settings.</p>
              </div>
            </div>

            <div className="bg-card p-6 rounded-xl shadow-sm">
              <h2 className="text-lg font-semibold mb-4 text-foreground">Account</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-muted-foreground">Display name</label>
                  <input
                    className="w-full px-3 py-2 rounded border border-border focus:ring-2 focus:ring-primary/20 text-foreground placeholder:text-muted-foreground"
                    value={settings.name}
                    onChange={(e) => update({ name: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 text-muted-foreground">Email</label>
                  <input
                    className="w-full px-3 py-2 rounded border border-border focus:ring-2 focus:ring-primary/20 text-foreground placeholder:text-muted-foreground"
                    value={settings.email}
                    onChange={(e) => update({ email: e.target.value })}
                  />
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-md font-medium mb-3 text-foreground">Preferences</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-muted-foreground">Theme</label>
                    <div className="flex items-center gap-3">
                      <select
                        className="px-3 py-2 rounded border border-border focus:ring-2 focus:ring-primary/20 text-foreground"
                        value={settings.theme}
                        onChange={(e) => update({ theme: e.target.value })}
                      >
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                      </select>

                      <button
                        className="inline-flex items-center gap-2 px-3 py-2 rounded border border-border bg-transparent"
                        onClick={() => update({ theme: settings.theme === 'dark' ? 'light' : 'dark' })}
                        aria-label="Toggle theme"
                        title="Toggle theme"
                      >
                        {settings.theme === 'dark' ? (
                          <>
                            <Icon name="Sun" size={16} />
                            <span className="text-sm text-foreground">Light</span>
                          </>
                        ) : (
                          <>
                            <Icon name="Moon" size={16} />
                            <span className="text-sm text-foreground">Dark</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Notifications</label>
                    <div className="flex items-center gap-3 mt-2">
                      <input
                        id="notif"
                        type="checkbox"
                        className="h-4 w-4"
                        checked={settings.notifications}
                        onChange={(e) => update({ notifications: e.target.checked })}
                      />
                      <label htmlFor="notif" className="text-sm text-muted-foreground">
                        Enable notifications
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <Button
                  variant="default"
                  onClick={() => {
                    localStorage.setItem('gt_settings', JSON.stringify(settings));
                    window?.toast?.success?.('Settings saved');
                    if (!window?.toast) alert('Settings saved');
                  }}
                >
                  Save
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

          <aside className="space-y-4">
            <div className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-white text-xl font-bold">TE</div>
                <div>
                  <div className="font-medium text-foreground">{settings.name}</div>
                  <div className="text-sm text-muted-foreground">{settings.email}</div>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <button className="w-full text-left text-sm text-primary underline">Change password</button>
                <button className="w-full text-left text-sm text-muted-foreground">Manage connected accounts</button>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-4">
              <h4 className="text-sm font-semibold mb-2">Appearance</h4>
              <div className="text-sm text-muted-foreground">Toggle theme to switch between light and dark mode.</div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
