import { useState, useEffect } from 'react';
import { getStudyResources, addStudyResource, updateStudyResource, deleteStudyResource } from '../../firebase/contentService';
import { Spinner, Header, FormModal, ItemList } from './ManageResults';

const ManageStudyResources = () => {
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({ title: '', date: '', status: 'Published', link: '', category: '', excerpt: '', image: '', readTime: '' });

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    setLoading(true);
    try { setItems(await getStudyResources()); } catch (e) { console.error(e); }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing) {
        await updateStudyResource(editing.id, formData);
        setItems(items.map(i => i.id === editing.id ? { ...i, ...formData } : i));
      } else {
        const id = await addStudyResource(formData);
        setItems([{ id, ...formData, createdAt: new Date() }, ...items]);
      }
      setShowForm(false); setEditing(null);
    } catch { alert('Failed to save.'); }
    setSaving(false);
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this study resource?')) {
      try { await deleteStudyResource(id); setItems(items.filter(i => i.id !== id)); } catch { alert('Failed.'); }
    }
  };

  const openForm = (item = null) => {
    setEditing(item);
    setFormData(item
      ? { title: item.title || '', date: item.date || '', status: item.status || 'Published', link: item.link || '', category: item.category || '', excerpt: item.excerpt || '', image: item.image || '', readTime: item.readTime || '' }
      : { title: '', date: '', status: 'Published', link: '', category: '', excerpt: '', image: '', readTime: '' });
    setShowForm(true);
  };

  if (loading) return <Spinner text="Loading study resources..." />;

  return (
    <div className="space-y-6">
      <Header title="Study Resources" count={items.length} onAdd={() => openForm()} />
      <FormModal show={showForm} onClose={() => setShowForm(false)} onSubmit={handleSubmit} editing={editing} saving={saving}
        formData={formData} setFormData={setFormData} type="study-resources" />
      <ItemList items={items} onEdit={openForm} onDelete={handleDelete} iconColor="purple" />
    </div>
  );
};

export default ManageStudyResources;
