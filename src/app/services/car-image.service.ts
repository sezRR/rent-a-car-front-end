import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarImage } from '../models/carImage';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CarImageService {
  apiUrl = "https://localhost:44371/api/";

  constructor(private httpClient : HttpClient) { }

  getImagesByCarId(carId:number): Observable<ListResponseModel<CarImage>>{
    let newPath = this.apiUrl + "carimages/getbycarid?carId="+carId;
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  }

  add(carImage:CarImage): Observable<ResponseModel>{
    let newPath = this.apiUrl + "carimages/add"
    return this.httpClient.post<ResponseModel>(newPath, carImage);
  }
}
