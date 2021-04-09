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
  updateSettingsForm:FormGroup
  user:User
  userId: number
  findeksRating: number
  isPasswordTrue: boolean

  isClicked1:boolean = false
  isClicked2:boolean = false
  isClicked3:boolean = false
  isClicked4:boolean = false

  focus:any;
  focus1:any;
  focus2:any;
  focus3:any;
  focus4:any;

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
    this.updateSettingsForm = this.formBuilder.group({
      id: [this.userId, Validators.required],
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", (Validators.required, Validators.email)],
      password: ["", Validators.required],
      findeksRating: ["", Validators.required],
      currentPassword: ["", Validators.required],
    })

    this.updateSettingsForm.disable()
    this.updateSettingsForm.get("currentPassword").enable()
  }

  update(){
      this.updateSettingsForm.patchValue({
        findeksRating: this.findeksRating
      })
      if (this.updateSettingsForm.valid) {

        const userPasswordCheckConst = {
          email: this.user.email,
          password: this.updateSettingsForm.controls["currentPassword"].value
        };
      
        let userPasswordCheckModel = Object.assign({}, userPasswordCheckConst)
        
        this.authService.checkPassword(userPasswordCheckModel).subscribe(response =>{

          const userForUpdateConst = {
            id: this.userId,
            firstName: this.updateSettingsForm.controls["firstName"].value,
            lastName: this.updateSettingsForm.controls["lastName"].value,
            email: this.updateSettingsForm.controls["email"].value,
            password: this.updateSettingsForm.controls["password"].value,
            findeksRating: this.findeksRating,
          }

          let userModel = Object.assign({}, userForUpdateConst)
          
          this.userService.updateUser(userModel).subscribe(response =>{
            if (this.updateSettingsForm.controls["password"].value === this.updateSettingsForm.controls["currentPassword"].value) {
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

  clickAction1(){
    if (this.isClicked1) {
      this.isClicked1 = false;
      this.updateSettingsForm.get("firstName").setValue("  First Name");
      this.updateSettingsForm.get("firstName").disable();
    } else {
      this.isClicked1 = true
      this.updateSettingsForm.get("firstName").setValue(this.user.firstName);
      this.updateSettingsForm.get("firstName").enable();
    }
  }

  clickAction2(){
    if (this.isClicked2) {
      this.isClicked2 = false;
      this.updateSettingsForm.get("lastName").setValue("  Last Name");
      this.updateSettingsForm.get("lastName").disable();
    } else {
      this.isClicked2 = true
      this.updateSettingsForm.get("lastName").setValue(this.user.lastName);
      this.updateSettingsForm.get("lastName").enable();
    }
  }

  clickAction3(){
    if (this.isClicked3) {
      this.isClicked3 = false;
      this.updateSettingsForm.get("email").setValue("  Email");
      this.updateSettingsForm.get("email").disable();
    } else {
      this.isClicked3 = true
      this.updateSettingsForm.get("email").setValue(this.user.email);
      this.updateSettingsForm.get("email").enable();
    }
  }

  clickAction4(){
    if (this.isClicked4) {
      this.isClicked4 = false;
      this.updateSettingsForm.get("password").setValue("  Password");
      this.updateSettingsForm.get("password").disable();
    } else {
      this.isClicked4 = true
      this.updateSettingsForm.get("password").setValue("");
      this.updateSettingsForm.get("password").enable();
    }
  }
}
