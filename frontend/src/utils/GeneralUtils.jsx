  const badgeTypeClass = (type) => {
    switch(type) {
      case 'visitor': return 'badge badge-visitor';
      case 'employee': return 'badge badge-employee';
      case 'vendor': return 'badge badge-vendor';
      default: return 'badge';
    }
  };

  export default badgeTypeClass;