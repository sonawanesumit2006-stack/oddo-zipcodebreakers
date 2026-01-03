import React, { useState } from 'react';
import SidebarNavigation from '../../components/ui/SidebarNavigation';
import Feed from './components/Feed';
import EventsList from './components/EventsList';

const Community = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <SidebarNavigation isCollapsed={isSidebarCollapsed} />
      <main className={`transition-smooth ${isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-60'}`}>
        <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="mb-4">
              <h1 className="text-2xl md:text-3xl font-bold">Community</h1>
              <p className="text-muted-foreground">Join the conversation, find travel buddies, and attend community events.</p>
            </div>

            <Feed />
          </div>

          <div className="space-y-6">
            <EventsList />

            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-2">Community Guidelines</h3>
              <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-2">
                <li>Be respectful to other members</li>
                <li>Keep personal information private</li>
                <li>Respect local laws and safety guidelines</li>
                <li>Share useful tips and photos (prefer cross-origin-safe image hosting)</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Community;
