import { Component, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {User} from '../services/user.service';

@Component({
  selector: 'app-register',
  imports: [
    RouterLink,
    FormsModule
  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
  standalone: true
})
export class Register {
  constructor(private userService: User, private router: Router) {}

  successMessage = signal<string>('');
  errorMessage = signal<string>('');

  validateInputs(event: Event) {
    event.preventDefault();

    const userRoleManager = 0; /*by default were gonna say they are not a manager*/
    this.errorMessage.set('');
    this.successMessage.set('');

    const form = event.target as HTMLFormElement;
    const email = (form.elements.namedItem('email') as HTMLInputElement);
    const password = (form.elements.namedItem('password') as HTMLInputElement);
    const firstName = (form.elements.namedItem('firstName') as HTMLInputElement);
    const lastName = (form.elements.namedItem('lastName') as HTMLInputElement);

    const userInfo = {
      userFname: firstName.value,
      userLname: lastName.value,
      userEmail: email.value,
      userPassword: password.value,
      userRoleManager
    };

    this.userService.registerUser(userInfo).subscribe({
      next: () => {
        this.successMessage.set('Registration successful.');
      },
      error: (err) => {
        const msg = err.error?.message ?? 'Registration failed. Email might already exist.';
        this.errorMessage.set(msg);
      }
    });
  }
}
