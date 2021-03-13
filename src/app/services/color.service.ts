import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ColorResponseModel } from '../models/colorResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  apiUrl = "https://localhost:44371/api/colors/getall";

  constructor(private httpClient : HttpClient) { }

  getColors() : Observable<ColorResponseModel>{
    this.httpClient
      return this.httpClient.get<ColorResponseModel>(this.apiUrl)
  }
}
