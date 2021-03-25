import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {
  carUpdateForm:FormGroup
  car:Car
  
  constructor(private carService: CarService, private activatedRoute:ActivatedRoute, private formBuilder:FormBuilder, private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if (params["carId"]) {
        this.getCarById(params["carId"])
        this.createCarUpdateForm(params["carId"])
      }
    })
  }

  createCarUpdateForm(id:string){
    this.activatedRoute.params.subscribe(params=>{
      this.carUpdateForm = this.formBuilder.group({
        id: [parseInt(id), Validators.required],
        brandId: ["", Validators.required],
        colorId: ["", Validators.required],
        modelYear: ["", Validators.required],
        dailyPrice: ["", Validators.required],
        description: ["", Validators.required],
      })
    })

  }

  getCarById(id:number){
    this.carService.getCarById(id).subscribe(response=>{
      this.car = response.data
    })
  }

  update(){
    if (this.carUpdateForm.valid) {
      let carModel = Object.assign({}, this.carUpdateForm.value)
      this.carService.update(carModel).subscribe(response=>{
        this.toastrService.success(response.message, "Success");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
    } else {
      this.toastrService.error("Oops, something went wrong..", "Error")
    }
  }
}
