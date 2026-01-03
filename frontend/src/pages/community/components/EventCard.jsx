import React from 'react';
import Button from '../../../components/ui/Button';

const EventCard = ({ event }) => {
  return (
    <div className="bg-background/40 rounded-lg p-3 border border-border">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-medium text-foreground">{event.title}</div>
          <div className="text-xs text-muted-foreground">{event.location || 'Online'} • {event.date}</div>
        </div>
        <Button size="sm" variant="outline" onClick={() => alert('Registered!')}>Register</Button>
      </div>
      {event.description && <p className="text-sm text-muted-foreground mt-3">{event.description}</p>}
    </div>
  );
};

export default EventCard;
