import {Component, signal} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {User} from '../services/user.service';

@Component({
  selector: 'app-login',
  imports: [
    RouterLink,
    FormsModule
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  standalone: true
})
export class Login {

  constructor(private userService: User, private router: Router) {}


  errorMessage = signal<string>('');
  successMessage = signal<string>('');

  validateInputs(event: Event) {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;


    const password = (form.elements.namedItem('password') as HTMLInputElement).value;


    this.errorMessage.set('');
    this.successMessage.set('');

    this.userService.loginUser(email,password).subscribe({
      next: (response) => {
        response = response.user

        if(response.userRoleManager === 1)
        {
          this.router.navigate(['/manager']);
        }
        else
        {
          const plantId = response.plantId;
          console.log(response.plantId);

            localStorage.setItem('plantId', String(plantId));

          this.router.navigate(['/employee-component-view']);
        }
        this.successMessage.set(response.message);
      },
      error: (err) => {
        const msg = err.error?.message ?? 'Login failed. Please check your credentials.';
        this.errorMessage.set(msg);
      }
    })


  }
}



