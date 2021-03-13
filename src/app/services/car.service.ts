import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarResponseModel } from '../models/carResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl = "https://localhost:44371/api/cars/getcardetails";

  constructor(private httpClient : HttpClient) { }

  getCars(): Observable<CarResponseModel>{
    this.httpClient
      return this.httpClient.get<CarResponseModel>(this.apiUrl);
  }
}
