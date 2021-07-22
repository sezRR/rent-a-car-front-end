import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CarImage } from '../models/carImage';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CarImageService {
  apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  getImagesByCarId(carId: number): Observable<ListResponseModel<CarImage>> {
    let newPath = this.apiUrl + "carimages/getbycarid?carId=" + carId;
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  }

  add(carId: any, file: any): Observable<ResponseModel> {
    let newPath = this.apiUrl + "carimages/add"

    const uploadData = new FormData();
    uploadData.append('carId', carId);
    uploadData.append('file', file);

    return this.httpClient.post<ResponseModel>(newPath, uploadData);
  }

  delete(id: number): Observable<ResponseModel> {
    let newPath = this.apiUrl + "carimages/delete?id=" + id

    return this.httpClient.post<ResponseModel>(newPath, null)
  }
}
