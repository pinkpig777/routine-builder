import { useEffect, useState } from 'react';
import { INITIAL_SCHEDULE } from '../data/initialSchedule';

const STORAGE_KEY = 'gradSchedule_v2';

const cloneSchedule = (schedule) => {
  if (typeof structuredClone === 'function') {
    return structuredClone(schedule);
  }

  return JSON.parse(JSON.stringify(schedule));
};

const normalizeSchedule = (schedule) => {
  const baseline = cloneSchedule(INITIAL_SCHEDULE);
  const merged =
    schedule && typeof schedule === 'object' ? { ...baseline, ...schedule } : baseline;
  const normalized = {};

  Object.entries(merged).forEach(([day, events]) => {
    const safeEvents = Array.isArray(events) ? events : [];
    normalized[day] = [...safeEvents]
      .map((event) => ({
        ...event,
        completed: Boolean(event.completed),
      }))
      .sort((a, b) => a.time.localeCompare(b.time));
  });

  return normalized;
};

const loadSchedule = () => {
  if (typeof window === 'undefined') {
    return cloneSchedule(INITIAL_SCHEDULE);
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return cloneSchedule(INITIAL_SCHEDULE);
    }

    const parsed = JSON.parse(stored);
    if (!parsed || typeof parsed !== 'object') {
      return cloneSchedule(INITIAL_SCHEDULE);
    }

    return parsed;
  } catch (error) {
    return cloneSchedule(INITIAL_SCHEDULE);
  }
};

const createId = (day) => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return `${day.slice(0, 2).toLowerCase()}-${crypto.randomUUID()}`;
  }

  return `${day.slice(0, 2).toLowerCase()}-${Date.now()}-${Math.floor(
    Math.random() * 1000,
  )}`;
};

export const useSchedule = () => {
  const [schedule, setSchedule] = useState(() => normalizeSchedule(loadSchedule()));

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(schedule));
  }, [schedule]);

  const toggleComplete = (day, id) => {
    setSchedule((prev) => {
      const next = { ...prev };
      next[day] = (prev[day] || []).map((event) =>
        event.id === id ? { ...event, completed: !event.completed } : event,
      );
      return next;
    });
  };

  const saveEvent = (day, event) => {
    setSchedule((prev) => {
      const next = { ...prev };
      const existing = prev[day] || [];
      const isEditing = Boolean(event.id);
      const updatedEvent = {
        ...event,
        id: event.id || createId(day),
        completed: event.completed ?? false,
      };
      const updatedEvents = isEditing
        ? existing.map((item) => (item.id === event.id ? updatedEvent : item))
        : [...existing, updatedEvent];
      next[day] = [...updatedEvents].sort((a, b) => a.time.localeCompare(b.time));
      return next;
    });
  };

  const deleteEvent = (day, id) => {
    setSchedule((prev) => {
      const next = { ...prev };
      next[day] = (prev[day] || []).filter((event) => event.id !== id);
      return next;
    });
  };

  const resetSchedule = () => {
    setSchedule((prev) => {
      const baseline = cloneSchedule(INITIAL_SCHEDULE);
      const next = {};

      Object.entries(baseline).forEach(([day, events]) => {
        const baseEvents = Array.isArray(events) ? events : [];
        const baseIds = new Set(baseEvents.map((event) => event.id));
        const extraEvents = (prev?.[day] || []).filter(
          (event) => event && !baseIds.has(event.id),
        );
        next[day] = [...baseEvents, ...extraEvents]
          .map((event) => ({
            ...event,
            completed: Boolean(event.completed),
          }))
          .sort((a, b) => a.time.localeCompare(b.time));
      });

      Object.entries(prev || {}).forEach(([day, events]) => {
        if (next[day]) {
          return;
        }

        const safeEvents = Array.isArray(events) ? events : [];
        next[day] = [...safeEvents]
          .map((event) => ({
            ...event,
            completed: Boolean(event.completed),
          }))
          .sort((a, b) => a.time.localeCompare(b.time));
      });

      return next;
    });
  };

  return {
    schedule,
    toggleComplete,
    saveEvent,
    deleteEvent,
    resetSchedule,
  };
};
