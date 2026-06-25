import { useState, useEffect } from 'react';
import { HiPlus, HiPencil, HiTrash, HiX, HiSave } from 'react-icons/hi';
import { getCategories, addCategory, updateCategory, deleteCategory } from '../../firebase/categoryService';

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({ name: '', imageUrl: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
    setLoading(false);
  };

  const handleAdd = () => {
    setEditing(null);
    setFormData({ name: '', imageUrl: '' });
    setShowForm(true);
  };

  const handleEdit = (cat) => {
    setEditing(cat);
    setFormData({ name: cat.name, imageUrl: cat.imageUrl || '' });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure?')) {
      try {
        await deleteCategory(id);
        setCategories(categories.filter(c => c.id !== id));
      } catch (error) {
        alert('Failed to delete category.');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing) {
        await updateCategory(editing.id, formData);
        const slug = formData.name.toLowerCase().replace(/\s+/g, '-');
        setCategories(categories.map(c => c.id === editing.id ? { ...c, ...formData, slug } : c));
      } else {
        const newId = await addCategory(formData);
        const slug = formData.name.toLowerCase().replace(/\s+/g, '-');
        setCategories([...categories, { ...formData, slug, id: newId, count: 0, color: 'from-gray-500 to-gray-700' }]);
      }
      setShowForm(false);
    } catch (error) {
      alert('Failed to save category.');
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
        <span className="ml-3 text-gray-500 dark:text-gray-400">Loading categories from database...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Manage Categories <span className="text-sm font-normal text-gray-500">({categories.length} total)</span>
        </h2>
        <button onClick={handleAdd} className="btn-accent flex items-center space-x-2">
          <HiPlus className="w-4 h-4" /><span>Add Category</span>
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="glass-card w-full max-w-md p-6 animate-scale-in">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {editing ? 'Edit Category' : 'Add Category'}
              </h3>
              <button onClick={() => setShowForm(false)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-surface-700 transition-colors">
                <HiX className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category Name</label>
                <input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="input-field" required placeholder="e.g., Banking" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Image URL</label>
                <input value={formData.imageUrl} onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="input-field" placeholder="https://example.com/image.png (Optional)" />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-surface-700 rounded-lg hover:bg-gray-200 transition-colors">Cancel</button>
                <button type="submit" disabled={saving} className="btn-accent flex items-center space-x-2 disabled:opacity-50">
                  {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <HiSave className="w-4 h-4" />}
                  <span>{editing ? 'Update' : 'Add'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Categories Grid */}
      {categories.length === 0 ? (
        <div className="text-center py-16 glass-card">
          <p className="text-gray-500 dark:text-gray-400 text-lg">No categories found</p>
          <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">Click "Add Category" to create your first one</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {categories.map(cat => (
            <div key={cat.id} className="glass-card p-5 flex items-center justify-between group card-hover">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 rounded-xl overflow-hidden bg-gradient-to-br ${cat.color || 'from-gray-500 to-gray-700'} flex items-center justify-center text-xl shadow-lg`}>
                  {cat.imageUrl ? <img src={cat.imageUrl} alt={cat.name} className="w-full h-full object-cover" /> : '📋'}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">{cat.name}</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">/{cat.slug}</p>
                </div>
              </div>
              <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => handleEdit(cat)} className="p-1.5 rounded-lg text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-colors">
                  <HiPencil className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(cat.id)} className="p-1.5 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors">
                  <HiTrash className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageCategories;
