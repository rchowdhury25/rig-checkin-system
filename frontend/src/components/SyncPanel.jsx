import db from '../db';
import { useLiveQuery } from 'dexie-react-hooks';
import { syncWithServer } from '../utils/sync';


function SyncPanel() {

  const unsyncedRecords = useLiveQuery(
    () => db.checkins.where('synced').equals(0).toArray(),
    []
  );

  const handleSync = async () => {
    console.log('Syncing records:', unsyncedRecords);
    try {
      await syncWithServer();
    } catch (err) {
      console.error(err);
    }
  };

  if (!unsyncedRecords) {
    return <div>Loading...</div>;
  }

  return (
    <div className="sync-panel">
      <h2>Unsynced Records ({unsyncedRecords.length})</h2>
      <ul>
        {unsyncedRecords.map(record => (
          <li key={record.record_id}>
            {record.name} -- {record.action} -- {record.rig_id}
          </li>
        ))}
      </ul>
      {unsyncedRecords.length > 0 && (
        <button onClick={handleSync}>Sync Now</button>
      )}
    </div>
  );
}

export default SyncPanel;