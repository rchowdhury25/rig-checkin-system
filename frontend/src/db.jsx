import Dexie from 'dexie';

export const db = new Dexie('RigCheckinDB');

db.version(2).stores({
  checkins: 'record_id, name, rig_id, timestamp, action, synced',
});

export default db;