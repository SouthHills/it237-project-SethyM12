import {Component, signal} from '@angular/core';
import {RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';
import { HttpClient } from '@angular/common/http';

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


  /*
    constructor(private userService: UserService) {}
  */

  private apiUrl = 'http://localhost:3000/login';

  errorMessage = signal<string>('');
  successMessage = signal<string>('');

  validateInputs(event: Event) {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    /!*get email value*!/
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;
    /!*get password value*!/

    this.errorMessage.set('');
    this.successMessage.set('');

    /*this.userService.login(email, password).subscribe({
      next: (res) => {
        if (res.success) {
          this.successMessage = res.message;
          console.log('User:', res.user);
          // Navigate to dashboard or store token
        } else {
          this.errorMessage = res.message;
        }
      },
      error: (err) => {
        this.errorMessage = 'Server error: ' + err.message;
      }
    })*/
    return;
    /*COMING BACK TO THIS LATER*/
  }
}



