import { Routes } from '@angular/router';
import {Home} from './home/home';
import {Login} from './login/login';
import {Register} from './register/register';
import {EmployeeComponentView} from './employee-view/employee-component-view/employee-component-view';
import {EmployeePartView} from './employee-view/employee-part-view/employee-part-view';

export const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: Home },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  {path: 'employee-component-view', component : EmployeeComponentView},
  {path: 'employee-part-view', component : EmployeePartView},

];
