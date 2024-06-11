
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class authGuard  {
  constructor(private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    debugger
    let token = localStorage.getItem('token');
    if (token && state.url != '/login') {
      return true;
    }
    else if (token && state.url == '/login') {
      this.router.navigate(['dashboard']);
      return false;
    }
    else if (!token && state.url != '/login') {
      this.router.navigate(['login']);
      return true;
    }
    return true;
  }
}
/* .import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRole = route.data.role;
    const userRole = this.authService.getRole();

    if (userRole !== expectedRole) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
.. */
