import {Component, signal} from '@angular/core';
import {ManagerNavbar} from '../../manager-navbar/manager-navbar';
import { Router,  } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {User} from '../../services/user.service';

@Component({
  selector: 'app-manager-register-user-view',
  imports: [
    ManagerNavbar,
    FormsModule
  ],
  templateUrl: './manager-register-user-view.html',
  styleUrl: './manager-register-user-view.css',
})
export class ManagerRegisterUserView {
  constructor(private userService: User, private router: Router) {
  }

  successMessage = signal<string>('');
  errorMessage = signal<string>('');

  validateInputs(event: Event) {
    event.preventDefault();

    let userRoleManager = 0; /*by default were gonna say they are not a manager*/
    this.errorMessage.set('');
    this.successMessage.set('');

    const form = event.target as HTMLFormElement;
    const email = (form.elements.namedItem('email') as HTMLInputElement);
    const password = (form.elements.namedItem('password') as HTMLInputElement);
    const firstName = (form.elements.namedItem('firstName') as HTMLInputElement);
    const lastName = (form.elements.namedItem('lastName') as HTMLInputElement);
    const userRoleManagerInput = (form.elements.namedItem('makeManager') as HTMLInputElement);

    if (userRoleManagerInput.checked) {
      userRoleManager = 1;
    }
    const userInfo = {
      userFname: firstName.value,
      userLname: lastName.value,
      userEmail: email.value,
      userPassword: password.value,
      userRoleManager: userRoleManager
    };

    const authentication = localStorage.getItem('token');
    this.userService.createUser(userInfo, authentication).subscribe({
      next: () => {
        this.successMessage.set('Registration successful.');
      },
      error: (err) => {
        const msg = err.error?.message ?? 'Registration failed. Email might already exist.';
        this.errorMessage.set(msg);
        alert(`Failed to create user or invalid token or request.`);

        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      }
    });
  }


}

