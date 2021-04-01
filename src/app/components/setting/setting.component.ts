import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  settingsUpdateForm:FormGroup
  user:User
  userId: number
  findeksRating: number
  isPasswordTrue: boolean

  constructor(private formBuilder:FormBuilder, private storageService:StorageService, private userService: UserService, private toastrService:ToastrService, private authService:AuthService) { }

  ngOnInit(): void {
    this.localOrSessionStorage();
    this.getUserById();
    this.createSettingsUpdateForm();
  }

  getUserById(){
    this.userService.getUserById(this.userId).subscribe(response =>{
      this.user = response.data
      this.findeksRating = response.data.findeksRating
    })
  }

  localOrSessionStorage(){
    if (this.storageService.getFromLocal("rememberMe") === "true") {
      this.userId = parseInt(this.storageService.getFromLocal("identityId"))
    } else if (this.storageService.getFromSession("rememberMe") === "false"){
      this.userId = parseInt(this.storageService.getFromSession("identityId"))
    }
  }

  createSettingsUpdateForm(){
    this.settingsUpdateForm = this.formBuilder.group({
      id: [this.userId, Validators.required],
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", (Validators.required, Validators.email)],
      password: ["", Validators.required],
      findeksRating: ["", Validators.required],
      currentPassword: ["", Validators.required],
    })
  }

  update(){
      this.settingsUpdateForm.patchValue({
        findeksRating: this.findeksRating
      })
      if (this.settingsUpdateForm.valid) {

        const userPasswordCheckConst = {
          email: this.user.email,
          password: this.settingsUpdateForm.controls["currentPassword"].value
        };
      
        let userPasswordCheckModel = Object.assign({}, userPasswordCheckConst)
        
        this.authService.checkPassword(userPasswordCheckModel).subscribe(response =>{

          const userForUpdateConst = {
            id: this.userId,
            firstName: this.settingsUpdateForm.controls["firstName"].value,
            lastName: this.settingsUpdateForm.controls["lastName"].value,
            email: this.settingsUpdateForm.controls["email"].value,
            password: this.settingsUpdateForm.controls["password"].value,
            findeksRating: this.findeksRating,
          }

          let userModel = Object.assign({}, userForUpdateConst)
          
          this.userService.updateUser(userModel).subscribe(response =>{
            if (this.settingsUpdateForm.controls["password"].value === this.settingsUpdateForm.controls["currentPassword"].value) {
              this.toastrService.warning("Your new password can not equal to your current (old) password.", "Warning")
              return
            }

            this.toastrService.success(response.message, "Success")
            setTimeout(() => {
              window.location.replace("/");
            }, 1000);
          }, responseError =>{
            this.toastrService.error(responseError.error, "Error")
          })

        }, responseError =>{
          this.toastrService.error(responseError.error, "Error")
        })

      } else {
        this.toastrService.warning("Check your forms", "Warning")       
      }
  }

}
