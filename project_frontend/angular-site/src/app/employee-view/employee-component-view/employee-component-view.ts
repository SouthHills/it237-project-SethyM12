import { Component, signal } from '@angular/core';
import {EmployeeNavbar} from '../../employee-navbar/employee-navbar';
import {User} from '../../services/user.service';
import {Router} from '@angular/router';
import {ComponentModel} from '../../models/component.model';

@Component({
  selector: 'app-employee-component-view',
  imports: [
    EmployeeNavbar
  ],
  templateUrl: './employee-component-view.html',
  styleUrl: './employee-component-view.css',
})
export class EmployeeComponentView {
  constructor(private userService: User, private router: Router) {
    if (this.setNullPlantIdMessage())
    {
      return;
    }
    this.getComponents();
    /*i gotta do this before the html page renders cuz it shows me an error once i call it while its rendering */
  }

  components = signal<ComponentModel[]>([]);

  errorMessage = signal<string>('');
  getPlantIdFromLocalStorage()
  {
    return localStorage.getItem('plantId');
  }

  setNullPlantIdMessage(): boolean {
    const plantId = this.getPlantIdFromLocalStorage();
    if (!plantId || plantId === 'null' || plantId === 'undefined') {
      this.errorMessage.set('You are not associated with any plant in our database');
      return true;
    }
    return false;
  }

  getComponents(): void {
    const plantId = this.getPlantIdFromLocalStorage();
    if (plantId) {
      this.userService.getComponentsByPlantId(plantId).subscribe({
        next: (response) => {
          this.components.set(response);
        },
        error: (err) => {
          console.error('Error fetching components:', err);
          this.errorMessage.set('Failed to load components.');
        }
      });
    }
  }
}
