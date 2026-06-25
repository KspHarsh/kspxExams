import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getExams } from '../../firebase/examService';
import { getCategories } from '../../firebase/categoryService';

const Dashboard = () => {
  const [exams, setExams] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [examsData, catsData] = await Promise.all([getExams(), getCategories()]);
        setExams(examsData);
        setCategories(catsData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const stats = [
    { label: 'Total Exams', value: exams.length, icon: 'menu_book', bgColor: 'bg-sky-soft dark:bg-primary-900/20', iconColor: 'text-primary-500', hoverBg: 'group-hover:bg-primary-500', badge: '+12.5%', badgeColor: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300' },
    { label: 'Categories', value: categories.length, icon: 'category', bgColor: 'bg-amber-50 dark:bg-amber-900/20', iconColor: 'text-accent-400', hoverBg: 'group-hover:bg-accent-400', badge: 'Stable', badgeColor: 'bg-slate-100 dark:bg-slate-700 text-slate-400 dark:text-slate-500' },
    { label: 'Active', value: exams.filter(e => e.status === 'Active').length, icon: 'notifications_active', bgColor: 'bg-blue-50 dark:bg-blue-900/20', iconColor: 'text-blue-500', hoverBg: 'group-hover:bg-blue-500', badge: 'Live', badgeColor: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300' },
    { label: 'Featured', value: exams.filter(e => e.featured).length, icon: 'school', bgColor: 'bg-green-50 dark:bg-green-900/20', iconColor: 'text-emerald-500', hoverBg: 'group-hover:bg-emerald-500', badge: 'Trending', badgeColor: 'bg-primary-50 dark:bg-primary-900/30 text-primary-500 dark:text-primary-400' },
  ];

  const recentExams = exams.slice(0, 8);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin"></div>
        <span className="ml-3 text-slate-500 dark:text-slate-400 font-medium">Loading dashboard...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary-500 to-primary-400 p-8 md:p-10 text-white shadow-xl shadow-primary-500/20">
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Welcome back, Admin! 👋</h2>
          <p className="text-primary-50 leading-relaxed mb-6 opacity-90">
            Today is a great day to help students reach their dreams. You have {exams.length} exam notifications and {categories.length} categories ready.
          </p>
          <Link to="/admin/exams" className="inline-flex items-center gap-2 bg-accent-400 hover:bg-accent-500 text-slate-900 font-bold px-6 py-2.5 rounded-2xl transition-all magnetic-hover shadow-lg shadow-accent-400/20">
            <span className="material-symbols-outlined text-xl">rocket_launch</span>
            Manage Exams
          </Link>
        </div>
        <div className="absolute right-12 top-1/2 -translate-y-1/2 opacity-20 pointer-events-none hidden md:block">
          <span className="material-symbols-outlined text-[10rem] rotate-12">auto_stories</span>
        </div>
        <div className="absolute right-40 bottom-0 opacity-10 pointer-events-none hidden md:block">
          <span className="material-symbols-outlined text-[8rem] -rotate-12">school</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="study-glass p-5 md:p-6 rounded-3xl group hover:bg-white dark:hover:bg-slate-800 transition-all magnetic-hover">
            <div className="flex justify-between items-start mb-5">
              <div className={`p-3 ${stat.bgColor} rounded-2xl ${stat.iconColor} ${stat.hoverBg} group-hover:text-white transition-all`}>
                <span className="material-symbols-outlined">{stat.icon}</span>
              </div>
              <span className={`text-xs font-bold ${stat.badgeColor} px-2.5 py-1 rounded-lg`}>{stat.badge}</span>
            </div>
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{stat.label}</p>
            <p className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3">
        <Link to="/admin/exams" className="btn-accent inline-flex items-center gap-2">
          <span className="material-symbols-outlined text-lg">add_circle</span>
          Add New Exam
        </Link>
        <Link to="/admin/categories" className="btn-primary inline-flex items-center gap-2">
          <span className="material-symbols-outlined text-lg">category</span>
          Manage Categories
        </Link>
        <a href="/" target="_blank" rel="noopener noreferrer" className="btn-outline inline-flex items-center gap-2">
          <span className="material-symbols-outlined text-lg">open_in_new</span>
          View Website
        </a>
      </div>

      {/* Recent Exams Table */}
      <div>
        <div className="flex justify-between items-center px-4 mb-6">
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white">Active Exam Catalog</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">Monitoring ongoing student applications</p>
          </div>
          <Link to="/admin/exams" className="bg-primary-500/10 text-primary-500 hover:bg-primary-500 hover:text-white px-5 py-2.5 rounded-2xl font-bold transition-all magnetic-hover flex items-center gap-2 text-sm">
            <span className="material-symbols-outlined text-lg">add_circle</span>
            New Entry
          </Link>
        </div>

        <div className="study-glass rounded-3xl overflow-hidden">
          {recentExams.length === 0 ? (
            <div className="text-center py-16">
              <span className="material-symbols-outlined text-5xl text-slate-300 dark:text-slate-600 mb-4">inventory_2</span>
              <p className="text-slate-500 dark:text-slate-400 font-medium">No exams in database yet</p>
              <Link to="/admin/exams" className="text-primary-500 text-sm font-bold mt-2 inline-block">Add your first exam →</Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-separate border-spacing-y-2 px-4 md:px-6 py-4">
                <thead>
                  <tr className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                    <th className="px-6 py-4">Exam Details</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentExams.map((exam) => (
                    <tr key={exam.id} className="bg-white dark:bg-slate-800 hover:bg-sky-soft/50 dark:hover:bg-slate-700/50 transition-colors duration-200 shadow-sm">
                      <td className="px-6 py-5 rounded-l-3xl">
                        <div className="flex items-center gap-3">
                          {exam.imageUrl && <img src={exam.imageUrl} alt="" className="w-10 h-10 rounded-xl object-cover" />}
                          <div>
                            <div className="font-bold text-slate-800 dark:text-slate-200 line-clamp-1">{exam.title}</div>
                            <div className="text-[11px] font-bold text-primary-500/60 uppercase">{exam.id?.slice(0, 12)}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-300">{exam.category}</span>
                      </td>
                      <td className="px-6 py-5">
                        <span className={exam.status === 'Active' ? 'status-pill-active' : 'status-pill-draft'}>
                          {exam.status}
                        </span>
                      </td>
                      <td className="px-6 py-5 rounded-r-3xl text-right">
                        <div className="flex justify-end gap-2">
                          <button className="p-2 text-slate-400 dark:text-slate-500 hover:text-primary-500 transition-colors magnetic-hover">
                            <span className="material-symbols-outlined">edit</span>
                          </button>
                          <button className="p-2 text-slate-400 dark:text-slate-500 hover:text-red-400 transition-colors magnetic-hover">
                            <span className="material-symbols-outlined">delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
