import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {
  carAddForm : FormGroup;
  // carImageAddForm: FormGroup
  
  // selectedFile:any = null;

  isAddCar:boolean = false
  // isAddCarImage: boolean = false

  constructor(private formBuilder: FormBuilder, private carService: CarService, private carImageService:CarImageService, private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.createCarAddForm();
    // this.createCarImageAddForm();
  }

  createCarAddForm(){
    this.carAddForm = this.formBuilder.group({
      brandId: ["", Validators.required],
      colorId: ["", Validators.required],
      modelYear: ["", Validators.required],
      dailyPrice: ["", Validators.required],
      description: ["", Validators.required],
    })
  }

  // createCarImageAddForm(){
  //   let dateNow = new Date().toUTCString()

  //   this.carImageAddForm = this.formBuilder.group({
  //     carId: ["", Validators.required],
  //     imagePath: ["", Validators.required],
  //     date: [dateNow, Validators.required]
  //   })
  // }

  // onFileSelected(event:any){
  //   this.selectedFile = event.target.files[0];
  // }

  add(){
    // this.carImageAddForm.controls['carId'].setValue(parseInt(this.carId));
    if (this.carAddForm.valid) {

      let carModel = Object.assign({},this.carAddForm.value)

      this.carService.add(carModel).subscribe(response=>{
        this.isAddCar = true
        if (this.isAddCar) {
          this.toastrService.success("Car added", "Success");   
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          this.toastrService.error("Oops, something went wrong about car adding.", "Error")
        }
      })

      // let carImageModel = Object.assign({},this.carImageAddForm.value)

      // this.carImageService.add(carImageModel).subscribe(response =>{
      //   this.isAddCarImage = true
      //   if (this.isAddCarImage) {
      //     this.toastrService.success("Car Image added", "Success");   
      //   } else {
      //     this.toastrService.error("Oops, something went wrong about car image adding.", "Error")
      //   }
      // })
    } 
    else {
      this.toastrService.error("Please check your forms.", "Error");
    }
  }
}
