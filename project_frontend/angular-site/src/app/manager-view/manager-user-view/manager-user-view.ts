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
    this.userObject = {
      userId: 0,
      userFName: '',
      userLName: '',
      userEmail: '',
      userPassword: '',
      userRoleManager: ''

    };
  }

  userObject: {
    userId: number,
    userFName: string,
    userLName: string,
    userEmail: string,
    userPassword: string,
    userRoleManager: string
  }

  users = signal<UserModel[]>([]);

  errorMessage = signal<string>('');
  successMessage = signal<string>('');


  getUsers(): void {
    const authentication = localStorage.getItem('token');
    this.userService.getUsers(authentication).subscribe({
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
    const authentication = localStorage.getItem('token');
    this.userService.updateUser(userId, userObject, authentication).subscribe({
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
    const authentication = localStorage.getItem('token');
    this.userService.deleteUser(userId, authentication).subscribe({
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

  createUser(): void {
    const newUser = {
      ...this.userObject,
    }
    const authentication = localStorage.getItem('token');
    this.userService.createUser(newUser, authentication).subscribe({
      next: () => {
        console.log(`User created successfully.`);
        this.getUsers();
        alert(`User created successfully.`);
        this.userObject = {
          userId: 0,
          userFName: '',
          userLName: '',
          userEmail: '',
          userPassword: '',
          userRoleManager: ''
        };
      },
      error: (err) => {
        console.error('Error creating user:', err);
        alert('Failed to create user.');
      }
    });
  }

  protected readonly parseInt = parseInt;
}
