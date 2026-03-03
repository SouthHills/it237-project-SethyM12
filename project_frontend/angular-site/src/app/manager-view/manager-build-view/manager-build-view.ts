import {Component, signal} from '@angular/core';
import {ManagerNavbar} from '../../manager-navbar/manager-navbar';
import {Router} from '@angular/router';
import {User} from '../../services/user.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BuildModel} from '../../models/build.model';

@Component({
  selector: 'app-manager-build-view',
  imports: [
    ManagerNavbar,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './manager-build-view.html',
  styleUrl: './manager-build-view.css',
})
export class ManagerBuildView {

  constructor(private router: Router, private userService: User) {
    this.buildObject = {
      compId: 0,
      partId: 0
    };
    this.getBuilds();
  }

  errorMessage = signal<string>('');

  buildObject: {
    compId: number,
    partId: number
  }

  builds = signal<BuildModel[]>([]);

  getBuilds(): void {
    const authentication = localStorage.getItem('token');
    this.userService.getAllBuilds(authentication).subscribe({
      next: (response) => {
        console.log(response);
        this.builds.set(response);
      },
      error: (err) => {
        console.log(this.builds);
        console.error('Error fetching builds:', err);
      }
    });
  }

  createBuild(): void {
    const authentication = localStorage.getItem('token');

    const newBuild = {
      ...this.buildObject
    }

    this.userService.createBuild(newBuild, authentication).subscribe({
      next: (response) => {
        console.log('Build created successfully:', response);
        this.getBuilds();
        alert('Build created successfully.');
      },
      error: (err) => {
        console.error('Error creating build:', err);
        alert('Error creating build.');
      }
    });
  }

  updateBuild(compId: number, partId: number): void {
    const authentication = localStorage.getItem('token');
    this.userService.updateBuild(compId, partId, authentication).subscribe({
      next: () => {
        console.log(`Build with Component ID ${compId} and Part ID ${partId} updated successfully.`);
        this.getBuilds();
        alert(`Build with Component ID ${compId} and Part ID ${partId} updated successfully.`);
      },
      error: (err) => {
        console.error(`Error updating build with Component ID ${compId} and Part ID ${partId}:`, err);
        alert(`Error updating build with Component ID ${compId} and Part ID ${partId}.`);
      }
    });
  }

  deleteBuild(compId: number, partId: number): void {
    console.log(`${compId} ${partId}`);
    const authentication = localStorage.getItem('token');
    this.userService.deleteBuild(compId, partId, authentication).subscribe({
      next: () => {
        console.log(`Build with Component ID ${compId} and Part ID ${partId} deleted successfully.`);
        this.getBuilds();
        alert(`Build with Component ID ${compId} and Part ID ${partId} deleted successfully.`);
      },
      error: (err) => {
        console.error(`Error deleting build with Component ID ${compId} and Part ID ${partId}:`, err);
        alert(`Error deleting build with Component ID ${compId} and Part ID ${partId}.`);
      }
    });
  }
}
