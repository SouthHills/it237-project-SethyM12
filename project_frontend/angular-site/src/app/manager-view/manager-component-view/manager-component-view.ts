import {Component, signal} from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../../services/user.service';
import {UserModel} from '../../models/user.model';
import {ComponentModel} from '../../models/component.model';
import {ManagerNavbar} from '../../manager-navbar/manager-navbar';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-manager-component-view',
  imports: [
    ManagerNavbar,
    FormsModule
  ],
  templateUrl: './manager-component-view.html',
  styleUrl: './manager-component-view.css',
  standalone: true
})
export class ManagerComponentView {

  constructor(private router: Router, private userService: User) {
    this.componentObject = {
      compId: 0,
      compName: '',
      compSpecs: '',
      compQuantity: null,
      plantId: null
    };
    this.getComponents();
  }

  components = signal<ComponentModel[]>([]);

  errorMessage = signal<string>('');

  getComponents(): void {
    const authentication = localStorage.getItem('token');
    this.userService.getAllComponents(authentication).subscribe({
      next: (response) => {
        console.log(response);
        this.components.set(response);
      },
      error: (err) => {
        console.log(this.components);
        console.error('Error fetching components:', err);
        this.errorMessage.set('Failed to load components. or invalid token or request');

        alert(`Failed to get components or invalid token or request.`);

        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      }
    });
  }

  updateComponent(componentId: number, componentObject: ComponentModel): void {
    const authentication = localStorage.getItem('token');
    this.userService.updateComponent(componentId, componentObject, authentication).subscribe({
      next: () => {
        console.log(`Component with ID ${componentId} updated successfully.`);
        this.getComponents();
        alert(`Component with ID ${componentId} updated successfully.`);
      },
      error: (err) => {
        console.error(`Error updating component with ID ${componentId}:`, err);
        alert(`Failed to update component with ID ${componentId}. or invalid token or request`);

        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      }
    })
  }

  deleteComponent(componentId: number): void
  {
    const authentication = localStorage.getItem('token');
    this.userService.deleteComponent(componentId, authentication).subscribe({
      next: () => {
        console.log(`Component with ID ${componentId} deleted successfully.`);
        this.getComponents();
        alert(`Component with ID ${componentId} deleted successfully.`);
      },
      error: (err) => {
        console.error(`Error deleting component with ID ${componentId}:`, err);
        alert(`Failed to delete component with ID ${componentId}. or invalid token or request.`);

        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      }
    });
  }

  componentObject: {
    compId: number,
    compName: string,
    compSpecs: string,
    compQuantity: number | null,
    plantId: number | null
  }

  createComponent(): void
  {
    const newComponent = {
      ...this.componentObject
    }
    const authentication = localStorage.getItem('token');
    this.userService.createComponent(newComponent, authentication).subscribe({
      next: () => {
        console.log(`Component created successfully.`);
        this.getComponents();
        alert(`Component created successfully.`);
        this.componentObject = {
          compId: 0,
          compName: '',
          compSpecs: '',
          compQuantity: null,
          plantId: null
        }
      },
      error: (err) => {
        console.error(`Error creating component:`, err);
        alert(`Failed to create component or invalid token or request.`);

        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      }
    });
  }

  protected readonly parseInt = parseInt;
}
