import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getExamById, getExams } from '../firebase/examService';
import ExamCard from '../components/ui/ExamCard';
import ShareButton from '../components/ui/ShareButton';
import SEOHead from '../components/SEOHead';

const ExamDetail = () => {
  const { id } = useParams();
  const [exam, setExam] = useState(null);
  const [relatedExams, setRelatedExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchExam = async () => {
      setLoading(true);
      try {
        const examData = await getExamById(id);
        setExam(examData);
        if (examData) {
          const allExams = await getExams({ category: examData.category, limitCount: 4 });
          setRelatedExams(allExams.filter(e => e.id !== id).slice(0, 3));
        }
      } catch (error) {
        console.error('Error fetching exam:', error);
      }
      setLoading(false);
    };
    fetchExam();
  }, [id]);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'info' },
    { id: 'dates', label: 'Important Dates', icon: 'event' },
    { id: 'eligibility', label: 'Eligibility', icon: 'verified_user' },
    { id: 'vacancy', label: 'Vacancy & Salary', icon: 'group' },
    { id: 'selection', label: 'Selection Process', icon: 'checklist' },
    { id: 'fee', label: 'Application Fee', icon: 'payments' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!exam) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-32">
        <SEOHead title="Exam Not Found" description="This exam notification may have been removed or is no longer available." path={`/exam/${id}`} noindex={true} />
        <div className="text-center glass-card p-12 rounded-3xl">
          <span className="material-symbols-outlined text-6xl text-slate-300 dark:text-slate-600 mb-4">search_off</span>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Exam Not Found</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-6 font-medium">This notification may have been removed.</p>
          <Link to="/" className="btn-primary">Go to Homepage</Link>
        </div>
      </div>
    );
  }

  // Build JSON-LD schema for this exam
  const examSchema = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    'title': exam.title,
    'description': exam.description || `${exam.title} - Latest notification, eligibility, vacancy details, and application process.`,
    'hiringOrganization': {
      '@type': 'Organization',
      'name': exam.category || 'Government of India',
    },
    'jobLocation': {
      '@type': 'Place',
      'address': {
        '@type': 'PostalAddress',
        'addressCountry': 'IN',
      },
    },
    ...(exam.vacancy && { 'totalJobOpenings': exam.vacancy }),
    ...(exam.salary && { 'baseSalary': { '@type': 'MonetaryAmount', 'currency': 'INR', 'value': exam.salary } }),
  };

  return (
    <div className="min-h-screen pt-28 md:pt-32">
      <SEOHead
        title={exam.title}
        description={exam.description ? exam.description.slice(0, 160) : `${exam.title} — Check eligibility, important dates, vacancy details, and apply online. | KSPXEXAMS`}
        path={`/exam/${id}`}
        type="article"
        schema={examSchema}
      />
      {/* Floating background blobs */}
      <div className="floating-blob bg-primary-500 w-[500px] h-[500px] -top-20 -left-20 fixed"></div>
      <div className="floating-blob bg-accent-400 w-[400px] h-[400px] top-[40%] -right-20 opacity-20 fixed"></div>

      <main className="max-w-7xl mx-auto px-4 md:px-12 pb-24">
        {/* Breadcrumb */}
        <div className="flex items-center gap-3 mb-12">
          <Link to="/" className="px-4 py-1.5 bg-white/40 dark:bg-slate-800/40 backdrop-blur-md border border-white/60 dark:border-slate-600/60 rounded-full text-xs font-semibold text-slate-600 dark:text-slate-300 flex items-center gap-2 shadow-sm hover:bg-white/60 dark:hover:bg-slate-700/60 transition-all">
            <span className="material-symbols-outlined text-sm">home</span> Home
          </Link>
          <span className="text-slate-300 dark:text-slate-600">/</span>
          <Link to={`/category/${exam.category?.toLowerCase()}`} className="px-4 py-1.5 bg-white/40 dark:bg-slate-800/40 backdrop-blur-md border border-white/60 dark:border-slate-600/60 rounded-full text-xs font-semibold text-slate-600 dark:text-slate-300 shadow-sm hover:bg-white/60 dark:hover:bg-slate-700/60 transition-all">
            {exam.category}
          </Link>
          <span className="text-slate-300 dark:text-slate-600">/</span>
          <div className="px-4 py-1.5 bg-primary-500/5 border border-primary-500/20 rounded-full text-xs font-bold text-primary-500">
            {exam.title?.length > 30 ? exam.title.slice(0, 30) + '...' : exam.title}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 items-start relative">
          {/* Main Content - Glass panel */}
          <div className="flex-1 glass-panel rounded-3xl p-8 md:p-12 relative">
            <div className="max-w-3xl">
              {/* Category badge + views */}
              <div className="flex items-center gap-4 mb-6">
                <span className="px-4 py-1 bg-primary-500/10 text-primary-500 text-xs font-bold rounded-full uppercase tracking-widest">
                  {exam.category}
                </span>
                <span className="flex items-center gap-1 text-slate-400 dark:text-slate-500 text-sm">
                  <span className="material-symbols-outlined text-sm">visibility</span>
                  Students viewing
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 leading-tight">
                {exam.title?.split(' ').slice(0, 4).join(' ')} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-primary-400">
                  {exam.title?.split(' ').slice(4).join(' ') || ''}
                </span>
              </h1>

              <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed mb-8 font-medium">
                {exam.description}
              </p>

              {/* Tabs */}
              <div className="flex gap-2 mb-10 flex-wrap">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-6 py-3 rounded-2xl font-bold text-sm transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-white dark:bg-slate-700 text-primary-500 shadow-sm -translate-y-1'
                        : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="space-y-6">
                {activeTab === 'overview' && (
                  <div className="prose max-w-none">
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base">{exam.description || 'No description available.'}</p>
                  </div>
                )}

                {activeTab === 'dates' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {exam.importantDates && Object.entries(exam.importantDates).map(([key, value]) => value && (
                      <div key={key} className="p-6 rounded-3xl bg-slate-50/50 dark:bg-slate-700/50 border border-slate-100 dark:border-slate-600">
                        <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">{key.replace(/([A-Z])/g, ' $1')}</p>
                        <p className="text-lg font-bold text-slate-800 dark:text-slate-100">{value}</p>
                      </div>
                    ))}
                    {!exam.importantDates && <p className="text-slate-500 dark:text-slate-400">No dates available.</p>}
                  </div>
                )}

                {activeTab === 'eligibility' && (
                  <div className="p-6 rounded-3xl bg-slate-50/50 dark:bg-slate-700/50 border border-slate-100 dark:border-slate-600">
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{exam.eligibility || 'Eligibility details not available.'}</p>
                  </div>
                )}

                {activeTab === 'vacancy' && (
                  <div className="grid grid-cols-2 gap-6">
                    <div className="p-6 rounded-3xl bg-slate-50/50 dark:bg-slate-700/50 border border-slate-100 dark:border-slate-600">
                      <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">Total Vacancies</p>
                      <p className="text-2xl font-bold text-slate-900 dark:text-white">{exam.vacancy || 'TBA'}</p>
                    </div>
                    <div className="p-6 rounded-3xl bg-slate-50/50 dark:bg-slate-700/50 border border-slate-100 dark:border-slate-600">
                      <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">Salary / Pay Scale</p>
                      <p className="text-2xl font-bold text-slate-900 dark:text-white">{exam.salary || 'TBA'}</p>
                    </div>
                  </div>
                )}

                {activeTab === 'selection' && (
                  <div className="p-6 rounded-3xl bg-slate-50/50 dark:bg-slate-700/50 border border-slate-100 dark:border-slate-600">
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">{exam.selectionProcess || 'Selection process details not available.'}</p>
                  </div>
                )}

                {activeTab === 'fee' && (
                  <div className="space-y-4">
                    {exam.applicationFee && Object.entries(exam.applicationFee).map(([key, value]) => value && (
                      <div key={key} className="flex items-center justify-between p-5 rounded-3xl bg-slate-50/50 dark:bg-slate-700/50 border border-slate-100 dark:border-slate-600">
                        <span className="text-sm font-semibold text-slate-600 dark:text-slate-300 capitalize">{key}</span>
                        <span className="text-sm font-bold text-slate-900 dark:text-white">{value}</span>
                      </div>
                    ))}
                    {!exam.applicationFee && <p className="text-slate-500 dark:text-slate-400">Fee details not available.</p>}
                  </div>
                )}

                {/* Official Notification Download */}
                {exam.notificationPDF && (
                  <div className="p-6 rounded-3xl bg-primary-50/50 dark:bg-primary-900/20 border border-primary-100 dark:border-primary-800/30 flex items-center justify-between mt-8">
                    <div>
                      <p className="text-xs font-bold text-primary-500 uppercase tracking-widest mb-1">Official Notification</p>
                      <p className="text-slate-600 dark:text-slate-300 font-medium">Download the full advertisement PDF</p>
                    </div>
                    <a href={exam.notificationPDF} target="_blank" rel="noopener noreferrer" className="p-3 bg-white dark:bg-slate-700 text-primary-500 rounded-2xl shadow-sm hover:shadow-md transition-all magnetic-hover">
                      <span className="material-symbols-outlined">download</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-80 space-y-6">
            {/* Quick Actions */}
            <div className="floating-card p-8">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Quick Actions</h3>
              <div className="space-y-4">
                {exam.applyLink && (
                  <a href={exam.applyLink} target="_blank" rel="noopener noreferrer" className="block w-full py-4 glossy-button-yellow text-center font-bold rounded-2xl transition-all flex items-center justify-center gap-2 group">
                    Apply Now
                    <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_right_alt</span>
                  </a>
                )}
                <a href="https://exam-hub-qv0i.onrender.com/" target="_blank" rel="noopener noreferrer" className="block w-full py-4 glossy-button-indigo font-bold rounded-2xl text-center">
                  Mock Test Series
                </a>
                <button className="w-full py-4 bg-white dark:bg-slate-700 border-2 border-slate-100 dark:border-slate-600 text-slate-600 dark:text-slate-300 font-bold rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-600 transition-all">
                  Save for Later
                </button>
                <ShareButton
                  title={exam.title}
                  text={`${exam.title}${exam.category ? ' - ' + exam.category : ''}`}
                  url={window.location.href}
                  variant="full"
                />
              </div>
            </div>

            {/* Quick Info Card */}
            <div className="floating-card p-8">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-5">Quick Info</h3>
              <div className="space-y-4">
                {[
                  { label: 'Category', value: exam.category, icon: 'school', color: 'text-primary-500' },
                  { label: 'Status', value: exam.status, icon: 'info', color: 'text-emerald-500' },
                  { label: 'Vacancies', value: exam.vacancy, icon: 'group', color: 'text-blue-500' },
                  { label: 'Salary', value: exam.salary, icon: 'payments', color: 'text-accent-500' },
                ].map((item) => item.value && (
                  <div key={item.label} className="flex items-center gap-3 p-3 rounded-2xl hover:bg-sky-soft dark:hover:bg-slate-700 transition-colors">
                    <div className={`w-10 h-10 rounded-xl bg-sky-soft dark:bg-slate-700 flex items-center justify-center ${item.color}`}>
                      <span className="material-symbols-outlined text-lg">{item.icon}</span>
                    </div>
                    <div>
                      <p className="text-[11px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">{item.label}</p>
                      <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Promo Card */}
            <div className="floating-card p-8 bg-gradient-to-br from-primary-500 to-primary-800 text-white overflow-hidden relative rounded-3xl">
              <div className="relative z-10">
                <p className="text-primary-200 text-xs font-bold uppercase tracking-widest mb-2">Study Resources</p>
                <h4 className="text-lg font-bold mb-4">Master {exam.category} <br />Exams with Us</h4>
                <button className="px-6 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-xl text-sm font-bold transition-all">
                  Learn More
                </button>
              </div>
              <span className="material-symbols-outlined absolute -bottom-4 -right-4 text-8xl text-white/10 rotate-12">rocket</span>
            </div>
          </div>
        </div>

        {/* Related Exams */}
        {relatedExams.length > 0 && (
          <div className="mt-20">
            <h2 className="section-title mb-8">Related Exams</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedExams.map(exam => <ExamCard key={exam.id} exam={exam} />)}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ExamDetail;
