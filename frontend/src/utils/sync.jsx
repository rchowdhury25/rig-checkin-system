import db from '../db';
import axios from 'axios';

export const syncWithServer = async () => {
  const unsynced = await db.checkins.where('synced').equals(0).toArray();
  console.log({records: unsynced.map(({ synced, ...r }) => r)})
  if (unsynced.length === 0) return;

  try {
    const res = await axios.post('http://127.0.0.1:8000/api/sync_bulk', {
      records: unsynced.map(({ synced, ...r }) => r)
    });

    const syncedIds = res.data.synced_ids || [];
    await Promise.all(
      syncedIds.map(id => db.checkins.update(id, { synced: 1 }))
    );
    console.log(`Synced ${syncedIds.length} records`);
  } catch (err) {
    console.error('Sync failed:', err.message);
  }
};
