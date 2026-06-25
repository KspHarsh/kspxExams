import { useState, useEffect } from 'react';
import { getExams, updateExam } from '../../firebase/examService';

const ManageHomepage = () => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const data = await getExams();
        setExams(data);
      } catch (error) {
        console.error('Error fetching exams:', error);
      }
      setLoading(false);
    };
    fetchExams();
  }, []);

  const toggleField = async (id, field) => {
    const exam = exams.find(e => e.id === id);
    const newValue = !exam[field];
    try {
      await updateExam(id, { [field]: newValue });
      setExams(exams.map(e => e.id === id ? { ...e, [field]: newValue } : e));
    } catch (error) {
      alert('Failed to update. Please try again.');
    }
  };

  const statusColors = {
    'Active': 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400',
    'Upcoming': 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    'Expired': 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400',
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
        <span className="ml-3 text-gray-500 dark:text-gray-400">Loading...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Homepage Settings</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Control which exams appear as featured, trending, or pinned on the homepage.</p>
      </div>

      {exams.length === 0 ? (
        <div className="text-center py-16 glass-card">
          <p className="text-gray-500 dark:text-gray-400 text-lg">No exams in database</p>
          <p className="text-gray-400 text-sm mt-1">Add exams first, then manage their homepage visibility here.</p>
        </div>
      ) : (
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 dark:bg-surface-800/50">
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Exam</th>
                  <th className="px-5 py-3 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-5 py-3 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">⭐ Featured</th>
                  <th className="px-5 py-3 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">🔥 Trending</th>
                  <th className="px-5 py-3 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">📌 Pinned</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-surface-700">
                {exams.map((exam, i) => (
                  <tr key={exam.id} className={`${i % 2 === 1 ? 'bg-gray-50/50 dark:bg-surface-800/30' : ''} hover:bg-primary-50/50 dark:hover:bg-primary-900/10 transition-colors`}>
                    <td className="px-5 py-4">
                      <div className="flex items-center space-x-3">
                        {exam.imageUrl && <img src={exam.imageUrl} alt="" className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />}
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white line-clamp-1">{exam.title}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{exam.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-center">
                      <span className={statusColors[exam.status] || 'badge-primary'}>{exam.status}</span>
                    </td>
                    <td className="px-5 py-4 text-center">
                      <ToggleButton active={exam.featured} onClick={() => toggleField(exam.id, 'featured')} color="accent" />
                    </td>
                    <td className="px-5 py-4 text-center">
                      <ToggleButton active={exam.trending} onClick={() => toggleField(exam.id, 'trending')} color="primary" />
                    </td>
                    <td className="px-5 py-4 text-center">
                      <ToggleButton active={exam.pinned} onClick={() => toggleField(exam.id, 'pinned')} color="red" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

const ToggleButton = ({ active, onClick, color = 'primary' }) => {
  const colors = {
    accent: active ? 'bg-accent-500 hover:bg-accent-600' : 'bg-gray-200 dark:bg-surface-700 hover:bg-gray-300 dark:hover:bg-surface-600',
    primary: active ? 'bg-primary-500 hover:bg-primary-600' : 'bg-gray-200 dark:bg-surface-700 hover:bg-gray-300 dark:hover:bg-surface-600',
    red: active ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-200 dark:bg-surface-700 hover:bg-gray-300 dark:hover:bg-surface-600',
  };

  return (
    <button onClick={onClick}
      className={`w-10 h-6 rounded-full relative transition-all ${colors[color]} inline-flex items-center`}>
      <span className={`w-4 h-4 rounded-full bg-white shadow-md transform transition-transform ${active ? 'translate-x-5' : 'translate-x-1'}`}></span>
    </button>
  );
};

export default ManageHomepage;
