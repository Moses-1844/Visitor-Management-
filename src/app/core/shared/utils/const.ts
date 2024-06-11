import {environment} from 'src/environments/environment';

export const API_URL: string = environment.api_url;

export enum ApiMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH"
}


export const API_ENDPOINTS = {
logIn:'users/login',
registerUser:'users/signup',
resetPassword:'users/resetPassword/',
forgetPassword:'users/forgotPassword',
getBrowserDetail:'users/getBrowserDetail/',
setBrowserDetail:'users/setBrowserDetail',
users: 'users',
deleteUser: 'users/deleteUser/',
editUser: 'users/updateUser',
createUser: 'users/createUser',
getRoles:'roles',
getRoleByID:'roles/',
createRoles:'roles/createRole',
updateRoles:'roles/updateRole',
deleteRoles:'roles/deleteRole/', 
banners:'banners',
getBannerById:'banners/',
getAllBannersByCompany:'banners/getAllBannersByCompany/',
createBanner:'banners/createBanner',
editBanner:'banners/updateBanner',
deleteBanner:'banners/deleteBanner/',
 
 
}
