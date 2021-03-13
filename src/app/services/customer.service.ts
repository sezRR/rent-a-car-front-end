import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerResponseModel } from '../models/customerResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  apiUrl = "https://localhost:44371/api/customers/getall";

  constructor(private httpClient: HttpClient) { }

  getCustomers(): Observable<CustomerResponseModel>{
    this.httpClient
      return this.httpClient.get<CustomerResponseModel>(this.apiUrl);
  }
}
