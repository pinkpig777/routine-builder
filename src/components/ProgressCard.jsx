import { Trophy } from 'lucide-react';

const ProgressCard = ({ day, completedCount, totalCount }) => {
  const progress = totalCount
    ? Math.round((completedCount / totalCount) * 100)
    : 0;

  return (
    <section className="glass-panel flex flex-col gap-6 px-6 py-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
            {day} focus
          </p>
          <h2 className="font-display text-2xl text-slate-900">
            {progress}% Complete
          </h2>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">
          <Trophy className="h-6 w-6" />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between text-sm text-slate-600">
          <span>
            {completedCount} of {totalCount} blocks finished
          </span>
          <span className="font-semibold text-slate-900">{progress}%</span>
        </div>
        <div className="h-3 w-full rounded-full bg-white/70">
          <div
            className="animate-shimmer h-full rounded-full bg-gradient-to-r from-amber-400 via-rose-400 to-teal-400"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      <p className="text-sm text-slate-600">
        Keep the momentum by finishing one more block before you switch gears.
      </p>
    </section>
  );
};

export default ProgressCard;
