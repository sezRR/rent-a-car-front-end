import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { RegisterModel } from '../models/registerModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { UpdateUserModel } from '../models/updateUserModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = "https://localhost:44371/api/users/";

  constructor(private httpClient: HttpClient) { }

  getUserByMail(email:string) : Observable<SingleResponseModel<User>>{
    let newPath = this.apiUrl + "getbymail?email="
    return this.httpClient.get<SingleResponseModel<User>>(newPath + email)
  }

  getUsersByFindeksRating(findeksRating:number) : Observable<ListResponseModel<User>>{
    let newPath = this.apiUrl + "getuserfindeksrating?findeksRating=" + findeksRating
    return this.httpClient.get<ListResponseModel<User>>(newPath)
  }

  getUserById(id:number) : Observable<SingleResponseModel<User>>{
    let newPath = this.apiUrl + "getuserbyid?id="+id
    return this.httpClient.get<SingleResponseModel<User>>(newPath)
  }

  updateUser(user:UpdateUserModel) : Observable<ResponseModel>{
    let newPath = this.apiUrl + "update"
    return this.httpClient.post<ResponseModel>(newPath, user)
  }
}
