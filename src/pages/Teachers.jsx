import React, { useState } from 'react';
import { Plus, Edit, Trash } from 'lucide-react';
import { useApp } from '../context/AppContext';
// Simple modal – replace with UI library if desired
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};
const Teachers = () => {
  const {
  teachers = [],
  addTeacher,
  updateTeacher,
  deleteTeacher,
} = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTeacher, setCurrentTeacher] = useState({
    id: null,
    name: '',
    subject: '',
    email: '',
    phone: '',
    status: 'Active',
  });
  const openAdd = () => {
    setCurrentTeacher({ id: null, name: '', subject: '', email: '', phone: '', status: 'Active' });
    setIsModalOpen(true);
  };
  const openEdit = teacher => {
    setCurrentTeacher(teacher);
    setIsModalOpen(true);
  };
  const confirmDelete = async id => {
    if (window.confirm('Delete this teacher?')) {
      await deleteTeacher(id);
    }
  };
  const close = () => setIsModalOpen(false);
  const handleChange = e => {
    const { name, value } = e.target;
    setCurrentTeacher(prev => ({ ...prev, [name]: value }));
  };
  const handleSave = async e => {
    e.preventDefault();
    try {
      if (currentTeacher.id) {
        await updateTeacher(currentTeacher.id, currentTeacher);
      } else {
        await addTeacher(currentTeacher);
      }
      close();
    } catch (err) {
      console.error('Save teacher failed', err);
    }
  };
  return (
    <div className="p-6 fade-in">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Teachers</h2>
        <button className="btn btn-primary flex items-center gap-2" onClick={openAdd}>
          <Plus size={18} /> Add Teacher
        </button>
      </div>
      {/* Content */}
      {teachers.length === 0 ? (
        <p className="text-gray-500">No teachers yet. Click “Add Teacher” to begin.</p>
      ) : (
        <div className="overflow-x-auto rounded border">
          <table className="min-w-full text-left">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Subject</th>
                <th className="p-3">Email</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map(t => (
                <tr key={t.id} className="border-b">
                  <td className="p-3">{t.name}</td>
                  <td className="p-3">{t.subject}</td>
                  <td className="p-3">{t.email}</td>
                  <td className="p-3">{t.phone}</td>
                  <td className="p-3">{t.status}</td>
                  <td className="p-3 flex gap-2">
                    <button onClick={() => openEdit(t)} title="Edit" className="text-blue-600">
                      <Edit size={16} />
                    </button>
                    <button onClick={() => confirmDelete(t.id)} title="Delete" className="text-red-600">
                      <Trash size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* Modal for Add / Edit */}
      <Modal isOpen={isModalOpen} onClose={close}>
        <h3 className="text-xl font-semibold mb-4">{currentTeacher.id ? 'Edit Teacher' : 'Add Teacher'}</h3>
        <form onSubmit={handleSave} className="space-y-4">
          <input name="name" placeholder="Name" value={currentTeacher.name} onChange={handleChange} required className="input w-full" />
          <input name="subject" placeholder="Subject" value={currentTeacher.subject} onChange={handleChange} required className="input w-full" />
          <input name="email" type="email" placeholder="Email" value={currentTeacher.email} onChange={handleChange} required className="input w-full" />
          <input name="phone" placeholder="Phone" value={currentTeacher.phone} onChange={handleChange} className="input w-full" />
          <select name="status" value={currentTeacher.status} onChange={handleChange} className="input w-full">
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <div className="flex justify-end gap-2 mt-4">
            <button type="button" className="btn" onClick={close}>Cancel</button>
            <button type="submit" className="btn btn-primary">Save</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
export default Teachers;
