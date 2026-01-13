import { CheckCircle2, Circle, Pencil } from 'lucide-react';
import { getTypeStyles } from '../utils/helpers';
import { getIcon } from '../utils/iconMap';

const EventCard = ({ event, onToggle, onEdit }) => {
  const Icon = getIcon(event.type);
  const timeRange = event.endTime ? `${event.time} - ${event.endTime}` : event.time;

  return (
    <article
      className={`flex flex-col gap-4 rounded-2xl border border-white/70 bg-white/80 px-5 py-4 shadow-soft transition ${
        event.completed ? 'opacity-70' : 'hover:-translate-y-1'
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onToggle(event.id)}
            aria-label={event.completed ? 'Mark incomplete' : 'Mark complete'}
            className="text-slate-500 transition hover:text-slate-900"
          >
            {event.completed ? (
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
            ) : (
              <Circle className="h-5 w-5" />
            )}
          </button>
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900/5">
            <Icon className="h-5 w-5 text-slate-700" />
          </div>
        </div>
        <button
          type="button"
          onClick={() => onEdit(event)}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-slate-900"
        >
          <Pencil className="h-4 w-4" />
          Edit
        </button>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3
            className={`text-lg font-semibold text-slate-900 ${
              event.completed ? 'line-through text-slate-500' : ''
            }`}
          >
            {event.title}
          </h3>
          <span className={`chip ${getTypeStyles(event.type)}`}>{event.type}</span>
        </div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
          {timeRange}
        </p>
        {event.notes ? (
          <p className="text-sm text-slate-600">{event.notes}</p>
        ) : null}
      </div>
    </article>
  );
};

export default EventCard;
