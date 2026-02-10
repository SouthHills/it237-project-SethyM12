import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserModel} from '../models/user.model';

@Injectable({
  providedIn: 'root',
})

export class User
{
  constructor(private http: HttpClient) {}

  private apiUrl = 'http://localhost:3000/api/users'; // your backend base URL


}

