import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { RentalDto } from '../models/rentalDto';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  apiUrl = "https://localhost:44371/api/";

  constructor(private httpClient : HttpClient) { }

  getRentals(): Observable<ListResponseModel<RentalDto>>{
    return this.httpClient.get<ListResponseModel<RentalDto>>(this.apiUrl);
  }

  getRentalByCarId(carId:number):Observable<SingleResponseModel<Rental>>{
    let newPath = this.apiUrl + "rentals/getrentalbycarid?carId="+carId
    return this.httpClient.get<SingleResponseModel<Rental>>(newPath);
  }

  isRentable(rental:Rental): Observable<SingleResponseModel<Rental>>{
    let newPath = this.apiUrl + "rentals/isrentable"
    return this.httpClient.post<SingleResponseModel<Rental>>(newPath, { ...rental})
  }
}
