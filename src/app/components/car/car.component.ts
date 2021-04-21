import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  cars:Car[] = [];
  dataLoaded = false;

  constructor(private carService: CarService, private activatedRoute:ActivatedRoute, private toastrService:ToastrService, private carImageService:CarImageService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["brandId"] && params["colorId"]){
        this.getCarsByBrandIdAndColorId(params["brandId"], params["colorId"])
      } 
      else if(params["brandId"]){
        this.getCarsByBrand(params["brandId"])
      }
      else if(params["colorId"]){
        this.getCarsByColor(params["colorId"]);
      }
      else{
        this.getCars()
      }
    })
  }

  carImages:CarImage[] = []

  deleteCar(car:Car){
    this.carImageService.getImagesByCarId(car.id).subscribe(response =>{
      this.carImages = response.data

      this.carImageService.delete(this.carImages[0].carId).subscribe(response=>{
        this.carService.delete(car).subscribe(response =>{
          this.toastrService.success(response.message,"Success")
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        })
      })


    })
  }

  getCars(){
    this.carService.getCars().subscribe(response => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }

  getCarsByBrand(brandId: number){
    this.carService.getCarsByBrand(brandId).subscribe(response=>{
      this.cars = response.data;
      this.dataLoaded = true;
    })   
  }

  getCarsByColor(colorId: number){
    this.carService.getCarsByColor(colorId).subscribe(response =>{
      this.cars = response.data;
      this.dataLoaded = true;
    })
  }

  getCarsByBrandIdAndColorId(brandId: number, colorId: number){
    this.carService.getCarsByBrandIdAndColorId(brandId, colorId).subscribe(response =>{
      this.cars = response.data;
      this.dataLoaded = true;
    })
  }
}
