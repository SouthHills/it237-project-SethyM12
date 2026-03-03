import { Routes } from '@angular/router';
import {Home} from './home/home';
import {Login} from './login/login';
import {EmployeeComponentView} from './employee-view/employee-component-view/employee-component-view';
import {EmployeePartView} from './employee-view/employee-part-view/employee-part-view';
import {ManagerComponentView} from './manager-view/manager-component-view/manager-component-view';
import {ManagerPartView} from './manager-view/manager-part-view/manager-part-view';
import {ManagerUserView} from './manager-view/manager-user-view/manager-user-view';
import {ManagerBuildView} from './manager-view/manager-build-view/manager-build-view';
import {ManagerVendorView} from './manager-view/manager-vendor-view/manager-vendor-view';
import {EmployeeBuildView} from './employee-view/employee-build-view/employee-build-view';
import {EmployeeVendorView} from './employee-view/employee-vendor-view/employee-vendor-view';
import {ManagerRegisterUserView} from './manager-view/manager-register-user-view/manager-register-user-view';

export const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: Home },
  { path: 'login', component: Login },
  {path: 'employee-component-view', component : EmployeeComponentView},
  {path: 'employee-part-view', component : EmployeePartView},
  {path: 'employee-build-view', component : EmployeeBuildView},
  {path: 'employee-vendor-view', component : EmployeeVendorView},
  {path: 'manager-user-view', component : ManagerUserView},
  {path: 'manager-component-view', component : ManagerComponentView},
  {path: 'manager-part-view', component : ManagerPartView},
  {path: 'manager-build-view', component : ManagerBuildView},
  {path: 'manager-register-user-view', component : ManagerRegisterUserView},
  {path: 'manager-vendor-view', component : ManagerVendorView},

];
