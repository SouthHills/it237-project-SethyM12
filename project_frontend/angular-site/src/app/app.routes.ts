import { Routes } from '@angular/router';
import {Home} from './home/home';
import {Login} from './login/login';
import {Register} from './register/register';
import {EmployeeComponentView} from './employee-view/employee-component-view/employee-component-view';
import {EmployeePartView} from './employee-view/employee-part-view/employee-part-view';
import {ManagerComponentView} from './manager-view/manager-component-view/manager-component-view';
import {ManagerPartView} from './manager-view/manager-part-view/manager-part-view';
import {ManagerUserView} from './manager-view/manager-user-view/manager-user-view';

export const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: Home },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  {path: 'employee-component-view', component : EmployeeComponentView},
  {path: 'employee-part-view', component : EmployeePartView},
  {path: 'manager-user-view', component : ManagerUserView},
  {path: 'manager-component-view', component : ManagerComponentView},
  {path: 'manager-part-view', component : ManagerPartView},

];
