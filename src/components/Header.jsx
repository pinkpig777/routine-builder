import { CalendarClock, RotateCcw } from 'lucide-react';

const Header = ({ onReset }) => {
  return (
    <header className="glass-panel flex flex-col gap-4 px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/80 shadow-soft">
          <CalendarClock className="h-6 w-6 text-slate-700" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
            Grad Student
          </p>
          <h1 className="font-display text-3xl text-slate-900 sm:text-4xl">
            Scheduler
          </h1>
        </div>
      </div>
      <div className="flex flex-col gap-3 text-sm text-slate-600 sm:items-end">
        <p className="max-w-xs">
          Design a week that balances focus, recovery, and momentum.
        </p>
        <button type="button" onClick={onReset} className="ghost-button">
          <RotateCcw className="h-4 w-4" />
          Reset week
        </button>
      </div>
    </header>
  );
};

export default Header;
