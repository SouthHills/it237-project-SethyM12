import { Component } from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-manager-navbar',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './manager-navbar.html',
  styleUrl: './manager-navbar.css',
  standalone: true
})
export class ManagerNavbar {
  constructor(private router: Router) { }

  logout() : void{
    localStorage.removeItem('token');

    this.router.navigate(['/login']);
  }
}
