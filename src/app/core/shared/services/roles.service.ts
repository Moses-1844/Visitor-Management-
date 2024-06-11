import { Injectable } from '@angular/core';
import { ApiHandlerService } from 'src/app/core/shared/utils/api-handler.service';
import { API_ENDPOINTS, ApiMethod } from 'src/app/core/shared/utils/const';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  userInfo: any = {};
  constructor(private http: ApiHandlerService) {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');

  }

  getUserRoles() {
    let params = '?countryId=' + this.userInfo.countryId + '&companyId=' + this.userInfo.companyId + '&roleId=' + this.userInfo.roleId;
    return this.http.requestCall(API_ENDPOINTS.getRoles, ApiMethod.GET, params);
  }


  createUserRoles(data: any) {
    return this.http.requestCall(API_ENDPOINTS.createRoles, ApiMethod.POST, '', data);
  }

  updateUserRoles(data: any) {
    return this.http.requestCall(API_ENDPOINTS.updateRoles, ApiMethod.POST, '', data);
  }

  deleteUserRoles(id: any) {
    return this.http.requestCall(API_ENDPOINTS.deleteRoles, ApiMethod.GET, id);
  }

  getUserRolesByID(id: any) {
    return this.http.requestCall(API_ENDPOINTS.getRoleByID, ApiMethod.GET, id);
  }
 
}
