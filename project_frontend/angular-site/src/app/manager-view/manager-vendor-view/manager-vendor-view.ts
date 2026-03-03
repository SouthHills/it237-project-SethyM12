import {Component, signal} from '@angular/core';
import {ManagerNavbar} from '../../manager-navbar/manager-navbar';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {User} from '../../services/user.service';
import {Router} from '@angular/router';
import {VendorModel} from '../../models/vendor.model';

@Component({
  selector: 'app-manager-vendor-view',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ManagerNavbar
  ],
  templateUrl: './manager-vendor-view.html',
  styleUrl: './manager-vendor-view.css',
})
export class ManagerVendorView {

  constructor(private userService: User, router: Router) {
    this.getVendors();
    this.vendorObject = {
      vendorId: 0,
      vendorName: '',
      vendorCity: '',
      vendorState: ''
    };
  }

  vendorObject: {
    vendorId: number,
    vendorName: string,
    vendorCity: string,
    vendorState: string,
  }

  vendors = signal<VendorModel[]>([]);

  errorMessage = signal<string>('');

  getVendors(): void {
    const authentication = localStorage.getItem('token');
    this.userService.getAllVendors(authentication).subscribe({
      next: (response) => {
        console.log(response);
        this.vendors.set(response);
      },
      error: (err) => {
        console.log(this.vendors);
        console.error('Error fetching vendors:', err);
        this.errorMessage.set('Failed to load vendors.');
      }
    });
  }

  createVendor(): void {
    const newVendor = {
      ...this.vendorObject,
    }
    const authentication = localStorage.getItem('token');
    this.userService.createVendor(newVendor, authentication).subscribe({
      next: () => {
        console.log(`Vendor created successfully.`);
        this.getVendors();
        alert(`Vendor created successfully.`);
        this.vendorObject = {
          vendorId: 0,
          vendorName: '',
          vendorCity: '',
          vendorState: ''
        };
      },
      error: (err) => {
        console.error('Error creating vendor:', err);
        alert('Failed to create vendor.');
      }
    });
  }

  deleteVendor(vendorId: number): void {
    const authentication = localStorage.getItem('token');
    this.userService.deleteVendor(vendorId, authentication).subscribe({
      next: () => {
        console.log(`Vendor with ID ${vendorId} deleted successfully.`);
        this.getVendors();
        alert(`Vendor with ID ${vendorId} deleted successfully.`);
      },
      error: (err) => {
        console.error(`Error deleting vendor with ID ${vendorId}:`, err);
        alert(`Failed to delete vendor with ID ${vendorId}.`);
      }
    });
  }

  updateVendor(vendorId: number, vendorObject: VendorModel): void {
    const authentication = localStorage.getItem('token');
    this.userService.updateVendor(vendorId, vendorObject, authentication).subscribe({
      next: () => {
        console.log(`Vendor with ID ${vendorId} updated successfully.`);
        this.getVendors();
        alert(`Vendor with ID ${vendorId} updated successfully.`);
      },
      error: (err) => {
        console.error(`Error updating vendor with ID ${vendorId}:`, err);
        alert(`Failed to update vendor with ID ${vendorId}.`);
      }
    });

  }
}
