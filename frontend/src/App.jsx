import React, { useEffect } from 'react';
import db from './db';
import CheckinForm from './components/CheckinForm';
import SyncPanel from './components/SyncPanel';

function App() {
  return (
    <div className="app">
      <h1>Rig Check-In System</h1>
      <CheckinForm />
      <SyncPanel />
      <button onClick={async () => {await db.checkins.clear(); alert('All records cleared!');}}>
        Clear All Records
      </button>
    </div>
  );
}

export default App;