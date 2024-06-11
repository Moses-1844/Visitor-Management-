import { Component, OnInit } from '@angular/core';
import { navItems } from '../_nav';
import { AuthService } from'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-main-sidebar',
  templateUrl: './main-sidebar.component.html',
  styleUrls: ['./main-sidebar.component.css']
})
export class MainSidebarComponent implements OnInit {
  public navItems = navItems;
  public userRole: string | null;

  constructor(private authService: AuthService) {
    this.userRole = this.authService.getRole();
  }

  ngOnInit(): void {}

  // Add a function to filter nav items based on role
  filterNavItems() {
    if (this.userRole === 'admin') {
      return this.navItems; // Return all items for admin
    } else if (this.userRole === 'receptionist') {
      return this.navItems.filter(item => item.role === 'receptionist'); // Return specific items for receptionist
    }
    return []; // Default empty array if no role matches
  }
}

