import React, { useEffect, useState } from 'react';
import EventCard from './EventCard';
import { loadEvents, saveEvents } from '../utils/storage';

const defaultEvents = [
  { id: 1, title: 'Local Meetup — Jaipur', location: 'Jaipur Central', date: 'Jan 20, 2026', description: 'Meet fellow travelers and exchange tips over chai.' },
  { id: 2, title: 'Packing Tips Webinar', location: 'Online', date: 'Jan 25, 2026', description: 'Live session on packing light and efficient.' }
];

const EventsList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const local = loadEvents();
    if (local && local.length) setEvents(local);
    else { saveEvents(defaultEvents); setEvents(defaultEvents); }
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900 border border-border rounded-xl p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold">Upcoming Community Events</h3>
        <a href="/community/events" className="text-sm text-primary hover:underline">See all</a>
      </div>
      <div className="space-y-3">
        {events.map(ev => <EventCard key={ev.id} event={ev} />)}
      </div>
    </div>
  );
};

export default EventsList;
