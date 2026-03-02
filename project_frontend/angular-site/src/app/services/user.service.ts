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

  getUsers(authentication: string | null): Observable<UserModel[]>
  {
    return this.http.get<UserModel[]>(this.apiUrl,
    { headers: { Authorization: `Bearer ${authentication}` } });
  }

  updateUser(userId: number, userObject: UserModel, authentication: string | null): Observable<any>
  {
    return this.http.put(`${this.apiUrl}/${userId}`, {userId: userId, userEmail: userObject.userEmail,
      userFname: userObject.userFname, userLname: userObject.userLname, userRoleManager: userObject.userRoleManager,
      plantId: userObject.plantId} ,
      { headers: { Authorization: `Bearer ${authentication}` } });
  }

  deleteUser(userId: number, authentication: string | null): Observable<any>
  {
    return this.http.delete(`${this.apiUrl}/${userId}`,
      { headers: { Authorization: `Bearer ${authentication}` } });
  }

  registerUser(userData: object): Observable<UserModel>
  {
    return this.http.post<UserModel>(this.apiUrl, userData);
  }

  loginUser(email: string, password: string, ): Observable<any>
  {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password });
  }

  private componentsUrl = 'http://localhost:3000/components';

  getAllComponents(authentication: string | null): Observable<ComponentModel[]> {
    return this.http.get<any>(this.componentsUrl,
      {headers: { Authorization: `Bearer ${authentication}` } });
  }

  updateComponent(componentId: number, componentObject: ComponentModel, authentication : string | null): Observable<any> {
    return this.http.put(`${this.componentsUrl}/${componentId}`, {componentId: componentId,
      componentName: componentObject.compName, compQuantity: componentObject.compQuantity,
      plantId: componentObject.plantId},
      {headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
  }

  deleteComponent(componentId: number, authentication: string | null): Observable<any> {
    return this.http.delete(`${this.componentsUrl}/${componentId}`,
      {headers: { Authorization: `Bearer ${authentication}` } });
  }

  createComponent(componentObject: any, authentication: string | null): Observable<any> {
    return this.http.post(this.componentsUrl, {compId: componentObject.compId, compName: componentObject.compName,
      compQuantity: componentObject.compQuantity, compSpecs: componentObject.compSpecs, plantId: componentObject.plantId},
      {headers: { Authorization: `Bearer ${authentication}` } });
  }


  getComponentsByPlantId(plantId: string, authentication: string | null): Observable<any> {
    const url = `${this.componentsUrl}/plant/${plantId}`;
    return this.http.get<any>(url ,
      { headers: { Authorization: `Bearer ${authentication}` } });
  }

  private plantsUrl = 'http://localhost:3000/parts';

  getAllParts(authentication: string | null): Observable<any> {
    return this.http.get<any>(this.plantsUrl,
      {headers: { Authorization: `Bearer ${authentication}` } });
  }

  createPart(partObject: any, authentication : string | null): Observable<any> {
    return this.http.post(this.plantsUrl, {partId: partObject.partId, partName: partObject.partName,
      partQuantity: partObject.partQuantity, partSpecs: partObject.partSpecs, vendorId: partObject.vendorId},
      {headers: { Authorization: `Bearer ${authentication}` } });
  }

  updatePart(partId: number, partObject: PartModel, authentication: string | null): Observable<any> {
    return this.http.put(`${this.plantsUrl}/${partId}`, {partId: partId,
      partName: partObject.partName, partQuantity: partObject.partQuantity,
      plantId: partObject.vendorId},
    {headers: { Authorization: `Bearer ${authentication}` } });
  }

  deletePart(partId: number, authentication: string | null): Observable<any> {
    return this.http.delete(`${this.plantsUrl}/${partId}`);
  }

  getPartsByPlantId(plantId: string, authentication: string | null): Observable<any> {
    const url = `${this.plantsUrl}/plant/${plantId}`;
    return this.http.get<any>(url,
      { headers: { Authorization: `Bearer ${authentication}` } });
  }



}

