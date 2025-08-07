import React, { useState } from 'react';
import db from '../db';
import { v4 as uuidv4 } from 'uuid';

export default function CheckinForm() {
  const [name, setName] = useState('');
  const [userType, setUserType] = useState('employee');
  const [action, setAction] = useState('check-in');
  const [rigId, setRigId] = useState('RIG-1');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const record = {
      record_id: uuidv4(),
      name,
      user_type: userType,
      rig_id: rigId,
      action,
      timestamp: new Date().toISOString(),
      synced: 0
    };
    await db.checkins.put(record);
    alert('Record saved locally');
    setName('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="card">
        <div className="card-header">
          <div>
            <div className="detail-title">Employee/Visitor Checkin Checkout</div>
          </div>
        </div>
        <div className="card-body">
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" required />
          <select value={userType} onChange={e => setUserType(e.target.value)}>
            <option value="employee">Employee</option>
            <option value="visitor">Visitor</option>
          </select>
          <select value={action} onChange={e => setAction(e.target.value)}>
            <option value="check-in">Check-in</option>
            <option value="check-out">Check-out</option>
          </select>
          <button type="submit">Submit</button>
        </div>
      </div>
    </form>
  );
}
