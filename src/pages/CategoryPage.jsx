import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ExamCard from '../components/ui/ExamCard';
import { getExams } from '../firebase/examService';
import { getCategories } from '../firebase/categoryService';
import SEOHead from '../components/SEOHead';

const CategoryPage = () => {
  const { slug } = useParams();
  const [exams, setExams] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('latest');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [allExams, catsData] = await Promise.all([getExams(), getCategories()]);
        const categoryName = catsData.find(c => c.slug === slug)?.name;
        const filtered = slug === 'all' ? allExams : allExams.filter(e => e.category === categoryName);
        setExams(filtered);
        setCategories(catsData);
      } catch (error) {
        console.error('Error fetching category data:', error);
      }
      setLoading(false);
    };
    fetchData();
  }, [slug]);

  const currentCategory = categories.find(c => c.slug === slug);

  let displayedExams = [...exams];
  if (filterStatus !== 'all') {
    displayedExams = displayedExams.filter(e => e.status === filterStatus);
  }
  if (sortBy === 'oldest') {
    displayedExams.reverse();
  }

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
        title={`${currentCategory?.name || (slug === 'all' ? 'All' : slug)} Exam Notifications 2026`}
        description={`Browse ${currentCategory?.name || 'all'} government exam notifications 2026. Latest vacancies, eligibility, and important dates on KSPXEXAMS.`}
        path={`/category/${slug}`}
      />
      <div className="mesh-gradient-bg"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 pb-20">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6 px-2">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 bg-primary-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary-500/20">
                <span className="material-symbols-outlined text-xl">
                  {currentCategory?.icon || 'menu_book'}
                </span>
              </div>
              <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                KSPX<span className="text-primary-500">EXAMS</span>
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              {currentCategory?.name || (slug === 'all' ? 'All Exam' : slug)} <br />
              <span className="text-primary-500">Notifications</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-4 max-w-lg text-lg font-medium leading-relaxed">
              {displayedExams.length} notifications found. Explore specialized exam tracks curated for your success.
            </p>
          </div>
          <div className="flex gap-3">
            <button className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400 dark:text-slate-500 hover:text-primary-500 transition-colors magnetic-hover">
              <span className="material-symbols-outlined">grid_view</span>
            </button>
            <button className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400 dark:text-slate-500 hover:text-primary-500 transition-colors magnetic-hover">
              <span className="material-symbols-outlined">view_list</span>
            </button>
          </div>
        </header>

        {/* Filter Dock */}
        <div className="flex justify-center mb-12">
          <nav className="glass-dock flex-wrap justify-center">
            <div className="flex items-center gap-1 flex-wrap">
              <button
                onClick={() => setFilterStatus('all')}
                className={`filter-pill ${filterStatus === 'all' ? 'active' : ''}`}
              >
                All Exams
              </button>
              {['Active', 'Upcoming', 'Expired'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`filter-pill ${filterStatus === status ? 'active' : ''}`}
                >
                  {status}
                </button>
              ))}
            </div>
            <div className="h-6 w-[1px] bg-slate-200 dark:bg-slate-600 mx-2 hidden md:block"></div>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="bg-transparent border-none focus:ring-0 text-sm text-slate-500 dark:text-slate-400 font-semibold cursor-pointer"
            >
              <option value="latest">Latest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </nav>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Exam Cards Grid */}
          <div className="lg:col-span-3">
            {displayedExams.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayedExams.map(exam => <ExamCard key={exam.id} exam={exam} />)}
              </div>
            ) : (
              <div className="text-center py-20 glass-card rounded-3xl">
                <span className="material-symbols-outlined text-6xl text-slate-300 dark:text-slate-600 mb-4">search_off</span>
                <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">No notifications found</p>
                <p className="text-slate-400 dark:text-slate-500 text-sm mt-1">Try adjusting your filters</p>
              </div>
            )}
          </div>

          {/* Categories Sidebar */}
          <div>
            <div className="glass-card p-6 sticky top-28">
              <h3 className="font-bold text-slate-900 dark:text-white mb-5 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary-500">category</span>
                Categories
              </h3>
              <div className="space-y-1">
                <Link
                  to="/category/all"
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
                    slug === 'all'
                      ? 'bg-sky-soft dark:bg-slate-700 text-primary-500 shadow-sm'
                      : 'text-slate-500 dark:text-slate-400 hover:bg-sky-soft dark:hover:bg-slate-700 hover:text-primary-500'
                  }`}
                >
                  <span className="material-symbols-outlined text-lg">apps</span>
                  All Notifications
                </Link>
                {categories.map(cat => (
                  <Link
                    key={cat.id}
                    to={`/category/${cat.slug}`}
                    className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
                      slug === cat.slug
                        ? 'bg-sky-soft dark:bg-slate-700 text-primary-500 shadow-sm'
                        : 'text-slate-500 dark:text-slate-400 hover:bg-sky-soft dark:hover:bg-slate-700 hover:text-primary-500'
                    }`}
                  >
                    {cat.imageUrl ? (
                      <img src={cat.imageUrl} alt="" className="w-5 h-5 rounded object-cover flex-shrink-0" />
                    ) : (
                      <span className="flex-shrink-0">{cat.icon || '📋'}</span>
                    )}
                    <span className="truncate">{cat.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
