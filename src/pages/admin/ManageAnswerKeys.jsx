import { useState, useEffect } from 'react';
import { getAnswerKeys, addAnswerKey, updateAnswerKey, deleteAnswerKey } from '../../firebase/contentService';
import { Spinner, Header, FormModal, ItemList } from './ManageResults';

const ManageAnswerKeys = () => {
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({ title: '', date: '', status: 'Available', link: '' });

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    setLoading(true);
    try { setItems(await getAnswerKeys()); } catch (e) { console.error(e); }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing) {
        await updateAnswerKey(editing.id, formData);
        setItems(items.map(i => i.id === editing.id ? { ...i, ...formData } : i));
      } else {
        const id = await addAnswerKey(formData);
        setItems([{ id, ...formData, createdAt: new Date() }, ...items]);
      }
      setShowForm(false); setEditing(null);
    } catch { alert('Failed to save.'); }
    setSaving(false);
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this answer key?')) {
      try { await deleteAnswerKey(id); setItems(items.filter(i => i.id !== id)); } catch { alert('Failed.'); }
    }
  };

  const openForm = (item = null) => {
    setEditing(item);
    setFormData(item ? { title: item.title || '', date: item.date || '', status: item.status || 'Available', link: item.link || '' } : { title: '', date: '', status: 'Available', link: '' });
    setShowForm(true);
  };

  if (loading) return <Spinner text="Loading answer keys..." />;

  return (
    <div className="space-y-6">
      <Header title="Answer Keys" count={items.length} onAdd={() => openForm()} />
      <FormModal show={showForm} onClose={() => setShowForm(false)} onSubmit={handleSubmit} editing={editing} saving={saving}
        formData={formData} setFormData={setFormData} type="answerKey" />
      <ItemList items={items} onEdit={openForm} onDelete={handleDelete} iconColor="amber" />
    </div>
  );
};

export default ManageAnswerKeys;
