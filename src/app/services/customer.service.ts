import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Customer } from '../models/customer';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  getCustomers(): Observable<SingleResponseModel<Customer>>{
    let newPath = this.apiUrl + "customers/getall"
    return this.httpClient.get<SingleResponseModel<Customer>>(newPath);
  }

  getCustomersByUserId(userId:number): Observable<ListResponseModel<Customer>>{
    let newPath = this.apiUrl + "customers/getcustomersbyuserid?userId=" + userId
    return this.httpClient.get<ListResponseModel<Customer>>(newPath)
  }
}
