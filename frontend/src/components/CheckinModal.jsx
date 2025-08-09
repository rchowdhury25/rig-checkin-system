import React, { useEffect, useState, useCallback } from 'react';

const defaultForm = {
  name: '',
  type: 'visitor',
  phone: '',
  purpose: '',
  department: '',
  company: '',
};

export default function CheckInModal({ isOpen, onClose, onSubmit }) {
  const [form, setForm] = useState(defaultForm);

  // Reset form each time the modal opens
  useEffect(() => {
    if (isOpen) setForm(defaultForm);
  }, [isOpen]);

  // Close on ESC
  const onEsc = useCallback((e) => {
    if (e.key === 'Escape') onClose?.();
  }, [onClose]);
  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener('keydown', onEsc);
    return () => document.removeEventListener('keydown', onEsc);
  }, [isOpen, onEsc]);

  if (!isOpen) return null;

  const disabled = !form.name || !form.phone;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal small" onClick={(e) => e.stopPropagation()}>
        <h3 className="h3 mb-12">Check In New Person</h3>

        <div className="stack-12">
          <div>
            <label className="label">Name *</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="input"
              placeholder="Enter full name"
              autoFocus
            />
          </div>

          <div>
            <label className="label">Type *</label>
            <select
              value={form.type}
              onChange={(e) => {
                const type = e.target.value;
                // clear other conditional fields when switching type
                setForm({ ...form, type, purpose: '', department: '', company: '' });
              }}
              className="input"
            >
              <option value="visitor">Visitor</option>
              <option value="employee">Employee</option>
              <option value="vendor">Vendor</option>
            </select>
          </div>

          <div>
            <label className="label">Phone *</label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="input"
              placeholder="+91 98765 43210"
            />
          </div>

          {form.type === 'visitor' && (
            <div>
              <label className="label">Purpose</label>
              <input
                type="text"
                value={form.purpose}
                onChange={(e) => setForm({ ...form, purpose: e.target.value })}
                className="input"
                placeholder="Meeting, Interview, etc."
              />
            </div>
          )}

          {form.type === 'employee' && (
            <div>
              <label className="label">Department</label>
              <input
                type="text"
                value={form.department}
                onChange={(e) => setForm({ ...form, department: e.target.value })}
                className="input"
                placeholder="Engineering, HR, etc."
              />
            </div>
          )}

          {form.type === 'vendor' && (
            <div>
              <label className="label">Company</label>
              <input
                type="text"
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                className="input"
                placeholder="Company name"
              />
            </div>
          )}
        </div>

        <div className="row-12 mt-16">
          <button
            onClick={() => onSubmit?.(form)}
            className="btn btn-primary grow"
            disabled={disabled}
          >
            Check In
          </button>
          <button onClick={onClose} className="btn btn-muted grow">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}