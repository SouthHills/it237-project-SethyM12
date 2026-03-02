import {Component, signal} from '@angular/core';
import {ManagerNavbar} from '../../manager-navbar/manager-navbar';
import {Router} from '@angular/router';
import {User} from '../../services/user.service';
import {ComponentModel} from '../../models/component.model';
import {PartModel} from '../../models/part.model';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-manager-part-view',
  imports: [
    ManagerNavbar,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './manager-part-view.html',
  styleUrl: './manager-part-view.css',
})
export class ManagerPartView {

  constructor(private userService: User, router: Router)
  {
    this.getParts();
    this.partObject = {
      partId: 0,
      partName: '',
      partSpecs: '',
      partQuantity: null,
      vendorId: null
    };
  }

  partObject: {
    partId: number,
    partName: string,
    partSpecs: string,
    partQuantity: number | null,
    vendorId: number | null
  }

  parts = signal<PartModel[]>([]);

  errorMessage = signal<string>('');

  createPart(): void {
    const newPart = {
      ...this.partObject,
    }
    const authentication = localStorage.getItem('token');
    this.userService.createPart(newPart,authentication).subscribe({
      next: () => {
        console.log(`Part created successfully.`);
        this.getParts();
        alert(`Part created successfully.`);
        this.partObject = {
          partId: 0,
          partName: '',
          partSpecs: '',
          partQuantity: null,
          vendorId: null
        }
      },
      error: (err) => {
        console.error(`Error creating component:`, err);
        alert(`Failed to create component.`);
      }
    });
  }
  getParts(): void {
    const authentication = localStorage.getItem('token');

    this.userService.getAllParts(authentication).subscribe({
      next: (response) => {
        console.log(response);
        this.parts.set(response);
      },
      error: (err) => {
        console.error('Error fetching parts:', err);
        this.errorMessage.set('Failed to load parts.');
      }
    });
  }
  updatePart(partId: number, partObject: PartModel): void {
    const authentication = localStorage.getItem('token');
    this.userService.updatePart(partId, partObject, authentication).subscribe({
      next: () => {
        console.log(`Part with ID ${partId} updated successfully.`);
        this.getParts();
        alert(`Part with ID ${partId} updated successfully.`);
      },
      error: (err) => {
        console.error(`Error updating part with ID ${partId}:`, err);
        alert(`Failed to update part with ID ${partId}.`);
      }
    })
  }
  deletePart(id: number): void {
    const authentication = localStorage.getItem('token');
    this.userService.deletePart(id, authentication).subscribe({
      next: () => {
        console.log(`Part with ID ${id} deleted successfully.`);
        this.getParts();
        alert(`Part with ID ${id} deleted successfully.`);
      },
      error: (err) => {
        console.error(`Error deleting part with ID ${id}:`, err);
        alert(`Failed to delete part with ID ${id}.`);
      }
    })
  }


}
