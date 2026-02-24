import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";

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

}
