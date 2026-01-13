import { Plus } from 'lucide-react';
import { useMemo } from 'react';
import EventCard from './EventCard';
import { findTimeConflicts } from '../utils/helpers';

const EventList = ({ day, events, onAdd, onEdit, onToggle }) => {
  const conflictIds = useMemo(() => findTimeConflicts(events), [events]);

  return (
    <section className="glass-panel flex flex-col gap-4 px-6 py-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
            Timeline
          </p>
          <h2 className="font-display text-2xl text-slate-900">
            {day ? `${day} Blocks` : 'Daily Blocks'}
          </h2>
        </div>
        <button type="button" onClick={onAdd} className="ghost-button">
          <Plus className="h-4 w-4" />
          Add event
        </button>
      </div>
      {events.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-white/50 px-6 py-12 text-center text-sm text-slate-500">
          No events scheduled yet. Add your first block to get started.
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {events.map((event, index) => (
            <div key={event.id} className="animate-rise" style={{ animationDelay: `${index * 40}ms` }}>
              <EventCard 
                event={event} 
                onToggle={onToggle} 
                onEdit={onEdit}
                hasConflict={conflictIds.includes(event.id)}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default EventList;
