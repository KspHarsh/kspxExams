import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getResults, getAdmitCards } from '../firebase/contentService';
import SEOHead from '../components/SEOHead';

const ResultsPage = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getResults();
        setResults(data);
      } catch (error) {
        console.error('Error:', error);
      }
      setLoading(false);
    };
    fetch();
  }, []);

  return (
    <div className="min-h-screen pt-28 md:pt-32">
      <SEOHead
        title="Exam Results 2026"
        description="Download latest government exam results 2026. Check SSC, Railway, Banking, Defence, UPSC results and score cards instantly on KSPXEXAMS."
        path="/results"
      />
      <div className="mesh-gradient-bg"></div>

      <div className="max-w-4xl mx-auto px-4 md:px-6 pb-20">
        {/* Header */}
        <div className="mb-12 px-2">
          <div className="flex items-center gap-3 mb-6">
            <Link to="/" className="px-4 py-1.5 bg-white/40 dark:bg-slate-800/40 backdrop-blur-md border border-white/60 dark:border-slate-600/60 rounded-full text-xs font-semibold text-slate-600 dark:text-slate-300 flex items-center gap-2 shadow-sm">
              <span className="material-symbols-outlined text-sm">home</span> Home
            </Link>
            <span className="text-slate-300 dark:text-slate-600">/</span>
            <div className="px-4 py-1.5 bg-primary-500/5 border border-primary-500/20 rounded-full text-xs font-bold text-primary-500">Results</div>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Exam <span className="text-primary-500">Results</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-3 text-lg font-medium">Latest government exam results and score cards</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin"></div>
          </div>
        ) : results.length > 0 ? (
          <div className="space-y-4">
            {results.map((result) => (
              <div key={result.id} className="glass-card p-6 flex items-center justify-between card-hover group rounded-3xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                    <span className="material-symbols-outlined text-emerald-600 dark:text-emerald-400 icon-fill">checklist</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-primary-500 transition-colors">{result.title}</h3>
                    <p className="text-sm text-slate-400 dark:text-slate-500 font-medium">{result.date || 'No date'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="status-pill-active">{result.status || 'Available'}</span>
                  {result.link && (
                    <a href={result.link} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-sky-soft dark:bg-slate-700 text-primary-500 hover:bg-primary-500 hover:text-white transition-all magnetic-hover">
                      <span className="material-symbols-outlined text-lg">open_in_new</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 glass-card rounded-3xl">
            <span className="material-symbols-outlined text-6xl text-slate-300 dark:text-slate-600 mb-4">assignment</span>
            <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">No results published yet</p>
            <p className="text-slate-400 dark:text-slate-500 text-sm mt-1">Check back soon for updates</p>
          </div>
        )}
      </div>
    </div>
  );
};

export const AdmitCardsPage = () => {
  const [admitCards, setAdmitCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getAdmitCards();
        setAdmitCards(data);
      } catch (error) {
        console.error('Error:', error);
      }
      setLoading(false);
    };
    fetch();
  }, []);

  return (
    <div className="min-h-screen pt-28 md:pt-32">
      <SEOHead
        title="Admit Cards 2026"
        description="Download latest admit cards and hall tickets for government exams 2026. SSC, Railway, Banking, UPSC admit card links updated daily on KSPXEXAMS."
        path="/admit-cards"
      />
      <div className="mesh-gradient-bg"></div>

      <div className="max-w-4xl mx-auto px-4 md:px-6 pb-20">
        {/* Header */}
        <div className="mb-12 px-2">
          <div className="flex items-center gap-3 mb-6">
            <Link to="/" className="px-4 py-1.5 bg-white/40 dark:bg-slate-800/40 backdrop-blur-md border border-white/60 dark:border-slate-600/60 rounded-full text-xs font-semibold text-slate-600 dark:text-slate-300 flex items-center gap-2 shadow-sm">
              <span className="material-symbols-outlined text-sm">home</span> Home
            </Link>
            <span className="text-slate-300 dark:text-slate-600">/</span>
            <div className="px-4 py-1.5 bg-primary-500/5 border border-primary-500/20 rounded-full text-xs font-bold text-primary-500">Admit Cards</div>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Admit <span className="text-primary-500">Cards</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-3 text-lg font-medium">Download latest admit cards and hall tickets</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin"></div>
          </div>
        ) : admitCards.length > 0 ? (
          <div className="space-y-4">
            {admitCards.map((card) => (
              <div key={card.id} className="glass-card p-6 flex items-center justify-between card-hover group rounded-3xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-accent-100 dark:bg-accent-900/30 flex items-center justify-center">
                    <span className="material-symbols-outlined text-accent-600 dark:text-accent-400 icon-fill">badge</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-primary-500 transition-colors">{card.title}</h3>
                    <p className="text-sm text-slate-400 dark:text-slate-500 font-medium">{card.date || 'No date'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="badge-warning">{card.status || 'Available'}</span>
                  {card.link && (
                    <a href={card.link} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-sky-soft dark:bg-slate-700 text-primary-500 hover:bg-primary-500 hover:text-white transition-all magnetic-hover">
                      <span className="material-symbols-outlined text-lg">download</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 glass-card rounded-3xl">
            <span className="material-symbols-outlined text-6xl text-slate-300 dark:text-slate-600 mb-4">badge</span>
            <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">No admit cards published yet</p>
            <p className="text-slate-400 dark:text-slate-500 text-sm mt-1">Check back soon for updates</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsPage;
