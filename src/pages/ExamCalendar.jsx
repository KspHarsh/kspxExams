import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getExams } from '../firebase/examService';
import SEOHead from '../components/SEOHead';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const eventTypes = {
  applicationStart: { label: 'Application Start', color: 'bg-emerald-500', textColor: 'text-emerald-700 dark:text-emerald-400' },
  applicationEnd: { label: 'Application End', color: 'bg-red-500', textColor: 'text-red-700 dark:text-red-400' },
  examDate: { label: 'Exam Date', color: 'bg-primary-500', textColor: 'text-primary-700 dark:text-primary-400' },
  admitCardDate: { label: 'Admit Card', color: 'bg-amber-500', textColor: 'text-amber-700 dark:text-amber-400' },
  resultDate: { label: 'Result', color: 'bg-purple-500', textColor: 'text-purple-700 dark:text-purple-400' },
};

const ExamCalendar = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [viewMode, setViewMode] = useState('calendar');
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const data = await getExams();
        setExams(data);
      } catch (error) {
        console.error('Error fetching exams:', error);
      }
      setLoading(false);
    };
    fetchExams();
  }, []);

  const events = useMemo(() => {
    const allEvents = [];
    exams.forEach(exam => {
      if (exam.importantDates) {
        Object.entries(exam.importantDates).forEach(([type, dateStr]) => {
          if (dateStr && eventTypes[type]) {
            const date = new Date(dateStr);
            if (!isNaN(date.getTime())) {
              allEvents.push({
                date,
                type,
                examTitle: exam.title,
                examId: exam.id,
                ...eventTypes[type],
              });
            }
          }
        });
      }
    });
    return allEvents.sort((a, b) => a.date - b.date);
  }, [exams]);

  const monthEvents = useMemo(() => {
    return events.filter(e => e.date.getMonth() === currentMonth && e.date.getFullYear() === currentYear);
  }, [currentMonth, currentYear, events]);

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const calendarDays = [];
  for (let i = 0; i < firstDayOfMonth; i++) calendarDays.push(null);
  for (let i = 1; i <= daysInMonth; i++) calendarDays.push(i);

  const getEventsForDay = (day) => {
    return monthEvents.filter(e => e.date.getDate() === day);
  };

  const prevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y - 1); }
    else setCurrentMonth(m => m - 1);
  };

  const nextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y + 1); }
    else setCurrentMonth(m => m + 1);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 md:pt-32">
      <SEOHead
        title="Exam Calendar 2026"
        description="Government exam calendar 2026 — Track important dates for SSC, Railway, Banking, Defence, UPSC exams. Application deadlines, exam dates, and result dates."
        path="/calendar"
      />
      <div className="mesh-gradient-bg"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 pb-20">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-6 px-2">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Link to="/" className="px-4 py-1.5 bg-white/40 dark:bg-slate-800/40 backdrop-blur-md border border-white/60 dark:border-slate-600/60 rounded-full text-xs font-semibold text-slate-600 dark:text-slate-300 flex items-center gap-2 shadow-sm">
                <span className="material-symbols-outlined text-sm">home</span> Home
              </Link>
              <span className="text-slate-300 dark:text-slate-600">/</span>
              <div className="px-4 py-1.5 bg-primary-500/5 border border-primary-500/20 rounded-full text-xs font-bold text-primary-500">Calendar</div>
            </div>
            <h1 className="section-title flex items-center gap-3">
              <span className="material-symbols-outlined text-4xl text-primary-500">calendar_month</span>
              Exam <span className="text-primary-500">Calendar</span>
            </h1>
            <p className="section-subtitle">Track important exam dates at a glance</p>
          </div>

          {/* View Toggle */}
          <div className="glass-dock p-1.5 gap-1">
            <button onClick={() => setViewMode('calendar')}
              className={`px-5 py-2.5 rounded-2xl text-sm font-bold transition-all ${viewMode === 'calendar' ? 'bg-white dark:bg-slate-700 shadow-sm text-primary-500' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'}`}>
              <span className="material-symbols-outlined text-lg align-middle mr-1">calendar_view_month</span>
              Calendar
            </button>
            <button onClick={() => setViewMode('list')}
              className={`px-5 py-2.5 rounded-2xl text-sm font-bold transition-all ${viewMode === 'list' ? 'bg-white dark:bg-slate-700 shadow-sm text-primary-500' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'}`}>
              <span className="material-symbols-outlined text-lg align-middle mr-1">view_list</span>
              List
            </button>
          </div>
        </div>

        {/* Legend */}
        <div className="glass-dock mb-8 flex-wrap justify-center">
          {Object.entries(eventTypes).map(([key, val]) => (
            <div key={key} className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${val.color}`}></span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">{val.label}</span>
            </div>
          ))}
        </div>

        {viewMode === 'calendar' ? (
          <div className="glass-card overflow-hidden rounded-3xl">
            {/* Month Navigation */}
            <div className="flex items-center justify-between p-6 border-b border-white/30 dark:border-slate-700/50">
              <button onClick={prevMonth} className="p-3 rounded-2xl bg-sky-soft dark:bg-slate-700 text-slate-500 dark:text-slate-400 hover:text-primary-500 transition-all magnetic-hover">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                {MONTHS[currentMonth]} {currentYear}
              </h2>
              <button onClick={nextMonth} className="p-3 rounded-2xl bg-sky-soft dark:bg-slate-700 text-slate-500 dark:text-slate-400 hover:text-primary-500 transition-all magnetic-hover">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7">
              {DAYS.map(day => (
                <div key={day} className="p-3 text-center text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest bg-sky-soft/50 dark:bg-slate-800/50 border-b border-white/30 dark:border-slate-700/50">
                  {day}
                </div>
              ))}
              {calendarDays.map((day, i) => {
                const dayEvents = day ? getEventsForDay(day) : [];
                const isToday = day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();
                return (
                  <div key={i} className={`min-h-[80px] md:min-h-[100px] p-2 border-b border-r border-white/20 dark:border-slate-700/30 ${!day ? 'bg-sky-soft/30 dark:bg-slate-800/30' : 'hover:bg-sky-soft/50 dark:hover:bg-slate-700/30'} transition-colors`}>
                    {day && (
                      <>
                        <span className={`text-sm font-bold ${isToday ? 'w-7 h-7 rounded-xl bg-primary-500 text-white flex items-center justify-center' : 'text-slate-600 dark:text-slate-300'}`}>
                          {day}
                        </span>
                        <div className="mt-1 space-y-1">
                          {dayEvents.slice(0, 2).map((evt, j) => (
                            <Link key={j} to={`/exam/${evt.examId}`}
                              className={`block text-xs px-1.5 py-0.5 rounded-lg ${evt.color}/10 ${evt.textColor} truncate hover:opacity-80 font-medium`}>
                              <span className={`inline-block w-1.5 h-1.5 rounded-full ${evt.color} mr-1`}></span>
                              {evt.examTitle.length > 15 ? evt.examTitle.substring(0, 15) + '...' : evt.examTitle}
                            </Link>
                          ))}
                          {dayEvents.length > 2 && (
                            <span className="text-xs text-slate-400 dark:text-slate-500 pl-1 font-medium">+{dayEvents.length - 2} more</span>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* List View */
          <div className="space-y-4">
            {monthEvents.length > 0 ? monthEvents.map((event, i) => (
              <Link key={i} to={`/exam/${event.examId}`}
                className="glass-card p-6 flex items-center justify-between hover:shadow-lg transition-all group rounded-3xl">
                <div className="flex items-center gap-5">
                  <div className="text-center w-16">
                    <div className="text-3xl font-extrabold text-slate-900 dark:text-white">{event.date.getDate()}</div>
                    <div className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase">{MONTHS[event.date.getMonth()].substring(0, 3)}</div>
                  </div>
                  <div className={`w-1 h-12 rounded-full ${event.color}`}></div>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white group-hover:text-primary-500 transition-colors">{event.examTitle}</p>
                    <p className={`text-sm font-semibold ${event.textColor}`}>{event.label}</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-slate-300 dark:text-slate-600 group-hover:text-primary-500 transition-colors">chevron_right</span>
              </Link>
            )) : (
              <div className="glass-card p-16 text-center rounded-3xl">
                <span className="material-symbols-outlined text-5xl text-slate-300 dark:text-slate-600 mb-4">event_busy</span>
                <p className="text-slate-500 dark:text-slate-400 font-medium">No events this month</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamCalendar;
