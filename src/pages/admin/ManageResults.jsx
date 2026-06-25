import { useState, useEffect } from 'react';
import { HiPlus, HiPencil, HiTrash, HiX, HiSave, HiExternalLink } from 'react-icons/hi';
import { getResults, addResult, updateResult, deleteResult } from '../../firebase/contentService';

const ManageResults = () => {
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({ title: '', date: '', status: 'Declared', link: '' });

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    setLoading(true);
    try { setItems(await getResults()); } catch (e) { console.error(e); }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing) {
        await updateResult(editing.id, formData);
        setItems(items.map(i => i.id === editing.id ? { ...i, ...formData } : i));
      } else {
        const id = await addResult(formData);
        setItems([{ id, ...formData, createdAt: new Date() }, ...items]);
      }
      setShowForm(false); setEditing(null);
    } catch { alert('Failed to save.'); }
    setSaving(false);
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this result?')) {
      try { await deleteResult(id); setItems(items.filter(i => i.id !== id)); } catch { alert('Failed.'); }
    }
  };

  const openForm = (item = null) => {
    setEditing(item);
    setFormData(item ? { title: item.title || '', date: item.date || '', status: item.status || 'Declared', link: item.link || '' } : { title: '', date: '', status: 'Declared', link: '' });
    setShowForm(true);
  };

  if (loading) return <Spinner text="Loading results..." />;

  return (
    <div className="space-y-6">
      <Header title="Results" count={items.length} onAdd={() => openForm()} />
      <FormModal show={showForm} onClose={() => setShowForm(false)} onSubmit={handleSubmit} editing={editing} saving={saving}
        formData={formData} setFormData={setFormData} type="result" />
      <ItemList items={items} onEdit={openForm} onDelete={handleDelete} iconColor="emerald" />
    </div>
  );
};

// === Shared UI Components ===
const Spinner = ({ text }) => (
  <div className="flex items-center justify-center py-20">
    <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
    <span className="ml-3 text-gray-500 dark:text-gray-400">{text}</span>
  </div>
);

const Header = ({ title, count, onAdd }) => (
  <div className="flex items-center justify-between">
    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
      Manage {title} <span className="text-sm font-normal text-gray-500">({count} total)</span>
    </h2>
    <button onClick={onAdd} className="btn-accent flex items-center space-x-2">
      <HiPlus className="w-4 h-4" /><span>Add {title}</span>
    </button>
  </div>
);

const FormModal = ({ show, onClose, onSubmit, editing, saving, formData, setFormData, type }) => {
  if (!show) return null;
  const update = (f, v) => setFormData(prev => ({ ...prev, [f]: v }));
  const statusOptions = type === 'study-resources'
    ? ['Published', 'Draft']
    : type === 'answerKey'
    ? ['Available', 'Upcoming', 'Official', 'Unofficial']
    : ['Declared', 'Available', 'Released', 'Upcoming'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="glass-card w-full max-w-lg p-6 animate-scale-in max-h-[90vh] overflow-y-auto custom-scrollbar">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">{editing ? 'Edit' : 'Add'} {type}</h3>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-surface-700 transition-colors"><HiX className="w-5 h-5" /></button>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
            <input value={formData.title} onChange={e => update('title', e.target.value)} className="input-field" required placeholder="Enter title" />
          </div>
          {type === 'study-resources' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                <input value={formData.category || ''} onChange={e => update('category', e.target.value)} className="input-field" placeholder="e.g., Preparation Tips" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Excerpt</label>
                <textarea value={formData.excerpt || ''} onChange={e => update('excerpt', e.target.value)} className="input-field" rows={3} placeholder="Short summary" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Image URL</label>
                <input value={formData.image || ''} onChange={e => update('image', e.target.value)} className="input-field" placeholder="https://..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Read Time</label>
                <input value={formData.readTime || ''} onChange={e => update('readTime', e.target.value)} className="input-field" placeholder="e.g., 5 min read" />
              </div>
            </>
          )}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date</label>
              <input value={formData.date} onChange={e => update('date', e.target.value)} className="input-field" placeholder="e.g., 15 March 2026" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
              <select value={formData.status} onChange={e => update('status', e.target.value)} className="input-field">
                {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Link URL</label>
            <input value={formData.link || ''} onChange={e => update('link', e.target.value)} className="input-field" placeholder="https://..." />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-surface-700 rounded-lg hover:bg-gray-200 transition-colors">Cancel</button>
            <button type="submit" disabled={saving} className="btn-accent flex items-center space-x-2 disabled:opacity-50">
              {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <HiSave className="w-4 h-4" />}
              <span>{editing ? 'Update' : 'Add'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ItemList = ({ items, onEdit, onDelete, iconColor = 'primary' }) => {
  const statusColors = {
    'Declared': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400',
    'Available': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400',
    'Released': 'bg-accent-100 text-accent-800 dark:bg-accent-900/30 dark:text-accent-400',
    'Upcoming': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    'Published': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400',
    'Draft': 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400',
    'Official': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400',
    'Unofficial': 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-16 glass-card">
        <p className="text-gray-500 dark:text-gray-400 text-lg">No items yet</p>
        <p className="text-gray-400 text-sm mt-1">Click the Add button to create your first one</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {items.map(item => (
        <div key={item.id} className="glass-card p-4 flex items-center justify-between group card-hover">
          <div className="flex items-center space-x-4 flex-1 min-w-0">
            <div className={`w-10 h-10 rounded-lg bg-${iconColor}-100 dark:bg-${iconColor}-900/30 flex items-center justify-center flex-shrink-0`}>
              <span className="text-lg">📄</span>
            </div>
            <div className="min-w-0">
              <h4 className="font-semibold text-gray-900 dark:text-white truncate">{item.title}</h4>
              <div className="flex items-center gap-2 mt-0.5">
                {item.date && <span className="text-xs text-gray-500 dark:text-gray-400">{item.date}</span>}
                {item.category && <span className="text-xs text-primary-600 dark:text-primary-400">{item.category}</span>}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {item.status && <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusColors[item.status] || 'bg-gray-100 text-gray-800'}`}>{item.status}</span>}
            {item.link && <a href={item.link} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg text-gray-400 hover:text-primary-600 transition-colors"><HiExternalLink className="w-4 h-4" /></a>}
            <button onClick={() => onEdit(item)} className="p-1.5 rounded-lg text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-colors"><HiPencil className="w-4 h-4" /></button>
            <button onClick={() => onDelete(item.id)} className="p-1.5 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"><HiTrash className="w-4 h-4" /></button>
          </div>
        </div>
      ))}
    </div>
  );
};

export { Spinner, Header, FormModal, ItemList };
export default ManageResults;
