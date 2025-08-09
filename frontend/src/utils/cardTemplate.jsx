export function getCardData(stats) {
  return [
    {
      id: 'visitors',
      title: 'Visitors',
      subtitle: 'Today',
      inside: stats.visitorsInside,
      total: stats.visitorsToday,
      colorClass: 'pill pill-pink',
      cardTone: 'card card-pink'
    },
    {
      id: 'employees',
      title: 'Employees',
      subtitle: 'Today',
      inside: stats.employeesInside,
      total: stats.employeesToday,
      colorClass: 'pill pill-green',
      cardTone: 'card card-green'
    },
    {
      id: 'vendors',
      title: 'Vendors',
      subtitle: 'Today',
      inside: stats.vendorsInside,
      total: stats.vendorsToday,
      colorClass: 'pill pill-purple',
      cardTone: 'card card-purple'
    }
  ];
}
