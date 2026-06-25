import { useState, useEffect } from 'react';
import { HiPlus, HiPencil, HiTrash, HiSearch, HiX, HiSave } from 'react-icons/hi';
import { getExams, addExam, updateExam, deleteExam } from '../../firebase/examService';
import { getCategories } from '../../firebase/categoryService';

const ManageExams = () => {
  const [exams, setExams] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingExam, setEditingExam] = useState(null);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState(getEmptyForm());

  function getEmptyForm() {
    return {
      title: '', category: 'SSC', status: 'Active', imageUrl: '', description: '',
      eligibility: '', vacancy: '', salary: '', selectionProcess: '',
      applyLink: '', notificationPDF: '',
      importantDates: { applicationStart: '', applicationEnd: '', examDate: '', admitCardDate: '', resultDate: '' },
      applicationFee: { general: '', scst: '', female: '' },
      featured: false, trending: false, pinned: false,
    };
  }

  // Fetch exams and categories from Firestore on mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [examsData, catsData] = await Promise.all([getExams(), getCategories()]);
      setExams(examsData);
      setCategories(catsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };

  const handleEdit = (exam) => {
    setEditingExam(exam);
    setFormData({
      title: exam.title || '', category: exam.category || 'SSC', status: exam.status || 'Active',
      imageUrl: exam.imageUrl || '', description: exam.description || '',
      eligibility: exam.eligibility || '', vacancy: exam.vacancy || '',
      salary: exam.salary || '', selectionProcess: exam.selectionProcess || '',
      applyLink: exam.applyLink || '', notificationPDF: exam.notificationPDF || '',
      importantDates: exam.importantDates || { applicationStart: '', applicationEnd: '', examDate: '', admitCardDate: '', resultDate: '' },
      applicationFee: exam.applicationFee || { general: '', scst: '', female: '' },
      featured: exam.featured || false, trending: exam.trending || false, pinned: exam.pinned || false,
    });
    setShowForm(true);
  };

  const handleAdd = () => {
    setEditingExam(null);
    setFormData(getEmptyForm());
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this exam notification?')) {
      try {
        await deleteExam(id);
        setExams(exams.filter(e => e.id !== id));
      } catch (error) {
        alert('Failed to delete exam. Please try again.');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingExam) {
        await updateExam(editingExam.id, formData);
        setExams(exams.map(ex => ex.id === editingExam.id ? { ...ex, ...formData } : ex));
      } else {
        const newId = await addExam(formData);
        setExams([{ id: newId, ...formData, createdAt: new Date() }, ...exams]);
      }
      setShowForm(false);
      setEditingExam(null);
      setFormData(getEmptyForm());
    } catch (error) {
      alert('Failed to save exam. Please try again.');
    }
    setSaving(false);
  };

  const filteredExams = exams.filter(e =>
    e.title?.toLowerCase().includes(search.toLowerCase()) ||
    e.category?.toLowerCase().includes(search.toLowerCase())
  );

  const updateField = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));
  const updateDate = (field, value) => setFormData(prev => ({ ...prev, importantDates: { ...prev.importantDates, [field]: value } }));
  const updateFee = (field, value) => setFormData(prev => ({ ...prev, applicationFee: { ...prev.applicationFee, [field]: value } }));

  const statusColors = {
    'Active': 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400',
    'Upcoming': 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    'Expired': 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400',
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
        <span className="ml-3 text-gray-500 dark:text-gray-400">Loading exams from database...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Manage Exams <span className="text-sm font-normal text-gray-500">({exams.length} total)</span>
        </h2>
        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:w-64">
            <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search exams..." className="input-field pl-10 py-2 text-sm"
            />
          </div>
          <button onClick={handleAdd} className="btn-accent flex items-center space-x-2 whitespace-nowrap">
            <HiPlus className="w-4 h-4" /><span>Add Exam</span>
          </button>
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 backdrop-blur-sm overflow-y-auto py-8 px-4">
          <div className="glass-card w-full max-w-3xl p-6 animate-scale-in">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {editingExam ? 'Edit Exam Notification' : 'Add New Exam Notification'}
              </h3>
              <button onClick={() => setShowForm(false)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-surface-700 transition-colors">
                <HiX className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
              {/* Basic Info */}
              <Section title="Basic Information">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <Label>Exam Title</Label>
                    <input value={formData.title} onChange={e => updateField('title', e.target.value)} className="input-field" required placeholder="e.g., SSC CGL 2026" />
                  </div>
                  <div>
                    <Label>Category</Label>
                    <select value={formData.category} onChange={e => updateField('category', e.target.value)} className="input-field">
                      {categories.length > 0
                        ? categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)
                        : ['SSC', 'Banking', 'Railway', 'Defence', 'Teaching', 'State PSC', 'Engineering', 'Medical'].map(c => <option key={c} value={c}>{c}</option>)
                      }
                    </select>
                  </div>
                  <div>
                    <Label>Status</Label>
                    <select value={formData.status} onChange={e => updateField('status', e.target.value)} className="input-field">
                      <option value="Active">Active</option>
                      <option value="Upcoming">Upcoming</option>
                      <option value="Expired">Expired</option>
                      <option value="Draft">Draft</option>
                      <option value="Result Declared">Result Declared</option>
                    </select>
                  </div>
                </div>
              </Section>

              {/* Image URL */}
              <Section title="Image">
                <Label>Image URL</Label>
                <input value={formData.imageUrl} onChange={e => updateField('imageUrl', e.target.value)} className="input-field" placeholder="https://example.com/image.jpg" />
                {formData.imageUrl && (
                  <div className="mt-3 relative rounded-lg overflow-hidden h-36 bg-gray-100 dark:bg-surface-800">
                    <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" onError={e => e.target.style.display = 'none'} />
                  </div>
                )}
              </Section>

              {/* Description */}
              <Section title="Description">
                <textarea value={formData.description} onChange={e => updateField('description', e.target.value)} className="input-field" rows={4} placeholder="Enter exam notification details..." />
              </Section>

              {/* Important Dates */}
              <Section title="Important Dates">
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    ['applicationStart', 'Application Start'],
                    ['applicationEnd', 'Application End'],
                    ['examDate', 'Exam Date'],
                    ['admitCardDate', 'Admit Card Date'],
                    ['resultDate', 'Result Date'],
                  ].map(([key, label]) => (
                    <div key={key}>
                      <Label>{label}</Label>
                      <input type="date" value={formData.importantDates[key]} onChange={e => updateDate(key, e.target.value)} className="input-field" />
                    </div>
                  ))}
                </div>
              </Section>

              {/* Eligibility & Vacancy */}
              <Section title="Eligibility & Vacancy">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <Label>Eligibility</Label>
                    <textarea value={formData.eligibility} onChange={e => updateField('eligibility', e.target.value)} className="input-field" rows={2} placeholder="Education qualification, age limit..." />
                  </div>
                  <div>
                    <Label>Total Vacancies</Label>
                    <input value={formData.vacancy} onChange={e => updateField('vacancy', e.target.value)} className="input-field" placeholder="e.g., 20000+" />
                  </div>
                  <div>
                    <Label>Salary / Pay Scale</Label>
                    <input value={formData.salary} onChange={e => updateField('salary', e.target.value)} className="input-field" placeholder="e.g., ₹25,500 - ₹81,100" />
                  </div>
                </div>
              </Section>

              {/* Application Fee */}
              <Section title="Application Fee">
                <div className="grid grid-cols-3 gap-4">
                  <div><Label>General</Label><input value={formData.applicationFee.general} onChange={e => updateFee('general', e.target.value)} className="input-field" placeholder="₹100" /></div>
                  <div><Label>SC/ST</Label><input value={formData.applicationFee.scst} onChange={e => updateFee('scst', e.target.value)} className="input-field" placeholder="Nil" /></div>
                  <div><Label>Female</Label><input value={formData.applicationFee.female} onChange={e => updateFee('female', e.target.value)} className="input-field" placeholder="Nil" /></div>
                </div>
              </Section>

              {/* Selection & Links */}
              <Section title="Selection & Links">
                <div className="space-y-4">
                  <div>
                    <Label>Selection Process</Label>
                    <input value={formData.selectionProcess} onChange={e => updateField('selectionProcess', e.target.value)} className="input-field" placeholder="Tier 1 → Tier 2 → Interview" />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div><Label>Apply Online URL</Label><input value={formData.applyLink} onChange={e => updateField('applyLink', e.target.value)} className="input-field" placeholder="https://" /></div>
                    <div><Label>Notification PDF URL</Label><input value={formData.notificationPDF} onChange={e => updateField('notificationPDF', e.target.value)} className="input-field" placeholder="https://" /></div>
                  </div>
                </div>
              </Section>

              {/* Homepage Settings */}
              <Section title="Homepage Settings">
                <div className="flex flex-wrap gap-6">
                  {[
                    ['featured', 'Featured'],
                    ['trending', 'Trending'],
                    ['pinned', 'Pinned'],
                  ].map(([key, label]) => (
                    <label key={key} className="flex items-center space-x-2 cursor-pointer">
                      <input type="checkbox" checked={formData[key]} onChange={e => updateField(key, e.target.checked)}
                        className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
                    </label>
                  ))}
                </div>
              </Section>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-surface-700">
                <button type="button" onClick={() => setShowForm(false)} className="px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-surface-700 rounded-lg hover:bg-gray-200 dark:hover:bg-surface-600 transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={saving} className="btn-accent flex items-center space-x-2 disabled:opacity-50">
                  {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <HiSave className="w-4 h-4" />}
                  <span>{editingExam ? 'Update' : 'Publish'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Exams Table */}
      <div className="glass-card overflow-hidden">
        {exams.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 dark:text-gray-400 text-lg">No exams found in database</p>
            <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">Click "Add Exam" to create your first notification</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 dark:bg-surface-800/50">
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Exam</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Category</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Featured</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-surface-700">
                {filteredExams.map((exam, i) => (
                  <tr key={exam.id} className={`${i % 2 === 1 ? 'bg-gray-50/50 dark:bg-surface-800/30' : ''} hover:bg-primary-50/50 dark:hover:bg-primary-900/10 transition-colors`}>
                    <td className="px-5 py-4">
                      <div className="flex items-center space-x-3">
                        {exam.imageUrl && <img src={exam.imageUrl} alt="" className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />}
                        <span className="text-sm font-medium text-gray-900 dark:text-white line-clamp-1">{exam.title}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4"><span className="badge-primary">{exam.category}</span></td>
                    <td className="px-5 py-4"><span className={statusColors[exam.status] || 'badge-primary'}>{exam.status}</span></td>
                    <td className="px-5 py-4">
                      <div className="flex gap-1">
                        {exam.featured && <span className="text-xs px-1.5 py-0.5 rounded bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300">⭐</span>}
                        {exam.trending && <span className="text-xs px-1.5 py-0.5 rounded bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300">🔥</span>}
                        {exam.pinned && <span className="text-xs px-1.5 py-0.5 rounded bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300">📌</span>}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center space-x-1">
                        <button onClick={() => handleEdit(exam)} className="p-2 rounded-lg text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-colors" title="Edit">
                          <HiPencil className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(exam.id)} className="p-2 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors" title="Delete">
                          <HiTrash className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

const Section = ({ title, children }) => (
  <div className="space-y-3">
    <h4 className="text-sm font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-surface-700 pb-2">{title}</h4>
    {children}
  </div>
);

const Label = ({ children }) => (
  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">{children}</label>
);

export default ManageExams;
