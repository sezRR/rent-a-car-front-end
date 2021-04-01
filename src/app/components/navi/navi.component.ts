import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {
  user: User
  identityId: number
  rememberMe: boolean
  isLogin: boolean

  constructor(private storageService: StorageService, private userService:UserService, private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.checkLogin()
  }

  checkLogin(){
    if (this.storageService.getFromLocal("rememberMe") === "true") {
      this.isLogin = true

      this.identityId = parseInt(this.storageService.getFromLocal("identityId"))
      this.getUserById()
      
      this.rememberMe = true
    } else if (this.storageService.getFromSession("rememberMe") === "false"){
      this.isLogin = true

      this.identityId = parseInt(this.storageService.getFromSession("identityId"))
      this.getUserById()

      this.rememberMe = false
    } else {
      this.isLogin = false
    }
  }

  getUserById(){
    this.userService.getUserById(this.identityId).subscribe(response =>{
      this.user = response.data
    })
  }

  signOut(){
    this.toastrService.success("Successfully logged out the system", "Success")

    if (this.rememberMe) {
      this.identityId = null
      this.storageService.deleteFromLocal("rememberMe")
      this.storageService.deleteFromLocal("token")
      this.storageService.deleteFromLocal("identityId")

      this.storageService.deleteFromLocal("rememberMyCard");

      this.storageService.deleteFromLocal("nameOnCard");
      this.storageService.deleteFromLocal("cardNumber");
      this.storageService.deleteFromLocal("cvv");
      this.storageService.deleteFromLocal("expirationDateMonth");
      this.storageService.deleteFromLocal("expirationDateYear");
    } else {
      this.identityId = null
      this.storageService.deleteFromSession("rememberMe")
      this.storageService.deleteFromSession("token")
      this.storageService.deleteFromSession("identityId")

      this.storageService.deleteFromLocal("rememberMyCard");

      this.storageService.deleteFromLocal("nameOnCard");
      this.storageService.deleteFromLocal("cardNumber");
      this.storageService.deleteFromLocal("cvv");
      this.storageService.deleteFromLocal("expirationDateMonth");
      this.storageService.deleteFromLocal("expirationDateYear");
    }

    setTimeout(() =>{
      window.location.replace("/login");
    }, 1150)
  }
}
