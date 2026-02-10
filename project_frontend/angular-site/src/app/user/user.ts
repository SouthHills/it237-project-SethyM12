// import {Component, signal} from '@angular/core';
// import {CurrencyPipe, DatePipe, PercentPipe} from '@angular/common';
// import {register} from 'node:module';
// import {Router} from '@angular/router';
// import {UserModel} from '../models/user.model';
//
// @Component({
//   selector: 'app-user',
//   imports: [
//     CurrencyPipe,
//     DatePipe,
//     PercentPipe
//   ],
//   templateUrl: './user.html',
//   styleUrl: './user.css',
// })
// export class User {
//   constructor(private userService: , private router: Router)
//   {
//     effect(() =>
//     {
//       this.productService.getProducts().subscribe({
//         next: (data) => this.products.set(data),
//         error: (error) => {
//           this.errorMessage.set('Error fetching products.');
//           console.error('There was an error!', error);
//         }
//
//
//
//       });
//     })
//   }
//   errorMessage = signal<string>('');
//
// }
