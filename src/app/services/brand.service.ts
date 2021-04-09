import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Brand } from '../models/brand';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  apiUrl = environment.apiUrl;

  constructor(private httpClient : HttpClient) { }

  getBrands() : Observable<ListResponseModel<Brand>>{
    let newPath = this.apiUrl + "brands/getall"
    return this.httpClient.get<ListResponseModel<Brand>>(newPath)
  }

  getBrandById(id:number):Observable<SingleResponseModel<Brand>>{
    let newPath = this.apiUrl + "brands/getbyid?id="+id
    return this.httpClient.get<SingleResponseModel<Brand>>(newPath)
  }

  add(brand:Brand) : Observable<ResponseModel>{
    let newPath = this.apiUrl + "brands/add"
    return this.httpClient.post<ResponseModel>(newPath, brand)
  }

  update(brand:Brand) : Observable<ResponseModel>{
    let newPath = this.apiUrl + "brands/update"
    return this.httpClient.post<ResponseModel>(newPath, brand)
  }

  delete(brand:Brand) : Observable<ResponseModel>{
    let newPath = this.apiUrl + "brands/delete"
    return this.httpClient.post<ResponseModel>(newPath, brand)
  }
}
