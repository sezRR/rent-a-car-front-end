import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CreditCard } from 'src/app/models/creditCard';
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
  cardNumberSafeStr:string = "0000-0000-0000-0000"
  cvv:string = "000"
  monthForm:string = "Month"
  yearForm:string = "Year"

  focus:any
  focus1:any
  focus2:any
  focus3:any
  focus4:any

  rememberMyCreditCard:boolean = false
  rememberableCardNumber : number
  
  cards: CreditCard[] = []
  currentCard:string = "SAVED CARDS"

  cardProps:any;

  cardNumberStr:string;
  cardNumberSafe:string;

  isCardSelected:boolean = false

  card:CreditCard

  constructor(private paymentService:PaymentService, private toastrService:ToastrService, private router:Router, private storageService: StorageService, private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.createPaymentForm();

    if (this.storageService.getFromLocal("rememberMyCard") === "true") {
      this.rememberableCardNumber = parseInt(this.storageService.getFromLocal("rememberableCardNumber"))

      for (let i = 0; i < this.rememberableCardNumber; i++) {
        this.cardProps = JSON.parse(this.storageService.getFromLocal("card"+(i+1).toString()));

        this.cards.push(this.cardProps)
      }
    }
  }

  setCurrentCard(card:any){
    this.currentCard = card.showableCard
    this.isCardSelected = true

    this.setForms(card)
  }

  setForms(card:any){
    this.paymentForm.get("nameOnCard").patchValue(card.nameOnCard)
    this.paymentForm.get("cardNumberForm").patchValue(card.cardNumber)
    this.paymentForm.get("cvvForm").patchValue(card.cvv)
    this.paymentForm.get("monthForm").patchValue(card.expirationDateMonth)
    this.paymentForm.get("monthYear").patchValue(card.expirationDateYear)
  }

  clearCurrentCard(){
    this.currentCard = "SAVED CARDS"
    this.isCardSelected = false

    this.clearForms()
  }

  deleteCurrentCard(card:CreditCard){
    for (let i = 0; i < this.cards.length; i++) {
      if ( this.cards[i].cardNumber === card.cardNumber) { 
        this.currentCard = "SAVED CARDS"
        this.isCardSelected = false
        this.clearForms()

        this.cards.splice(i, 1);
        this.storageService.deleteFromLocal("card"+(i + 1).toString())
        this.rememberableCardNumber -= 1;
        this.storageService.addToLocal("rememberableCardNumber", this.rememberableCardNumber.toString())

        if (this.rememberableCardNumber === 0) {
          this.storageService.deleteFromLocal("rememberableCardNumber")         
          this.storageService.deleteFromLocal("rememberMyCard")         
        }

        this.toastrService.success("Credit Card deleted successfully", "Success")
        setTimeout(() => {
          window.location.reload()
        }, 150);
        return
      }   
    }

    this.cards
  }

  clearForms(){
    this.paymentForm.get("nameOnCard").reset()
    this.paymentForm.get("cardNumberForm").reset()
    this.paymentForm.get("cvvForm").reset()
    this.paymentForm.get("monthForm").reset()
    this.paymentForm.get("monthYear").reset()
  }

  rep() {
    for (let i = 0; i < this.cardNumberSafe.length; i++) {
      this.cardNumberSafe = this.setCharAt(this.cardNumberSafe,i,'*');
    }
    this.cardNumberSafe += this.cardNumberStr.slice(this.cardNumberStr.length/2,this.cardNumberStr.length)
  }

  setCharAt(str:any,index:any,chr:any) {
    if(index > str.length-1) return str;
    return str.substring(0,index) + chr + str.substring(index+1);
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
          this.savePaymentInformation();
          setTimeout(() => {
            window.location.reload()
          }, 150);
        }
      },
      error => {
        this.toastrService.error(error.error.message, "Error");
      })
    } else {
      this.toastrService.warning("Please check your forms", "Warning")
    }
  }
  
  savePaymentInformation(){
    if (this.rememberMyCreditCard) {
      this.storageService.addToLocal("rememberMyCard", "true")
      
      if (this.storageService.getFromLocal("rememberableCardNumber") === null) {
        this.rememberableCardNumber = 1;
        this.storageService.addToLocal("rememberableCardNumber", this.rememberableCardNumber.toString())
      } else if (this.storageService.getFromLocal("rememberableCardNumber")){
        this.rememberableCardNumber += 1;
        this.storageService.addToLocal("rememberableCardNumber", this.rememberableCardNumber.toString())
      }

      this.cardNumberStr = this.paymentForm.controls["cardNumberForm"].value,
      this.cardNumberSafe = this.cardNumberStr.slice(0,this.cardNumberStr.length/2)
      this.rep()

      var showableCard = this.paymentForm.controls["nameOnCard"].value + " | " + this.cardNumberSafe      

      this.card = {
        nameOnCard: this.paymentForm.controls["nameOnCard"].value,
        cardNumber: this.paymentForm.controls["cardNumberForm"].value,
        cvv: this.paymentForm.controls["cvvForm"].value,
        expirationDateMonth: this.paymentForm.controls["monthForm"].value,
        expirationDateYear: this.paymentForm.controls["monthYear"].value,
        showableCard: showableCard 
      }

      this.cards.push(this.card)
      this.storageService.addToLocal("card"+this.rememberableCardNumber.toString(), JSON.stringify(this.card))
    }
  }
}
