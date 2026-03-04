import {Component, signal} from '@angular/core';
import {EmployeeNavbar} from '../../employee-navbar/employee-navbar';
import {User} from '../../services/user.service';
import {Router} from '@angular/router';
import {ComponentModel} from '../../models/component.model';
import {BuildModel} from '../../models/build.model';

@Component({
  selector: 'app-employee-build-view',
  imports: [
    EmployeeNavbar
  ],
  templateUrl: './employee-build-view.html',
  styleUrl: './employee-build-view.css',
})
export class EmployeeBuildView {

  constructor(private userService: User, private router: Router) {
    if (this.setNullPlantIdMessage()) {
      return;
    }
    this.getBuilds();
    /*i gotta do this before the html page renders cuz it shows me an error once i call it while its rendering */
  }

  builds = signal<BuildModel[]>([]);

  errorMessage = signal<string>('');

  getPlantIdFromLocalStorage() {
    return localStorage.getItem('plantId');
  }

  setNullPlantIdMessage(): boolean {
    const plantId = this.getPlantIdFromLocalStorage();
    if (!plantId || plantId === 'null' || plantId === 'undefined') {
      this.errorMessage.set('You are not associated with any plant in our database');

      alert('You are not associated with any plant. Contact your manager to assign you one.')
      localStorage.removeItem('token');
      localStorage.removeItem('plantId');

      this.router.navigate(['/login']);


      return true;
    }

    return false;
  }

  getBuilds(): void {
    const plantId = this.getPlantIdFromLocalStorage();
    if (plantId) {
      const authentication = localStorage.getItem('token');
      this.userService.getBuildsByPlantId(plantId, authentication).subscribe({
        next: (response) => {
          console.log(this.builds);
          this.builds.set(response);
        },
        error: (err) => {
          console.log(this.builds);
          console.error('Error fetching builds:', err);
          this.errorMessage.set('Failed to load builds or invalid token request');

          alert(`Failed to load builds or invalid token`);
          localStorage.removeItem('token');
          localStorage.removeItem('plantId');

          this.router.navigate(['/login']);
        }
      });
    }

  }
}
