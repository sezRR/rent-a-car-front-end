import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Car } from '../models/car';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl = environment.apiUrl;

  constructor(private httpClient : HttpClient) { }

  getCars(): Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getcardetails";
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByBrand(brandId:number): Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getcarsbybrandid?brandId=" + brandId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByColor(colorId: number): Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getcarsbycolorid?colorId=" + colorId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarById(carId: number): Observable<SingleResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getcardetailsbyid?id=" + carId
    return this.httpClient.get<SingleResponseModel<Car>>(newPath);
  }

  getCarsByBrandIdAndColorId(brandId: number, colorId: number): Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getcarsbybrandidandcolorid?brandId="+brandId+"&colorId="+colorId
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  add(car:Car) : Observable<ResponseModel>{
    let newPath = this.apiUrl + "cars/add"
    return this.httpClient.post<ResponseModel>(newPath, car)
  }

  addReturnableData(car:Car):Observable<SingleResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/addreturnabledata"
    return this.httpClient.post<SingleResponseModel<Car>>(newPath, car)
  }

  update(car:Car):Observable<ResponseModel>{
    let newPath = this.apiUrl + "cars/update"
    return this.httpClient.post<ResponseModel>(newPath, car)
  }

  delete(car:Car):Observable<ResponseModel>{
    let newPath = this.apiUrl + "cars/delete"
    return this.httpClient.post<ResponseModel>(newPath, car)

  }
}
