import { Component } from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-employee-navbar',
    imports: [
        RouterLink,
        RouterLinkActive
    ],
  templateUrl: './employee-navbar.html',
  styleUrl: './employee-navbar.css',
})
export class EmployeeNavbar {

  constructor(private router: Router) { }

  logout(): void {
    localStorage.removeItem('plantId');
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
