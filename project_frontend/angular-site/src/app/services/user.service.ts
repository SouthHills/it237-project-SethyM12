import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserModel} from '../models/user.model';
import {ComponentModel} from '../models/component.model';
import {PartModel} from '../models/part.model';

@Injectable({
  providedIn: 'root',
})

export class User
{
  constructor(private http: HttpClient) {}

  private apiUrl = 'http://localhost:3000/users'; // your backend base URL

  getUsers(): Observable<UserModel[]>
  {
    return this.http.get<UserModel[]>(this.apiUrl);
  }

  updateUser(userId: number, userObject: UserModel): Observable<any>
  {
    return this.http.put(`${this.apiUrl}/${userId}`, {userId: userId, userEmail: userObject.userEmail,
      userFname: userObject.userFname, userLname: userObject.userLname, userRoleManager: userObject.userRoleManager,
      plantId: userObject.plantId});
  }

  deleteUser(userId: number): Observable<any>
  {
    return this.http.delete(`${this.apiUrl}/${userId}`);
  }

  registerUser(userData: object): Observable<UserModel>
  {
    return this.http.post<UserModel>(this.apiUrl, userData);
  }

  loginUser(email: string, password: string): Observable<any>
  {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password });
  }

  private componentsUrl = 'http://localhost:3000/components';

  getAllComponents(): Observable<ComponentModel[]> {
    return this.http.get<any>(this.componentsUrl);
  }

  updateComponent(componentId: number, componentObject: ComponentModel): Observable<any> {
    return this.http.put(`${this.componentsUrl}/${componentId}`, {componentId: componentId,
      componentName: componentObject.compName, compQuantity: componentObject.compQuantity,
      plantId: componentObject.plantId});
  }

  deleteComponent(componentId: number): Observable<any> {
    return this.http.delete(`${this.componentsUrl}/${componentId}`);
  }

  createComponent(componentObject: any): Observable<any> {
    return this.http.post(this.componentsUrl, {compId: componentObject.compId, compName: componentObject.compName,
      compQuantity: componentObject.compQuantity, compSpecs: componentObject.compSpecs, plantId: componentObject.plantId});
  }


  getComponentsByPlantId(plantId: string): Observable<any> {
    const url = `${this.componentsUrl}/plant/${plantId}`;
    return this.http.get<any>(url);
  }

  private plantsUrl = 'http://localhost:3000/parts';

  getAllParts(): Observable<any> {
    return this.http.get<any>(this.plantsUrl);
  }

  createPart(partObject: any): Observable<any> {
    return this.http.post(this.plantsUrl, {partId: partObject.partId, partName: partObject.partName,
      partQuantity: partObject.partQuantity, partSpecs: partObject.partSpecs, vendorId: partObject.vendorId});
  }

  updatePart(partId: number, partObject: PartModel): Observable<any> {
    return this.http.put(`${this.plantsUrl}/${partId}`, {partId: partId,
      partName: partObject.partName, partQuantity: partObject.partQuantity,
      plantId: partObject.vendorId});
  }

  deletePart(partId: number): Observable<any> {
    return this.http.delete(`${this.plantsUrl}/${partId}`);
  }

  getPartsByPlantId(plantId: string): Observable<any> {
    const url = `${this.plantsUrl}/plant/${plantId}`;
    return this.http.get<any>(url);
  }



}

