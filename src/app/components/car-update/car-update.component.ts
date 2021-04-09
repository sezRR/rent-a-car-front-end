import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {
  carUpdateForm:FormGroup
  car:Car

  focus:any
  focus1:any
  focus2:any
  focus3:any

  brands: Brand[] = []
  brand:Brand = {id:0,brandName:"BRANDS"}

  colors: Color[] = []
  color:Color = {id:0,colorName:"COLORS"}
  
  constructor(private carService: CarService, private activatedRoute:ActivatedRoute, private formBuilder:FormBuilder, private toastrService:ToastrService, private colorService:ColorService, private brandService:BrandService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if (params["carId"]) {
        this.getCarById(params["carId"])
        this.createCarUpdateForm(params["carId"])
      }
    })
    this.getColors()
    this.getBrands()
  }

  getColors(){
    this.colorService.getColors().subscribe(response =>{
      this.colors = response.data
    })
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response =>{
      this.brands = response.data
    })
  }

  setBrand(brand:Brand){
    this.brand = brand
  }

  setColor(color:Color){
    this.color = color
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
        minimumFindeksRating: ["", Validators.required],
      })
    })

  }

  getCarById(id:number){
    this.carService.getCarById(id).subscribe(response=>{
      this.car = response.data
    })
  }

  update(){
    if (this.brand.id === 0 || this.color.id === 0) {
      this.toastrService.warning("Please check your forms.", "Warning");
      return
    }

    this.carUpdateForm.get("brandId").patchValue(this.brand.id)
    this.carUpdateForm.get("colorId").patchValue(this.color.id)

    if (this.carUpdateForm.valid) {
      let carModel = Object.assign({}, this.carUpdateForm.value)
      this.carService.update(carModel).subscribe(response=>{
        this.toastrService.success(response.message, "Success");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
    } else {
      this.toastrService.warning("Please check your forms", "Warning")
      console.log(this.carUpdateForm.value);
      
    }
  }
}
