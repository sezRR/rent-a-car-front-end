import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Color } from '../models/color';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  apiUrl = environment.apiUrl;

  constructor(private httpClient : HttpClient) { }

  getColors() : Observable<ListResponseModel<Color>>{
    let newPath = this.apiUrl + "colors/getall"
    return this.httpClient.get<ListResponseModel<Color>>(newPath)
  }

  getColorById(id:number) : Observable<SingleResponseModel<Color>>{
    let newPath = this.apiUrl + "colors/getbyid?id="+id
    return this.httpClient.get<SingleResponseModel<Color>>(newPath)
  }

  add(color:Color) : Observable<ResponseModel>{
    let newPath = this.apiUrl + "colors/add"
    return this.httpClient.post<ResponseModel>(newPath, color)
  }

  update(color:Color) : Observable<ResponseModel>{
    let newPath = this.apiUrl + "colors/update"
    return this.httpClient.post<ResponseModel>(newPath, color)
  }

  delete(color:Color) : Observable<ResponseModel>{
    let newPath = this.apiUrl + "colors/delete"
    return this.httpClient.post<ResponseModel>(newPath, color)
  }
}
