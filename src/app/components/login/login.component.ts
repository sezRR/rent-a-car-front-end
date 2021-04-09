import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  focus:any;
  focus1:any;
  loginForm: FormGroup
  userId:number;
  rememberMe:boolean = false
  token:string

  constructor
  (
    private formBuilder: FormBuilder, 
    private authService:AuthService, 
    private toastrService: ToastrService, 
    private userService:UserService, 
    private storageService:StorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      email: ["", (Validators.required, Validators.email)],
      password: ["", Validators.required],
    })
  }

  localOrSessionStorage(){
    if (this.rememberMe) {
      this.storageService.addToLocal("rememberMe", "true")

      this.storageService.addToLocal("token", this.token)
      this.storageService.addToLocal("identityId", (this.userId).toString())
    } else {
      this.storageService.addToSession("rememberMe", "false")

      this.storageService.addToSession("token", this.token)
      this.storageService.addToSession("identityId", (this.userId).toString())
    }
  }


  login(){
    if (this.loginForm.valid) {
      let loginModel = Object.assign({}, this.loginForm.value)

        this.authService.login(loginModel).subscribe(response =>{
          this.toastrService.success("Successfully logged in to the system", "Success")
          this.token = response.data.token

          this.userService.getUserByMail(this.loginForm.controls["email"].value).subscribe(response=>
          {
            this.userId = response.data.id

            this.localOrSessionStorage();

            setTimeout(() => {
              window.location.replace("/")
            }, 1000);
          })
        }, responseError =>{
          this.toastrService.error(responseError.error, "Error")
        })

    } else {
      this.toastrService.warning("Please check your forms", "Warning")
      console.log(this.loginForm.value);
      
    }
  }
}
