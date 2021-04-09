import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  apiUrl = environment.apiUrl;

  constructor(private httpClient:HttpClient) { }

  pay():Observable<ResponseModel>{
    let newPath = this.apiUrl + "payments/pay"
    return this.httpClient.get<ResponseModel>(newPath);
  }
}
