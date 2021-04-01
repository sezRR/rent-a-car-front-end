import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class FindeksService {
  apiUrl = 'https://localhost:44371/api/findekses/';

  constructor(private httpClient:HttpClient) { }

  calculate() : Observable<SingleResponseModel<number>>{
    let newPath = this.apiUrl + "calculate"
    return this.httpClient.get<SingleResponseModel<number>>(newPath)
  }
}
