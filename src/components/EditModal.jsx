import { useEffect, useState } from 'react';
import { Save, Trash2, X } from 'lucide-react';
import { TYPE_OPTIONS } from '../utils/helpers';

const DEFAULT_EVENT = {
  title: '',
  time: '',
  endTime: '',
  type: 'code',
  notes: '',
};

const MEAL_PRESETS = [
  { label: 'Turkey Wrap', notes: 'Turkey/Hummus Wrap' },
  { label: 'Yakisoba', notes: 'Frozen Dumplings / Yakisoba' },
  { label: 'Bento Bowl', notes: 'Packed Bento (Chicken/Rice)' },
  { label: 'Pesto Pasta', notes: 'Pesto Pasta / Stir Fry' },
  { label: 'Meal Prep', notes: 'Roast Chicken / Rice Pot' },
];

const EditModal = ({ isOpen, onClose, onSave, onDelete, initialEvent }) => {
  const [formState, setFormState] = useState(DEFAULT_EVENT);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    if (initialEvent) {
      setFormState({
        title: initialEvent.title || '',
        time: initialEvent.time || '',
        endTime: initialEvent.endTime || '',
        type: initialEvent.type || 'code',
        notes: initialEvent.notes || '',
      });
      return;
    }

    setFormState(DEFAULT_EVENT);
  }, [initialEvent, isOpen]);

  if (!isOpen) {
    return null;
  }

  const isEditing = Boolean(initialEvent?.id);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave({
      ...formState,
      id: initialEvent?.id,
      completed: initialEvent?.completed ?? false,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8">
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        role="presentation"
        onClick={onClose}
      />
      <form
        onSubmit={handleSubmit}
        role="dialog"
        aria-modal="true"
        className="relative w-full max-w-xl animate-rise rounded-3xl border border-white/70 bg-white/90 px-6 py-6 shadow-soft"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
              {isEditing ? 'Edit event' : 'New event'}
            </p>
            <h2 className="font-display text-2xl text-slate-900">
              Build the block
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-slate-200 bg-white/80 p-2 text-slate-600 transition hover:bg-white"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-6 grid gap-4">
          <label className="text-sm font-semibold text-slate-700">
            Title
            <input
              type="text"
              value={formState.title}
              onChange={(event) =>
                setFormState((prev) => ({ ...prev, title: event.target.value }))
              }
              placeholder="Deep work sprint"
              required
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white/70 px-4 py-3 text-sm text-slate-900 focus:border-slate-400 focus:outline-none"
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block min-w-0 text-sm font-semibold text-slate-700">
              Start time
              <input
                type="time"
                value={formState.time}
                onChange={(event) =>
                  setFormState((prev) => ({ ...prev, time: event.target.value }))
                }
                required
                className="mt-2 box-border w-full min-w-0 max-w-none overflow-hidden rounded-2xl border border-slate-200 bg-white/70 px-3 py-3 text-sm text-slate-900 focus:border-slate-400 focus:outline-none"
              />
            </label>
            <label className="block min-w-0 text-sm font-semibold text-slate-700">
              End time
              <input
                type="time"
                value={formState.endTime}
                onChange={(event) =>
                  setFormState((prev) => ({ ...prev, endTime: event.target.value }))
                }
                required
                className="mt-2 box-border w-full min-w-0 max-w-none overflow-hidden rounded-2xl border border-slate-200 bg-white/70 px-3 py-3 text-sm text-slate-900 focus:border-slate-400 focus:outline-none"
              />
            </label>
          </div>

          <label className="text-sm font-semibold text-slate-700">
            Type
            <select
              value={formState.type}
              onChange={(event) =>
                setFormState((prev) => ({ ...prev, type: event.target.value }))
              }
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white/70 px-4 py-3 text-sm text-slate-900 focus:border-slate-400 focus:outline-none"
            >
              {TYPE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          {formState.type === 'meal' ? (
            <div className="flex flex-wrap gap-2 rounded-2xl border border-amber-100 bg-amber-50/70 px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
              {MEAL_PRESETS.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() =>
                    setFormState((prev) => ({
                      ...prev,
                      title: preset.label,
                      notes: preset.notes,
                    }))
                  }
                  className="rounded-full border border-amber-200 bg-white/90 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-700 transition hover:border-amber-300 hover:bg-white"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          ) : null}

          <label className="text-sm font-semibold text-slate-700">
            Notes
            <textarea
              value={formState.notes}
              onChange={(event) =>
                setFormState((prev) => ({ ...prev, notes: event.target.value }))
              }
              placeholder="Optional context or prep"
              rows={3}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white/70 px-4 py-3 text-sm text-slate-900 focus:border-slate-400 focus:outline-none"
            />
          </label>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          {isEditing ? (
            <button
              type="button"
              onClick={() => onDelete(initialEvent.id)}
              className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-600 transition hover:border-rose-300"
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </button>
          ) : (
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
              Add details when ready
            </span>
          )}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-slate-200 bg-white/70 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5"
            >
              <Save className="h-4 w-4" />
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditModal;
