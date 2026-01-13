export const TYPE_OPTIONS = [
  { value: 'code', label: 'Code' },
  { value: 'research', label: 'Research' },
  { value: 'meal', label: 'Meal' },
  { value: 'class', label: 'Class' },
  { value: 'work', label: 'Work' },
  { value: 'study', label: 'Study' },
  { value: 'commute', label: 'Commute' },
  { value: 'exercise', label: 'Exercise' },
  { value: 'life', label: 'Life' },
];

const TYPE_STYLES = {
  code: 'bg-sky-100 text-sky-800 border-sky-200',
  research: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  meal: 'bg-amber-100 text-amber-900 border-amber-200',
  class: 'bg-blue-100 text-blue-800 border-blue-200',
  work: 'bg-rose-100 text-rose-800 border-rose-200',
  study: 'bg-lime-100 text-lime-900 border-lime-200',
  commute: 'bg-orange-100 text-orange-800 border-orange-200',
  exercise: 'bg-teal-100 text-teal-800 border-teal-200',
  life: 'bg-slate-100 text-slate-800 border-slate-200',
};

export const getTypeStyles = (type) =>
  TYPE_STYLES[type] || 'bg-slate-100 text-slate-800 border-slate-200';

/**
 * Calculate duration between two time strings
 * @param {string} startTime - Time in HH:MM format
 * @param {string} endTime - Time in HH:MM format
 * @returns {string} Duration formatted as "Xh Ym" or "Xm"
 */
export const calculateDuration = (startTime, endTime) => {
  if (!startTime || !endTime) return '';
  
  const [startHour, startMin] = startTime.split(':').map(Number);
  const [endHour, endMin] = endTime.split(':').map(Number);
  
  const startTotalMin = startHour * 60 + startMin;
  const endTotalMin = endHour * 60 + endMin;
  
  let diffMin = endTotalMin - startTotalMin;
  
  // Handle overnight events
  if (diffMin < 0) {
    diffMin += 24 * 60;
  }
  
  const hours = Math.floor(diffMin / 60);
  const minutes = diffMin % 60;
  
  if (hours === 0) {
    return `${minutes}m`;
  }
  
  if (minutes === 0) {
    return `${hours}h`;
  }
  
  return `${hours}h ${minutes}m`;
};

/**
 * Check if two time ranges overlap
 * @param {Object} event1 - First event with time and endTime
 * @param {Object} event2 - Second event with time and endTime
 * @returns {boolean} True if events overlap
 */
const eventsOverlap = (event1, event2) => {
  if (!event1.time || !event1.endTime || !event2.time || !event2.endTime) {
    return false;
  }
  
  const [start1Hour, start1Min] = event1.time.split(':').map(Number);
  const [end1Hour, end1Min] = event1.endTime.split(':').map(Number);
  const [start2Hour, start2Min] = event2.time.split(':').map(Number);
  const [end2Hour, end2Min] = event2.endTime.split(':').map(Number);
  
  const start1 = start1Hour * 60 + start1Min;
  const end1 = end1Hour * 60 + end1Min;
  const start2 = start2Hour * 60 + start2Min;
  const end2 = end2Hour * 60 + end2Min;
  
  // Check if ranges overlap
  return start1 < end2 && start2 < end1;
};

/**
 * Find all time conflicts in an array of events
 * @param {Array} events - Array of event objects
 * @returns {Array} Array of event IDs that have conflicts
 */
export const findTimeConflicts = (events) => {
  const conflictIds = new Set();
  
  for (let i = 0; i < events.length; i++) {
    for (let j = i + 1; j < events.length; j++) {
      if (eventsOverlap(events[i], events[j])) {
        conflictIds.add(events[i].id);
        conflictIds.add(events[j].id);
      }
    }
  }
  
  return Array.from(conflictIds);
};

