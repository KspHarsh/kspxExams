import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';
import { useTheme } from '../../context/ThemeContext';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Notifications', path: '/category/all' },
  { name: 'Results', path: '/results' },
  { name: 'Admit Cards', path: '/admit-cards' },
  { name: 'Answer Keys', path: '/answer-keys' },
  { name: 'Calendar', path: '/calendar' },
  { name: 'Study Resources', path: '/study-resources' },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const { darkMode, toggleTheme } = useTheme();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <nav className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] md:w-[90%] max-w-6xl">
      <div className="glass-pill">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 flex-shrink-0">
          <div className="h-10 w-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary-500/20 border border-white/30">
            <span className="material-symbols-outlined text-xl icon-fill">school</span>
          </div>
          <span className="text-lg font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-primary-700 hidden sm:block">KSPxExams</span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-sm font-semibold px-4 py-2 rounded-full transition-all duration-300 ${location.pathname === link.path
                ? 'bg-primary-500/10 text-primary-500 backdrop-blur-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-primary-500'
                }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Search Button */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2.5 rounded-xl bg-sky-soft dark:bg-slate-700 text-slate-500 dark:text-slate-300 hover:text-primary-500 transition-all magnetic-hover"
          >
            <span className="material-symbols-outlined text-xl">search</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl bg-sky-soft dark:bg-slate-700 text-slate-500 dark:text-slate-300 hover:text-primary-500 dark:hover:text-accent-400 transition-all magnetic-hover"
            aria-label="Toggle theme"
          >
            <span className="material-symbols-outlined text-xl">{darkMode ? 'light_mode' : 'dark_mode'}</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2.5 rounded-xl bg-sky-soft dark:bg-slate-700 text-slate-500 dark:text-slate-300 hover:text-primary-500 transition-all"
          >
            {mobileOpen ? <HiX className="w-5 h-5" /> : <HiMenu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Search Bar Dropdown */}
      {searchOpen && (
        <div className="mt-3 glass-card p-4 animate-slide-down rounded-2xl">
          <form onSubmit={handleSearch} className="relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
            <input
              type="text"
              placeholder="Search exams, jobs, categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field pl-12 pr-4"
              autoFocus
            />
          </form>
        </div>
      )}

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden mt-3 glass-card p-4 animate-slide-down rounded-2xl">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-3 rounded-xl text-sm font-semibold transition-all ${location.pathname === link.path
                  ? 'bg-sky-soft dark:bg-slate-700 text-primary-500'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-sky-soft dark:hover:bg-slate-700 hover:text-primary-500'
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
