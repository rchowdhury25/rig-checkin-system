export const toISODate = (d = new Date()) =>
  new Date(d.getFullYear(), d.getMonth(), d.getDate())
    .toISOString()
    .slice(0, 10);


export function computeStats(people, forDate = toISODate(new Date('2025-08-08'))) {
  const onDate = people.filter(p => p.date === forDate);
  return {
    total: people.length,
    checkedIn: onDate.filter(p => p.status === 'checked-in').length,
    visitors: people.filter(p => p.type === 'visitor').length,
    employees: people.filter(p => p.type === 'employee').length,
    vendors: people.filter(p => p.type === 'vendor').length,
    todayTotal: onDate.length,
    visitorsToday: onDate.filter(p => p.type === 'visitor').length,
    employeesToday: onDate.filter(p => p.type === 'employee').length,
    vendorsToday: onDate.filter(p => p.type === 'vendor').length,
    visitorsInside: onDate.filter(p => p.type === 'visitor' && p.status === 'checked-in').length,
    employeesInside: onDate.filter(p => p.type === 'employee' && p.status === 'checked-in').length,
    vendorsInside: onDate.filter(p => p.type === 'vendor' && p.status === 'checked-in').length,
  };
}


export function generateHourlyData(people, forDate, bucketSizeHours = 4, { demoVariation = true } = {}) {
  const rows = [];
  for (let start = 0; start < 24; start += bucketSizeHours) {
    const end = start + bucketSizeHours;
    const row = { hour: `${start}-${end}` };
    ['visitor', 'employee', 'vendor'].forEach(type => {
      let count = people.filter(
        p => p.type === type && p.date === forDate && p.hour >= start && p.hour < end
      ).length;
      if (demoVariation) count = count * (Math.random() * 3 + 1);
      row[type] = count;
    });
    rows.push(row);
  }
  return rows;
}
