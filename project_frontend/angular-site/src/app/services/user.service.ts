import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserModel} from '../models/user.model';
import {ComponentModel} from '../models/component.model';
import {PartModel} from '../models/part.model';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})

export class User
{
  private readonly baseUrl = environment.apiBaseUrl;
  private readonly apiUrl = `${this.baseUrl}/users`;
  private readonly componentsUrl = `${this.baseUrl}/components`;
  private readonly plantsUrl = `${this.baseUrl}/parts`;
  private readonly buildsUrl = `${this.baseUrl}/builds`;
  private readonly vendorsURL = `${this.baseUrl}/vendors`;

  constructor(private http: HttpClient) {}


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

  createUser(userData: object, authentication: string | null): Observable<UserModel>
  {
    return this.http.post<UserModel>(this.apiUrl, userData,
      { headers: { Authorization: `Bearer ${authentication}` } });
  }

  loginUser(email: string, password: string, ): Observable<any>
  {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password });
  }


  getAllComponents(authentication: string | null): Observable<ComponentModel[]> {
    return this.http.get<any>(this.componentsUrl,
      {headers: { Authorization: `Bearer ${authentication}` } });
  }

  updateComponent(componentId: number, componentObject: ComponentModel, authentication : string | null): Observable<any> {
    return this.http.put(`${this.componentsUrl}/${componentId}`, {componentId: componentId,
      componentName: componentObject.compName, compQuantity: componentObject.compQuantity,
      plantId: componentObject.plantId},
      {headers: { Authorization: `Bearer ${authentication}` } });
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
    return this.http.delete(`${this.plantsUrl}/${partId}`,
      {headers: { Authorization: `Bearer ${authentication}` } });
  }

  getPartsByPlantId(plantId: string, authentication: string | null): Observable<any> {
    const url = `${this.plantsUrl}/plant/${plantId}`;
    return this.http.get<any>(url,
      { headers: { Authorization: `Bearer ${authentication}` } });
  }


  getAllBuilds(authentication: string | null): Observable<any> {
    return this.http.get<any>(this.buildsUrl,
      {headers: { Authorization: `Bearer ${authentication}` } });
  }

  createBuild(buildObject: any, authentication : string | null): Observable<any> {
    return this.http.post(this.buildsUrl, {partId: buildObject.partId, compId: buildObject.compId},
      {headers: { Authorization: `Bearer ${authentication}` } });
  }

  updateBuild(compId: number, partId: number, oldCompId: number, oldPartId : number,
              authentication: string | null): Observable<any> {
    return this.http.put(`${this.buildsUrl}/${oldPartId}/${oldCompId}`, {partId: partId, compId: compId},
      {headers: { Authorization: `Bearer ${authentication}` } });
  }

  deleteBuild(compId: number, partId: number, authentication: string | null): Observable<any> {
    return this.http.delete(`${this.buildsUrl}/${partId}/${compId}`,
      {headers: { Authorization: `Bearer ${authentication}` } });
  }

  getBuildsByPlantId(plantId: string, authentication: string | null): Observable<any> {
    const url = `${this.buildsUrl}/plant/${plantId}`;
    return this.http.get<any>(url,
      { headers: { Authorization: `Bearer ${authentication}` } });
  }


  getVendorsByPlantId(plantId: string, authentication: string | null): Observable<any> {
    const url = `${this.vendorsURL}/plant/${plantId}`;
    return this.http.get<any>(url,
      { headers: { Authorization: `Bearer ${authentication}` } });
  }

  getAllVendors(authentication: string | null): Observable<any> {
    return this.http.get<any>(this.vendorsURL,
      {headers: { Authorization: `Bearer ${authentication}` } });
  }

  createVendor(vendorObject: any, authentication : string | null): Observable<any> {
    return this.http.post(this.vendorsURL, {vendorId: vendorObject.vendorId, vendorName: vendorObject.vendorName,
      vendorCity: vendorObject.vendorCity, vendorState: vendorObject.vendorState},
      {headers: { Authorization: `Bearer ${authentication}` } });
  }

  updateVendor(vendorId: number, vendorObject: any, authentication: string | null): Observable<any> {
    return this.http.put(`${this.vendorsURL}/${vendorId}`, {vendorId: vendorId,
      vendorName: vendorObject.vendorName, vendorCity: vendorObject.vendorCity,
      plantId: vendorObject.plantId},
    {headers: { Authorization: `Bearer ${authentication}` } });
  }

  deleteVendor(vendorId: number, authentication: string | null): Observable<any> {
    return this.http.delete(`${this.vendorsURL}/${vendorId}`,
      {headers: { Authorization: `Bearer ${authentication}` } });
  }



}

