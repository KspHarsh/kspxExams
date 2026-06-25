import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import ExamCard from '../components/ui/ExamCard';
import { searchExams } from '../firebase/examService';
import { getStudyResources } from '../firebase/contentService';
import SEOHead from '../components/SEOHead';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [examResults, setExamResults] = useState([]);
  const [resourceResults, setResourceResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query.trim()) {
        setExamResults([]);
        setResourceResults([]);
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const [exams, allResources] = await Promise.all([
          searchExams(query),
          getStudyResources()
        ]);
        
        const searchLower = query.toLowerCase().trim();
        const filteredResources = allResources.filter(p => 
          p.title?.toLowerCase().includes(searchLower) || 
          p.excerpt?.toLowerCase().includes(searchLower) || 
          p.content?.toLowerCase().includes(searchLower) ||
          (Array.isArray(p.keywords) && p.keywords.some(k => k.toLowerCase().includes(searchLower)))
        );

        setExamResults(exams);
        setResourceResults(filteredResources);
      } catch (error) {
        console.error('Error searching:', error);
      }
      setLoading(false);
    };
    fetchResults();
  }, [query]);

  return (
    <div className="min-h-screen pt-28 md:pt-32">
      <SEOHead
        title={`Search: ${query}`}
        description={`Search results for "${query}" — Find government exam notifications, results, and study resources on KSPXEXAMS.`}
        path={`/search?q=${encodeURIComponent(query)}`}
        noindex={true}
      />
      <div className="mesh-gradient-bg"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 pb-20">
        {/* Header */}
        <div className="mb-12 px-2">
          <div className="flex items-center gap-3 mb-6">
            <Link to="/" className="px-4 py-1.5 bg-white/40 dark:bg-slate-800/40 backdrop-blur-md border border-white/60 dark:border-slate-600/60 rounded-full text-xs font-semibold text-slate-600 dark:text-slate-300 flex items-center gap-2 shadow-sm">
              <span className="material-symbols-outlined text-sm">home</span> Home
            </Link>
            <span className="text-slate-300 dark:text-slate-600">/</span>
            <div className="px-4 py-1.5 bg-primary-500/5 border border-primary-500/20 rounded-full text-xs font-bold text-primary-500">Search Results</div>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-4">
            <span className="material-symbols-outlined text-4xl text-primary-500">search</span>
            Search <span className="text-primary-500">Results</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-3 text-lg font-medium">
            {loading ? 'Searching...' : `${examResults.length + resourceResults.length} results for "${query}"`}
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin"></div>
          </div>
        ) : examResults.length > 0 || resourceResults.length > 0 ? (
          <div className="space-y-12">
            {examResults.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Exams</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {examResults.map(exam => <ExamCard key={exam.id} exam={exam} />)}
                </div>
              </div>
            )}

            {resourceResults.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Study Resources</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {resourceResults.map((post) => (
                    <article key={post.id} className="antigravity-card overflow-hidden group flex flex-col">
                      {post.image && (
                        <div className="relative overflow-hidden rounded-3xl h-44 -mx-2 -mt-2 mb-6">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                          {post.category && (
                            <div className="absolute bottom-3 left-3">
                              <span className="px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest text-white bg-primary-500/80 backdrop-blur-sm">{post.category}</span>
                            </div>
                          )}
                        </div>
                      )}
                      <div className="flex-1 flex flex-col">
                        <div className="flex items-center text-xs text-slate-400 dark:text-slate-500 mb-3 gap-3 font-medium">
                          {post.date && (
                            <span className="flex items-center gap-1">
                              <span className="material-symbols-outlined text-sm">calendar_month</span>
                              {post.date}
                            </span>
                          )}
                          {post.readTime && (
                            <span className="flex items-center gap-1">
                              <span className="material-symbols-outlined text-sm">schedule</span>
                              {post.readTime}
                            </span>
                          )}
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 line-clamp-2 group-hover:text-primary-500 transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-4 leading-relaxed flex-1">{post.excerpt || post.content}</p>
                        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700 mt-auto">
                          {post.link ? (
                            <a href={post.link} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-primary-500 hover:text-primary-600 transition-colors">
                              Download Now
                            </a>
                          ) : (
                            <span className="text-sm font-bold text-primary-500">Download Now</span>
                          )}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-20 glass-card rounded-3xl">
            <span className="material-symbols-outlined text-6xl text-slate-300 dark:text-slate-600 mb-4">search_off</span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">No results found</h3>
            <p className="text-slate-500 dark:text-slate-400 font-medium">Try searching with different keywords</p>
            <Link to="/" className="btn-primary mt-6 inline-block">Browse All Exams</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
