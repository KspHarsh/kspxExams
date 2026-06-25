import { Link } from 'react-router-dom';
import { useViewCount } from '../../hooks/useViewCount';

const Footer = () => {
  const categories = ['Banking', 'SSC', 'Railway', 'Defence', 'Teaching', 'State Govt Jobs', 'Engineering', 'Medical'];
  const viewCount = useViewCount();

  return (
    <footer className="relative mt-20">
      <div className="frosted-glass-main py-16 px-4 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary-500/20 border border-white/30">
                <span className="material-symbols-outlined text-xl icon-fill">school</span>
              </div>
              <span className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-white">KSPXEXAMS</span>
            </Link>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
              Your one-stop destination for latest government job notifications, exam updates, admit cards, results, and study resources.
            </p>
            <div className="flex gap-3">
              {['language', 'share', 'mail', 'play_arrow'].map((icon) => (
                <button key={icon} className="p-2 rounded-xl bg-sky-soft dark:bg-slate-700 text-slate-400 dark:text-slate-500 hover:text-primary-500 dark:hover:text-primary-400 transition-all magnetic-hover">
                  <span className="material-symbols-outlined text-lg">{icon}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-4">Quick Links</h3>
            {[
              { name: 'Latest Notifications', path: '/category/all' },
              { name: 'Admit Cards', path: '/admit-cards' },
              { name: 'Results', path: '/results' },
              { name: 'Answer Keys', path: '/answer-keys' },
              { name: 'Exam Calendar', path: '/calendar' },
              { name: 'Study Resources', path: '/study-resources' },
            ].map((link) => (
              <Link key={link.name} to={link.path} className="block text-sm text-slate-500 dark:text-slate-400 hover:text-primary-500 dark:hover:text-primary-400 py-1.5 transition-colors font-medium">
                {link.name}
              </Link>
            ))}
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-4">Categories</h3>
            {categories.map((cat) => (
              <Link key={cat} to={`/category/${cat.toLowerCase().replace(/\s+/g, '-')}`} className="block text-sm text-slate-500 dark:text-slate-400 hover:text-primary-500 dark:hover:text-primary-400 py-1.5 transition-colors font-medium">
                {cat}
              </Link>
            ))}
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-4">Contact Us</h3>
            <div className="space-y-3 mb-6">
              <div>
                <p className="text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500 font-bold">EMAIL</p>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-300">contact@kspxexams.com</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500 font-bold">TELEGRAM</p>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-300">@kspxexams</p>
              </div>
            </div>

            <h4 className="font-bold text-slate-900 dark:text-white mb-3">Newsletter</h4>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="input-field flex-1 text-sm py-2.5"
              />
              <button className="glossy-button-indigo px-5 py-2.5 rounded-xl font-bold text-sm magnetic-hover">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-white/20 dark:border-slate-700/50 flex flex-col md:flex-row justify-between items-center md:items-center gap-4">
          <div className="text-xs md:text-sm text-slate-500 dark:text-slate-400 font-medium w-full md:w-auto text-center md:text-left">
            © {new Date().getFullYear()} KSPXEXAMS. All rights reserved.
          </div>

          {/* Unique View Count */}
          <div className="w-full md:w-auto flex justify-end">
            <div className="flex items-center gap-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md px-3 py-1.5 rounded-full shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-white/50 dark:border-slate-700/50">
              <span className="material-symbols-outlined text-indigo-500 text-[18px] drop-shadow-sm icon-fill">visibility</span>
              <div className="flex items-baseline gap-1">
                <span className="font-extrabold text-slate-800 dark:text-white text-base tracking-tight">{viewCount.toLocaleString()}</span>
                <span className="text-slate-500 dark:text-slate-400 text-xs font-semibold tracking-wide">Active Users</span>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] ml-1 relative">
                <div className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
