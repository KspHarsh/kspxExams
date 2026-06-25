import { Link } from 'react-router-dom';
import ShareButton from './ShareButton';

const ExamCard = ({ exam }) => {
  return (
    <Link to={`/exam/${exam.id}`} className="antigravity-card shadow-float-sm hover:shadow-float-md group flex flex-col overflow-hidden">
      {/* Image area */}
      {exam.imageUrl && (
        <div className="relative overflow-hidden rounded-2xl -mx-2 -mt-2 mb-6 h-40">
          <img
            src={exam.imageUrl}
            alt={exam.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>
      )}

      {/* Badges row */}
      <div className="flex items-center gap-2 mb-3">
        {exam.category && (
          <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30">
            {exam.category}
          </span>
        )}
        {exam.status && (
          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
            exam.status === 'Active' ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' : 'bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400'
          }`}>
            {exam.status}
          </span>
        )}
      </div>

      {/* Title + description */}
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 leading-snug line-clamp-2 group-hover:text-primary-500 transition-colors">
        {exam.title}
      </h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-5 leading-relaxed flex-1">
        {exam.description}
      </p>

      {/* Meta row */}
      <div className="flex items-center gap-4 text-xs text-slate-400 dark:text-slate-500 font-medium mb-5">
        {exam.applicationDeadline && (
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">event</span>
            <span>{exam.applicationDeadline}</span>
          </div>
        )}
        {exam.vacancy && (
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">group</span>
            <span>{exam.vacancy} Posts</span>
          </div>
        )}
      </div>

      {/* Bottom action */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700 mt-auto">
        <span className="text-sm font-bold text-primary-500">View Details</span>
        <div className="flex items-center gap-2">
          <ShareButton
            title={exam.title}
            text={`${exam.title}${exam.category ? ' - ' + exam.category : ''}`}
            url={`${window.location.origin}/exam/${exam.id}`}
          />
          <div className="w-10 h-10 rounded-full bg-primary-500 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-lg">arrow_forward</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ExamCard;
