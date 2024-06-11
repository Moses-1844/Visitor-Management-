// _nav.ts
export const navItems = [
  { name: ' Admin Dashboard', url: '/dashboard', iconClass: 'fas fa-tachometer-alt', role: 'admin' },
  { name: 'Receptionist Dashboard', url: '/receptionist-dashboard', iconClass: 'fas fa-tachometer-alt', role: 'receptionist' },
  { name: 'View Visitors', url: '/projects', iconClass: 'fas fa-folder', role: 'receptionist' },
  //{ name: 'Add To Do', url: '/project-edit', iconClass: 'fas fa-folder', role: 'admin' },
  { name: 'Register User', url: '/register', iconClass: 'fas fa-user-plus', role: 'admin' },
  { name: 'User Logs', url: '/users', iconClass: 'fas fa-users', role: 'admin' }, // Changed to 'fas fa-users'
  { name: 'Book Appointment', url: '/contact-us', iconClass: 'fas fa-calendar-check', role: 'receptionist' },
  { name: 'Check-in', url: '/contacts', iconClass: 'fas fa-sign-in-alt', role: 'receptionist' },  
  { name: 'Register Visitor', url: '/projects-add', iconClass: 'fas fa-user-plus', role: 'receptionist' } , 
 //{ name: '', url: '/', iconClass: 'fas fa-sign-out-alt', role: 'receptionist' },  
  
 { name: 'Add-Duty', url: '/simple-table', iconClass: 'fas fa-user', role: 'admin' }  
];
