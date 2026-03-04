import {Component, signal} from '@angular/core';
import {EmployeeNavbar} from '../../employee-navbar/employee-navbar';
import {User} from '../../services/user.service';
import {Router} from '@angular/router';
import {SIGNAL} from '@angular/core/primitives/signals';
import {VendorModel} from '../../models/vendor.model';

@Component({
  selector: 'app-employee-vendor-view',
  imports: [
    EmployeeNavbar
  ],
  templateUrl: './employee-vendor-view.html',
  styleUrl: './employee-vendor-view.css',
})
export class EmployeeVendorView {

  constructor(private userService: User, private router: Router) {
    if (this.setNullPlantIdMessage())
    {
      return;
    }
    this.getVendorsByPlantId();
    /*i gotta do this before the html page renders cuz it shows me an error once i call it while its rendering */
  }

  errorMessage = signal('');

  getPlantIdFromLocalStorage()
  {
    return localStorage.getItem('plantId');
  }

  setNullPlantIdMessage(): boolean {
    const plantId = this.getPlantIdFromLocalStorage();
    if (!plantId || plantId === 'null' || plantId === 'undefined')
    {
      this.errorMessage.set('You are not associated with any plant in our database');

      alert('You are not associated with any plant. Contact your manager to assign you one.')
      localStorage.removeItem('token');
      localStorage.removeItem('plantId');

      this.router.navigate(['/login']);
      return true;
    }

    return false;
  }

  vendors = signal<VendorModel[]>([]);


  getVendorsByPlantId(): void {
    const plantId = this.getPlantIdFromLocalStorage();
    const authentication = localStorage.getItem('token');
    if (plantId)
    {
      this.userService.getVendorsByPlantId(plantId, authentication).subscribe({
        next: (response) => {
          console.log(this.vendors);
          this.vendors.set(response);
        },
        error: (err) => {
          console.log(this.vendors);
          console.error('Error fetching vendors:', err);
          this.errorMessage.set('Failed to load vendors.');

          alert(`Failed to load vendors or invalid token`);
          localStorage.removeItem('token');
          localStorage.removeItem('plantId');

          this.router.navigate(['/login']);
        }
      });
    }
  }
}
