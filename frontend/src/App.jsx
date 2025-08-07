import './App.css'
import React, { useEffect } from 'react';
import db from './db';
import CheckinForm from './components/CheckinForm';
import SyncPanel from './components/SyncPanel';

function App() {
  return (
    <div className="theme-container">
      <div className="app-container dark-industrial">
        <div className="main-content">
          <h1 className="app-title">Rig Check-In System</h1>
          <CheckinForm />
          <SyncPanel />
          <button onClick={async () => {await db.checkins.clear(); alert('All records cleared!');}}>
            Clear All Records
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;