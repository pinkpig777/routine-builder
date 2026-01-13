import { useMemo, useState } from 'react';
import DaySelector from './components/DaySelector';
import EditModal from './components/EditModal';
import EventList from './components/EventList';
import Header from './components/Header';
import ProgressCard from './components/ProgressCard';
import { useSchedule } from './hooks/useSchedule';

const DAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

const getTodayLabel = () => {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  return DAYS.includes(today) ? today : 'Monday';
};

function App() {
  const { schedule, toggleComplete, saveEvent, deleteEvent, resetSchedule } =
    useSchedule();
  const [activeDay, setActiveDay] = useState(getTodayLabel);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  const activeEvents = schedule[activeDay] || [];
  const completedCount = useMemo(
    () => activeEvents.filter((event) => event.completed).length,
    [activeEvents],
  );

  const openCreate = () => {
    setEditingEvent(null);
    setIsModalOpen(true);
  };

  const openEdit = (event) => {
    setEditingEvent(event);
    setIsModalOpen(true);
  };

  const handleSave = (event) => {
    saveEvent(activeDay, event);
    setIsModalOpen(false);
    setEditingEvent(null);
  };

  const handleDelete = (id) => {
    deleteEvent(activeDay, id);
    setIsModalOpen(false);
    setEditingEvent(null);
  };

  return (
    <div className="min-h-screen px-4 py-8 sm:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <Header onReset={resetSchedule} />
        <DaySelector days={DAYS} activeDay={activeDay} onChange={setActiveDay} />
        <div className="grid gap-6 lg:grid-cols-[1.1fr_2fr]">
          <ProgressCard
            day={activeDay}
            completedCount={completedCount}
            totalCount={activeEvents.length}
          />
          <EventList
            day={activeDay}
            events={activeEvents}
            onAdd={openCreate}
            onEdit={openEdit}
            onToggle={(id) => toggleComplete(activeDay, id)}
          />
        </div>
      </div>
      <EditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        onDelete={handleDelete}
        initialEvent={editingEvent}
      />
    </div>
  );
}

export default App;
