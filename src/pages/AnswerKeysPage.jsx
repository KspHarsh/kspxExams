import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAnswerKeys } from '../firebase/contentService';
import SEOHead from '../components/SEOHead';

const AnswerKeysPage = () => {
  const [answerKeys, setAnswerKeys] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getAnswerKeys();
        setAnswerKeys(data);
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
        title="Answer Keys 2026"
        description="Download official and unofficial answer keys for government exams 2026. SSC, Railway, Banking, Defence answer keys available on KSPXEXAMS."
        path="/answer-keys"
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
            <div className="px-4 py-1.5 bg-primary-500/5 border border-primary-500/20 rounded-full text-xs font-bold text-primary-500">Answer Keys</div>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Answer <span className="text-primary-500">Keys</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-3 text-lg font-medium">Download official and unofficial answer keys</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin"></div>
          </div>
        ) : answerKeys.length > 0 ? (
          <div className="space-y-4">
            {answerKeys.map((key) => (
              <div key={key.id} className="glass-card p-6 flex items-center justify-between card-hover group rounded-3xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                    <span className="material-symbols-outlined text-amber-600 dark:text-amber-400 icon-fill">key</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-primary-500 transition-colors">{key.title}</h3>
                    <p className="text-sm text-slate-400 dark:text-slate-500 font-medium">{key.date || 'No date'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={key.status === 'Official' ? 'badge-success' : 'badge-warning'}>{key.status}</span>
                  {key.link && (
                    <a href={key.link} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-sky-soft dark:bg-slate-700 text-primary-500 hover:bg-primary-500 hover:text-white transition-all magnetic-hover">
                      <span className="material-symbols-outlined text-lg">download</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 glass-card rounded-3xl">
            <span className="material-symbols-outlined text-6xl text-slate-300 dark:text-slate-600 mb-4">key</span>
            <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">No answer keys published yet</p>
            <p className="text-slate-400 dark:text-slate-500 text-sm mt-1">Check back soon for updates</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnswerKeysPage;
