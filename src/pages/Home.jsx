import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ExamCard from '../components/ui/ExamCard';
import SEOHead from '../components/SEOHead';
import { getExams } from '../firebase/examService';
import { getCategories } from '../firebase/categoryService';
import { getResults, getAdmitCards } from '../firebase/contentService';

const Home = () => {
  const [exams, setExams] = useState([]);
  const [categories, setCategories] = useState([]);
  const [results, setResults] = useState([]);
  const [admitCards, setAdmitCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [examsData, catsData, resultsData, admitCardsData] = await Promise.all([getExams(), getCategories(), getResults(), getAdmitCards()]);
        setExams(examsData);
        setCategories(catsData);
        setResults(resultsData.slice(0, 5));
        setAdmitCards(admitCardsData.slice(0, 5));
      } catch (error) {
        console.error('Error fetching homepage data:', error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const featuredExams = exams.filter(e => e.featured);
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const latestExams = exams.slice(0, 6);
  const trendingExams = exams.filter(e => e.trending).slice(0, 5);

  // Auto-rotate featured exams every 3 seconds
  useEffect(() => {
    if (featuredExams.length <= 1) return;
    const timer = setInterval(() => {
      setFeaturedIndex(prev => (prev + 1) % featuredExams.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [featuredExams.length]);

  const currentFeatured = featuredExams[featuredIndex] || exams[0];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-slate-500 dark:text-slate-400 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <SEOHead
        path="/"
        description="KSPXEXAMS — Your #1 source for latest government job notifications, exam results, admit cards, answer keys, and free study resources. Updated daily for 2026."
      />
      {/* Mesh gradient background */}
      <div className="mesh-gradient-bg"></div>

      {/* Floating glow blobs */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-[-1]">
        <div className="absolute top-[10%] left-[5%] w-[30rem] h-[30rem] bg-indigo-200/30 dark:bg-indigo-900/20 rounded-full floating-glow"></div>
        <div className="absolute bottom-[10%] right-[5%] w-[25rem] h-[25rem] bg-sky-200/30 dark:bg-sky-900/20 rounded-full floating-glow"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-lavender-mist/20 dark:bg-indigo-950/20 rounded-full floating-glow"></div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-36 md:pt-44 pb-20 px-4 md:px-10 min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Decorative background icons */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute left-[8%] top-[25%] opacity-[0.08] text-primary-500">
            <span className="material-symbols-outlined text-[10rem]">menu_book</span>
          </div>
          <div className="absolute right-[12%] top-[15%] opacity-[0.08] text-accent-400">
            <span className="material-symbols-outlined text-[8rem]">auto_stories</span>
          </div>
          <div className="absolute right-[8%] bottom-[15%] opacity-[0.06] text-sky-400">
            <span className="material-symbols-outlined text-[12rem]">school</span>
          </div>
        </div>

        <div className="max-w-5xl text-center relative z-10 frosted-glass-main p-10 md:p-16 lg:p-20 rounded-[3rem] md:rounded-[4rem] mx-auto">
          {currentFeatured ? (
            <div key={currentFeatured.id} style={{ animation: 'slideUp 0.6s ease-out' }}>
              <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl border border-white/50 dark:border-slate-600/50 rounded-full mb-8 shadow-inner">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 shadow-[0_0_8px_2px_rgba(239,68,68,0.6)]"></span>
                </span>
                <span className="text-[11px] font-extrabold text-slate-600 dark:text-slate-300 uppercase tracking-[0.2em]">
                  Featured Notification {featuredExams.length > 1 && `(${featuredIndex + 1}/${featuredExams.length})`}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white leading-tight mb-6 tracking-tight">
                {currentFeatured.title?.split(' ').slice(0, 3).join(' ')} <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-500 via-primary-400 to-sky-500">
                  {currentFeatured.title?.split(' ').slice(3).join(' ') || 'Exam Updates'}
                </span>
              </h1>

              <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10 font-medium">
                {currentFeatured.description}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                <Link
                  to={`/exam/${currentFeatured.id}`}
                  className="w-full sm:w-auto px-10 py-4 text-base font-extrabold rounded-2xl glossy-button-indigo hover:scale-105 transition-transform flex items-center justify-center gap-3"
                >
                  View Details
                  <span className="material-symbols-outlined text-white icon-fill">rocket_launch</span>
                </Link>
                {currentFeatured.applyLink && (
                  <a
                    href={currentFeatured.applyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-10 py-4 bg-white/40 dark:bg-slate-700/40 backdrop-blur-2xl border border-white/60 dark:border-slate-600/60 text-slate-800 dark:text-slate-200 text-base font-bold rounded-2xl hover:bg-white/50 dark:hover:bg-slate-700/60 hover:scale-105 transition-all flex items-center justify-center gap-3"
                  >
                    Apply Now
                    <span className="material-symbols-outlined text-primary-500 icon-fill">open_in_new</span>
                  </a>
                )}
              </div>

              {/* Dot indicators */}
              {featuredExams.length > 1 && (
                <div className="flex items-center justify-center gap-2">
                  {featuredExams.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setFeaturedIndex(i)}
                      className={`rounded-full transition-all duration-300 ${i === featuredIndex ? 'w-8 h-3 bg-primary-500 shadow-lg' : 'w-3 h-3 bg-slate-300 dark:bg-slate-600 hover:bg-slate-400'}`}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="py-12">
              <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                Study Lighter, <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-500 via-primary-400 to-sky-500">Aim Higher.</span>
              </h1>
              <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium">
                Your premium destination for government exam notifications, delivered through a focused experience.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Category Navigation Grid */}
      {categories.length > 0 && (
        <section className="py-16 md:py-24 px-4 md:px-10 max-w-7xl mx-auto relative">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-xl">
              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">Explore Categories</h2>
              <p className="text-slate-500 dark:text-slate-400 text-lg font-medium leading-relaxed">Browse specialized exam notifications curated for your success.</p>
            </div>
            <Link to="/category/all" className="px-6 py-3 bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl border border-white/50 dark:border-slate-600/50 text-primary-500 font-bold rounded-2xl hover:shadow-lg transition-all flex items-center gap-2 group">
              Browse All <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">east</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {categories.map((cat, index) => (
              <Link
                key={cat.id}
                to={`/category/${cat.slug}`}
                className="glass-card-tile p-6 md:p-8 text-center group cursor-pointer"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className={`w-14 h-14 mx-auto mb-4 rounded-2xl overflow-hidden bg-gradient-to-br ${cat.color || 'from-primary-500 to-primary-700'} flex items-center justify-center text-2xl shadow-lg group-hover:rotate-6 transition-transform`}>
                  {cat.imageUrl ? <img src={cat.imageUrl} alt={cat.name} className="w-full h-full object-cover" /> : '📋'}
                </div>
                <h3 className="font-bold text-slate-800 dark:text-slate-200 text-sm">{cat.name}</h3>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Latest Notifications + Trending Sidebar */}
      <section className="py-16 md:py-24 px-4 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="section-title">Latest Notifications</h2>
              <p className="section-subtitle">Stay updated with the newest exam announcements</p>
            </div>
            <Link to="/category/all" className="btn-outline hidden sm:inline-flex items-center gap-2 text-sm">
              View All <span className="material-symbols-outlined text-lg">east</span>
            </Link>
          </div>

          {latestExams.length > 0 ? (
            <div className="grid lg:grid-cols-4 gap-8">
              {/* Exam Cards Grid */}
              <div className="lg:col-span-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {latestExams.map((exam) => (
                  <ExamCard key={exam.id} exam={exam} />
                ))}
              </div>

              {/* Trending Sidebar */}
              <div className="space-y-6">
                {trendingExams.length > 0 && (
                  <div className="glass-card p-6">
                    <h3 className="font-bold text-slate-900 dark:text-white mb-5 flex items-center gap-2">
                      <span className="material-symbols-outlined text-accent-400 icon-fill">trending_up</span>
                      Trending Exams
                    </h3>
                    <div className="space-y-3">
                      {trendingExams.map((exam, index) => (
                        <Link
                          key={exam.id}
                          to={`/exam/${exam.id}`}
                          className="flex items-start gap-3 p-3 rounded-2xl hover:bg-sky-soft dark:hover:bg-slate-700 transition-colors group"
                        >
                          <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-gradient-to-br from-accent-400 to-accent-500 text-white flex items-center justify-center text-xs font-bold shadow-sm">
                            {index + 1}
                          </span>
                          <div>
                            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover:text-primary-500 transition-colors line-clamp-1">
                              {exam.title}
                            </p>
                            <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">{exam.category}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quick Links */}
                <div className="glass-card p-6">
                  <h3 className="font-bold text-slate-900 dark:text-white mb-5 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary-500 icon-fill">quick_reference_all</span>
                    Quick Links
                  </h3>
                  <div className="space-y-2">
                    {[
                      { name: 'Exam Calendar', icon: 'calendar_month', path: '/calendar' },
                      { name: 'Study Resources', icon: 'school', path: '/study-resources' },
                      { name: 'All Results', icon: 'description', path: '/results' },
                    ].map((link) => (
                      <Link
                        key={link.name}
                        to={link.path}
                        className="flex items-center gap-3 p-3 rounded-2xl text-sm text-slate-500 dark:text-slate-400 hover:bg-sky-soft dark:hover:bg-slate-700 hover:text-primary-500 transition-colors font-medium"
                      >
                        <span className="material-symbols-outlined text-lg">{link.icon}</span>
                        <span>{link.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-16 glass-card">
              <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">No exam notifications yet</p>
              <p className="text-slate-400 dark:text-slate-500 text-sm mt-1">Check back soon for updates</p>
            </div>
          )}
        </div>
      </section>

      {/* Results & Admit Cards */}
      <section className="py-16 md:py-24 px-4 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Latest Results */}
            <div className="glass-card p-8">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                  <span className="material-symbols-outlined text-emerald-600 dark:text-emerald-400 icon-fill">checklist</span>
                </div>
                Latest Results
              </h3>
              <div className="space-y-3">
                {results.map((result) => (
                  <div
                    key={result.id}
                    className="flex items-center justify-between p-4 rounded-2xl hover:bg-sky-soft dark:hover:bg-slate-700 transition-colors cursor-pointer group"
                  >
                    <div>
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover:text-primary-500 transition-colors">
                        {result.title}
                      </p>
                      <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5 font-medium">{result.date}</p>
                    </div>
                    {result.status && <span className="badge-primary">{result.status}</span>}
                  </div>
                ))}
                {results.length === 0 && <p className="text-sm text-slate-400 dark:text-slate-500 text-center py-4 font-medium">No results yet</p>}
              </div>
              <Link to="/results" className="mt-4 inline-flex items-center text-sm font-bold text-primary-500 hover:text-primary-600 gap-1">
                View All Results <span className="material-symbols-outlined text-lg">east</span>
              </Link>
            </div>

            {/* Admit Card Updates */}
            <div className="glass-card p-8">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent-100 dark:bg-accent-900/30 flex items-center justify-center">
                  <span className="material-symbols-outlined text-accent-600 dark:text-accent-400 icon-fill">badge</span>
                </div>
                Admit Card Updates
              </h3>
              <div className="space-y-3">
                {admitCards.map((card) => (
                  <div
                    key={card.id}
                    className="flex items-center justify-between p-4 rounded-2xl hover:bg-sky-soft dark:hover:bg-slate-700 transition-colors cursor-pointer group"
                  >
                    <div>
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover:text-primary-500 transition-colors">
                        {card.title}
                      </p>
                      <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5 font-medium">{card.date}</p>
                    </div>
                    {card.status && <span className="badge-primary">{card.status}</span>}
                  </div>
                ))}
                {admitCards.length === 0 && <p className="text-sm text-slate-400 dark:text-slate-500 text-center py-4 font-medium">No admit cards yet</p>}
              </div>
              <Link to="/admit-cards" className="mt-4 inline-flex items-center text-sm font-bold text-primary-500 hover:text-primary-600 gap-1">
                View All Admit Cards <span className="material-symbols-outlined text-lg">east</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
