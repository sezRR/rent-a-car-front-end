import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  carImages: CarImage[] = [];
  car: Car;


  constructor(private carImageService:CarImageService, private carService:CarService, private activatedRoute: ActivatedRoute) { }

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
}
