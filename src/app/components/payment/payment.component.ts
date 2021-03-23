import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  paymentSuccessful: boolean;

  constructor(private paymentService:PaymentService, private toastrService:ToastrService, private router:Router) { }

  ngOnInit(): void {
  }

  pay(){
    this.paymentService.pay().subscribe(response =>{
      this.paymentSuccessful = true
      this.toastrService.success(response.message, "Success")
    },
    error => {
      this.paymentSuccessful = false;
      this.toastrService.error(error.error.message, "Error");
    })
  }
}
