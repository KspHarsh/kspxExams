import { Outlet, Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { HiX, HiMenu } from 'react-icons/hi';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { logoutAdmin } from '../../firebase/authService';

const adminLinks = [
  { name: 'Dashboard', path: '/admin/dashboard', icon: 'dashboard' },
  { name: 'Manage Exams', path: '/admin/exams', icon: 'menu_book' },
  { name: 'Categories', path: '/admin/categories', icon: 'category' },
  { name: 'Homepage', path: '/admin/homepage', icon: 'settings' },
  { name: 'Results', path: '/admin/results', icon: 'checklist' },
  { name: 'Admit Cards', path: '/admin/admit-cards', icon: 'badge' },
  { name: 'Answer Keys', path: '/admin/answer-keys', icon: 'key' },
  { name: 'Study Resources', path: '/admin/study-resources', icon: 'edit_note' },
];

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { darkMode, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, loading } = useAuth();

  const handleLogout = async () => {
    try {
      await logoutAdmin();
      navigate('/admin');
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-sky-soft dark:bg-[#0B1120]">
        <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <div className="min-h-screen flex bg-sky-soft dark:bg-[#0B1120]">
      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden" onClick={() => setSidebarOpen(false)}></div>
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-72 flex-shrink-0 bg-white dark:bg-slate-900 border-r border-sky-medium dark:border-slate-800 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="flex flex-col h-full p-6">
          {/* Logo */}
          <div className="mb-10 flex items-center justify-between">
            <Link to="/admin/dashboard" className="flex items-center gap-3 px-2">
              <div className="h-10 w-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary-500/20">
                <span className="material-symbols-outlined text-xl">school</span>
              </div>
              <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-primary-400">KSPXEXAMS</span>
            </Link>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
              <HiX className="w-5 h-5" />
            </button>
          </div>

          {/* Nav Links */}
          <nav className="flex-1 space-y-2">
            {adminLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setSidebarOpen(false)}
                className={`sidebar-item ${location.pathname === link.path ? 'active' : ''}`}
              >
                <span className="material-symbols-outlined text-xl">{link.icon}</span>
                <span className="text-sm">{link.name}</span>
              </Link>
            ))}
          </nav>

          {/* Bottom Study Guide Card */}
          <div className="p-4 bg-sky-soft dark:bg-slate-800 rounded-3xl relative overflow-hidden">
            <div className="relative z-10">
              <p className="text-xs font-bold text-primary-500 uppercase tracking-wider mb-1">Study Guide</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">Need help managing your dashboard?</p>
              <button className="w-full py-2 bg-primary-500 text-white text-xs font-bold rounded-xl shadow-md magnetic-hover">View Docs</button>
            </div>
            <span className="material-symbols-outlined absolute -bottom-2 -right-2 text-6xl text-primary-500/10 rotate-12">local_library</span>
          </div>

          {/* Footer Actions */}
          <div className="mt-4 space-y-1">
            <Link to="/" target="_blank" className="sidebar-item text-sm">
              <span className="material-symbols-outlined text-xl">home</span>
              <span>View Website</span>
            </Link>
            <button onClick={toggleTheme} className="w-full sidebar-item text-sm">
              <span className="material-symbols-outlined text-xl">{darkMode ? 'light_mode' : 'dark_mode'}</span>
              <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
            <button onClick={handleLogout} className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-sm font-medium text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500 transition-all">
              <span className="material-symbols-outlined text-xl">logout</span>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        {/* Top Bar */}
        <header className="h-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-sky-medium dark:border-slate-800 flex items-center justify-between px-6 md:px-10 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2.5 rounded-xl bg-sky-soft dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-primary-500 transition-colors">
              <HiMenu className="w-5 h-5" />
            </button>
            <div className="relative group hidden md:block">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors">search</span>
              <input className="bg-sky-soft dark:bg-slate-800 dark:text-slate-200 border-none rounded-2xl py-2.5 pl-12 pr-6 text-sm focus:ring-2 focus:ring-primary-500/20 w-80 placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-all outline-none" placeholder="Search exams, students, records..." type="text" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2.5 bg-sky-soft dark:bg-slate-800 rounded-xl text-slate-500 dark:text-slate-400 hover:text-primary-500 transition-all magnetic-hover">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 border-2 border-white dark:border-slate-900 rounded-full"></span>
            </button>
            <div className="h-8 w-[1px] bg-sky-medium dark:bg-slate-700"></div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-800 dark:text-slate-200">Admin</p>
                <p className="text-[11px] font-semibold text-primary-500 bg-sky-soft dark:bg-slate-800 px-2 py-0.5 rounded-md">Head Master</p>
              </div>
              <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white text-sm font-bold border-2 border-white dark:border-slate-800 shadow-md">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 md:p-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
