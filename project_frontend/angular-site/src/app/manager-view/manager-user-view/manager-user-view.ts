import {Component, signal} from '@angular/core';
import {ManagerNavbar} from '../../manager-navbar/manager-navbar';
import {Router} from '@angular/router';
import {User} from '../../services/user.service';
import {PartModel} from '../../models/part.model';
import {UserModel} from '../../models/user.model';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-manager-user-view',
  imports: [
    ManagerNavbar,
    FormsModule
  ],
  templateUrl: './manager-user-view.html',
  styleUrl: './manager-user-view.css',
  standalone: true
})
export class ManagerUserView
{
  constructor( private userService: User, private router: Router)
  {
    this.getUsers();
  }

  users = signal<UserModel[]>([]);

  errorMessage = signal<string>('');
  successMessage = signal<string>('');


  getUsers(): void {
    this.userService.getUsers().subscribe({
      next: (response) => {
        console.log(response);
        this.users.set(response);
      },
      error: (err) => {
        console.log(this.users);
        console.error('Error fetching users:', err);
        this.errorMessage.set('Failed to load users.');
      }
    });
  }

  updateUser(userId: number, userObject: UserModel ): void {
    this.userService.updateUser(userId, userObject).subscribe({
      next: () => {
        console.log(`User with ID ${userId} updated successfully.`);
        this.getUsers();
        alert(`User with ID ${userId} updated successfully.`);
      },
      error: (err) => {
        console.error(`Error updating user with ID ${userId}:`, err);
        alert(`Failed to update user with ID ${userId}.`);
      }
    })
  }

  deleteUser(userId: number): void {
    this.userService.deleteUser(userId).subscribe({
      next: () => {
        console.log(`User with ID ${userId} deleted successfully.`);
        this.getUsers();
        alert(`User with ID ${userId} deleted successfully.`);
      },
      error: (err) => {
        console.error(`Error deleting user with ID ${userId}:`, err);
        alert(`Failed to delete user with ID ${userId}.`);
      }
    })
  }

  protected readonly parseInt = parseInt;
}
