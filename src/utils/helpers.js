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
