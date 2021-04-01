import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { Rental } from 'src/app/models/rental';
import { User } from 'src/app/models/user';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { RentalService } from 'src/app/services/rental.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  car: Car;
  rentableCar: Rental;

  DateTimeNow: Date = new Date();
  rentDate: Date = this.DateTimeNow;
  returnDate: Date = this.DateTimeNow;

  userList:User[] = []
  isEnough:boolean = false

  constructor(private carImageService:CarImageService, private carService:CarService, private activatedRoute: ActivatedRoute, private rentalService: RentalService, private router: Router, private toastrService:ToastrService, private userService: UserService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      this.getCarDetails(params["id"])
    }).unsubscribe()
  }

  getCarDetails(carId:number){
    this.carService.getCarById(carId).subscribe(response =>{
      this.car = response.data;
    })
  }

  isRentable(rental:Rental){
    this.rentalService.isRentable(rental).subscribe(response => {
      if (response.success != true){
        return
      }
      this.rentableCar = rental
    })
  }

  findeksRatingGet(findeksRating:number){
    this.userService.getUsersByFindeksRating(findeksRating).subscribe(response =>{
      this.userList = response.data
      this.findeksRatingCheck();
    })
  }

  findeksRatingCheck(){
    if (this.userList.length === 0) {   
      return
    }

    if (localStorage.getItem("identityId") !== null) {
      for (let i = 0; i < this.userList.length; i++) {
        if (this.userList[i].id === parseInt(localStorage.getItem("identityId"))) {
          this.isEnough = true
          return
        } else {
          return
        }
      }
    } else {
      for (let i = 0; i < this.userList.length; i++) {
        if (this.userList[i].id === parseInt(sessionStorage.getItem("identityId"))) {
          this.isEnough = true
          return
        } else {
          return
        }
      }
    }


  }

  rent(){
    this.findeksRatingGet(this.car.minimumFindeksRating)

    setTimeout(() => {
      if (this.isEnough) {
        let rental: Rental = {
          carId: this.car.id,
          customerId: 1,
          rentDate: new Date(this.rentDate),
          returnDate: new Date(this.returnDate),
        };
        
        this.isRentable(rental)

        setTimeout(() => {
          if (this.rentableCar != null) {
            this.toastrService.success("Redirecting to payment page", "Success");
            this.router.navigateByUrl('/payment');
          } else {
            this.toastrService.error("Oops.. Something went wrong.", "Error");
          }
        }, 500);


        } else {
        this.toastrService.error("Your findeks rating is not enough for renting this car.", "Error")
        }
    }, 500);



  }
}
