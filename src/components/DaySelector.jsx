const DaySelector = ({ days, activeDay, onChange }) => {
  return (
    <div className="glass-panel flex items-center gap-2 overflow-x-auto px-4 py-3">
      {days.map((day) => {
        const isActive = day === activeDay;
        return (
          <button
            key={day}
            type="button"
            onClick={() => onChange(day)}
            aria-pressed={isActive}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition ${
              isActive
                ? 'bg-slate-900 text-white shadow-soft'
                : 'bg-white/60 text-slate-600 hover:bg-white'
            }`}
          >
            {day}
          </button>
        );
      })}
    </div>
  );
};

export default DaySelector;
