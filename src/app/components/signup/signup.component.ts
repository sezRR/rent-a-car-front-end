import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { FindeksService } from 'src/app/services/findeks.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    test : Date = new Date();
    focus : any;
    focus1: any;
    focus2: any;
    focus3: any;

    registerForm:FormGroup
    userId:number
    rememberMe = false
    token:string;

    constructor
    (
      private formBuilder:FormBuilder, 
      private authService:AuthService,
      private toastrService:ToastrService, 
      private findeksService:FindeksService,
      private storageService:StorageService,
      private userService: UserService
    ) { }

    ngOnInit(): void {
        this.createRegisterForm()
      }
    
      createRegisterForm(){
        this.registerForm = this.formBuilder.group({
          firstName: ["", Validators.required],
          lastName: ["", Validators.required],
          email: ["", (Validators.required, Validators.email)],
          password: ["", Validators.required],
          findeksRating: [""]
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
    
      register(){
        if (this.registerForm.valid) {
          var findeksRatingData;
    
          this.findeksService.calculate().subscribe(response =>{
            findeksRatingData = response.data
            this.registerForm.patchValue({
              findeksRating: findeksRatingData
            })
          })
    
          setTimeout(() => {
            let registerModel = Object.assign({}, this.registerForm.value)
            this.authService.register(registerModel).subscribe(response =>{
              this.token = response.data.token
    
              this.userService.getUserByMail(this.registerForm.controls["email"].value).subscribe(response =>{
                this.userId = response.data.id
    
                this.localOrSessionStorage();
                this.toastrService.success("Successfully registered to the system", "Success")
      
                setTimeout(() => {
                  window.location.replace("/");
                }, 1000);
              })
    
            }, responseError=>{
              this.toastrService.error(responseError.error.message, "Error")
              console.log(responseError);
              
            })
          }, 100);
    
    
        } else {
          this.toastrService.warning("Please check your forms", "Warning")
        }
      }
}
