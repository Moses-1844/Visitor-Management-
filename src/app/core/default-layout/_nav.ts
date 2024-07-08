// _nav.ts
export const navItems = [
  { name: 'Owner Dashboard', url: '/owner-dashboard', iconClass: 'fas fa-tachometer-alt', role: 'SUPERADMIN' },
   
  {name: 'View Institutions', url: '/invoice', iconClass: 'fas fa-university', role: 'SUPERADMIN' },   
  {name: 'View Visitors', url: '/view-allvisitors', iconClass: 'fas fa-user', role: 'SUPERADMIN' },   
  {name: 'View Departments', url: '/view-alldepartment', iconClass: 'fas fa-user', role: 'SUPERADMIN' },   
  {name: 'View Appoinments', url: '/view-allappointment', iconClass: 'fas fa-user', role: 'SUPERADMIN' },   
  { name: ' Admin Dashboard', url: '/dashboard', iconClass: 'fas fa-tachometer-alt', role:  'INSTITUTION_ADMIN' },
  { name: 'Receptionist Dashboard', url: '/receptionist-dashboard', iconClass: 'fas fa-tachometer-alt', role: 'RECEPTIONIST' },
  { name: 'View Appoinment', url: '/view-appointmment', iconClass: 'fas fa-folder', role: 'RECEPTIONIST' },
  { name: 'View Appoinment', url: '/view-appointmment', iconClass: 'fas fa-folder', role: 'INSTITUTION_ADMIN' },
  //{ name: 'Add To Do', url: '/project-edit', iconClass: 'fas fa-folder', role: 'admin' },
  { name: 'Register User', url: '/register', iconClass: 'fas fa-user-plus', role: 'INSTITUTION_ADMIN' },
  { name: 'User Logs', url: '/users', iconClass: 'fas fa-users', role: 'INSTITUTION_ADMIN' }, // Changed to 'fas fa-users'
 // { name: 'Book Appointment', url: '/contact-us', iconClass: 'fas fa-calendar-check', role: 'RECEPTIONIST' },
  { name: 'Check-in', url: '/contacts', iconClass: 'fas fa-sign-in-alt', role: 'RECEPTIONIST' },  
  { name: 'Register Visitor', url: '/projects-add', iconClass: 'fas fa-user-plus', role: 'RECEPTIONIST' } , 
     
 { name: 'Add-Department', url: '/add-department', iconClass: 'fas fa-user', role: 'INSTITUTION_ADMIN' } ,
  
];
