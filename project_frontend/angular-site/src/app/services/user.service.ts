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

  private apiUrl = 'http://localhost:3000/users'; // your backend base URL


  registerUser(userData: object): Observable<UserModel>
  {
    return this.http.post<UserModel>(this.apiUrl, userData);
  }

  loginUser(email: string, password: string): Observable<any>
  {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password });
  }

  private componentsUrl = 'http://localhost:3000/components';

  getComponentsByPlantId(plantId: string): Observable<any> {
    const url = `${this.componentsUrl}/plant/${plantId}`;
    return this.http.get<any>(url);
  }

  private plantsUrl = 'http://localhost:3000/parts';

  getPartsByPlantId(plantId: string): Observable<any> {
    const url = `${this.plantsUrl}/plant/${plantId}`;
    return this.http.get<any>(url);
  }


}

