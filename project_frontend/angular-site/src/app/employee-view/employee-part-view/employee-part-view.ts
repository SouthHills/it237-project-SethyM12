import {Component, signal} from '@angular/core';
import {EmployeeNavbar} from "../../employee-navbar/employee-navbar";
import {User} from '../../services/user.service';
import {Router} from '@angular/router';
import {PartModel} from '../../models/part.model';

@Component({
  selector: 'app-employee-part-view',
    imports: [
        EmployeeNavbar
    ],
  templateUrl: './employee-part-view.html',
  styleUrl: './employee-part-view.css',
})
export class EmployeePartView {


  constructor(private userService: User, private router: Router) {
    if (this.setNullPlantIdMessage())
    {
      return;
    }
    this.getParts();
    /*i gotta do this before the html page renders cuz it shows me an error once i call it while its rendering */
  }
  parts = signal<PartModel[]>([]);

  setNullPlantIdMessage(): boolean {
    const plantId = this.getPlantIdFromLocalStorage();
    if (!plantId || plantId === 'null' || plantId === 'undefined')
    {
      this.errorMessage.set('You are not associated with any plant in our database. Contact your manager to associate you with a plant ID');

      alert(`Invalid request or token `)

      localStorage.removeItem('token');
      localStorage.removeItem('plantId');

      this.router.navigate(['/login']);
      return true;
    }
    return false;
  }
  errorMessage = signal<string>('');

  getPlantIdFromLocalStorage()
  {
    return localStorage.getItem('plantId');
  }

  getParts(): void {
    const plantId = this.getPlantIdFromLocalStorage();
    const authentication = localStorage.getItem('token');
    if (plantId)
    {
      this.userService.getPartsByPlantId(plantId, authentication).subscribe({
        next: (response) => {
          console.log(this.parts);
          this.parts.set(response);
        },
        error: (err) => {
          console.log(this.parts);
          console.error('Error fetching parts:', err);
          this.errorMessage.set('Failed to load parts.');

          alert(`Failed to load parts:${err} or invalid token`);
          localStorage.removeItem('token');
          localStorage.removeItem('plantId');

          this.router.navigate(['/login']);
        }
      });
    }


  }


}
