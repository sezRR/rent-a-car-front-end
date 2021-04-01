import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PaymentService } from 'src/app/services/payment.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  paymentForm:FormGroup

  nameAndSurname:string = "Sezer Tetik"
  cardNumber:string = "0000-0000-0000-0000"
  cvv:string = "000"
  monthForm:string = "Month"
  yearForm:string = "Year"

  constructor(private paymentService:PaymentService, private toastrService:ToastrService, private router:Router, private storageService: StorageService, private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.createPaymentForm();

    if (this.storageService.getFromLocal("rememberMyCard") === "true") {
      this.nameAndSurname = this.storageService.getFromLocal("nameOnCard");
      this.cardNumber = this.storageService.getFromLocal("cardNumber");
      this.cvv = this.storageService.getFromLocal("cvv");
      this.monthForm = this.storageService.getFromLocal("expirationDateMonth");
      this.yearForm = this.storageService.getFromLocal("expirationDateYear");

      this.createRememberablePaymentForm()
    }
  }

  createRememberablePaymentForm(){
    this.paymentForm = this.formBuilder.group({
      nameOnCard: [this.nameAndSurname, Validators.required],
      cardNumberForm: [this.cardNumber, Validators.required],
      cvvForm: [this.cvv, Validators.required],
      monthForm: [this.monthForm, Validators.required],
      monthYear: [this.yearForm, Validators.required]
    })
  }

  createPaymentForm(){
    this.paymentForm = this.formBuilder.group({
      nameOnCard: ["", Validators.required],
      cardNumberForm: ["", Validators.required],
      cvvForm: ["", Validators.required],
      monthForm: ["", Validators.required],
      monthYear: ["", Validators.required]
    })
  }

  pay(){
    if (this.paymentForm.valid) {
      this.paymentService.pay().subscribe(response =>{
        if (response.success === true) {
          this.toastrService.success(response.message, "Success")
          document.getElementById("openModal").click(); 
        }
      },
      error => {
        this.toastrService.error(error.error.message, "Error");
      })
    } else {
      this.toastrService.warning("Please check your forms", "Warning")
      console.log(this.paymentForm.value);
      
    }
  }
  
  savePaymentInformation(){
    this.storageService.addToLocal("rememberMyCard", "true")

    this.storageService.addToLocal("nameOnCard", this.paymentForm.controls["nameOnCard"].value)
    this.storageService.addToLocal("cardNumber", this.paymentForm.controls["cardNumberForm"].value)
    this.storageService.addToLocal("cvv", this.paymentForm.controls["cvvForm"].value)
    this.storageService.addToLocal("expirationDateMonth", this.paymentForm.controls["monthForm"].value)
    this.storageService.addToLocal("expirationDateYear", this.paymentForm.controls["monthYear"].value)
  }
}
