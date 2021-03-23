import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { Rental } from 'src/app/models/rental';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  carImages: CarImage[] = [];

  car: Car;
  rentableCar: Rental;

  DateTimeNow: Date = new Date();
  rentDate: Date = this.DateTimeNow;
  returnDate: Date = this.DateTimeNow;

  constructor(private carImageService:CarImageService, private carService:CarService, private activatedRoute: ActivatedRoute, private rentalService: RentalService, private router: Router, private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      this.getCarDetails(params["id"])
    })
  }

  getCarDetails(carId:number){
    this.carService.getCarById(carId).subscribe(response =>{
      this.car = response.data;
    })
  }

  getImagesByCarId(carId: number){
    this.carImageService.getImagesByCarId(carId).subscribe(response =>{
      this.carImages = response.data;
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

  rent(){
    let rental: Rental = {
      carId: this.car.id,
      customerId: 1,
      rentDate: new Date(this.rentDate),
      returnDate: new Date(this.returnDate),
    };
    
    this.isRentable(rental)

    if (this.rentableCar != null) {
      this.toastrService.success("Redirecting to payment page", "Success");
      this.router.navigateByUrl('/payment');
    } else {
      this.toastrService.error("Oops.. Something went wrong.", "Error");
    }
  }
}
