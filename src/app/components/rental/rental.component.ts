import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from 'src/app/models/car';
import { Customer } from 'src/app/models/customer';
import { Rental } from 'src/app/models/rental';
import { RentalDto } from 'src/app/models/rentalDto';
import { CustomerService } from 'src/app/services/customer.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {
  rentals : RentalDto[] = [];
  dataLoaded = false;

  customers:Customer;
  rental:Rental;

  rentDate: Date;
  returnDate: Date;

  carId: number;

  @Input() car:Car;

  constructor(private rentalService: RentalService, private customerService: CustomerService, private router:Router, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    // this.getRentals();
    this.getCustomer();
  }

  getRentals(){
    this.rentalService.getRentals().subscribe(response => {
      this.rentals = response.data;
      this.dataLoaded = true;
    });
  }

  getCustomer(){
    this.customerService.getCustomers().subscribe(response => {
      this.customers = response.data;
    })
  }

  getRentalByCarId(carId:number){
    this.rentalService.getRentalByCarId(carId).subscribe(response =>{
      this.rental = response.data;
    })
  }
}
