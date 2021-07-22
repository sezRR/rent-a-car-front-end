import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';
declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {
  carAddForm: FormGroup;
  carImageAddForm: FormGroup
  // carImageAddForm: FormGroup

  // selectedFile:any = null;

  // isAddCarImage: boolean = false

  focus: any
  focus1: any
  focus2: any
  focus3: any

  brands: Brand[] = []
  brand: Brand = { id: 0, brandName: "BRANDS" }

  colors: Color[] = []
  color: Color = { id: 0, colorName: "COLORS" }

  carId: number

  date: any

  isNotInvalid: boolean = false
  isNotInvalidButtonBrand: boolean = false
  isNotInvalidButtonColor: boolean = false

  modelYearPlaceholder: string = "Model Year"
  modelYearIconClass: string = "fas fa-calendar-check"
  modelYearInvalidMessage: string = "Please type the Car's Model Year"

  dailyPricePlaceholder: string = "Daily Price"
  dailyPriceIconClass: string = "fas fa-money-bill-alt"
  dailyPriceInvalidMessage: string = "Please type the Car's Daily Price"

  descriptionPlaceholder: string = "Description"
  descriptionIconClass: string = "fas fa-info-circle"
  descriptionInvalidMessage: string = "Please type the Car's Description"

  minimumFindeksRatingPlaceholder: string = "Minimum Findeks Rating"
  minimumFindeksRatingIconClass: string = "fas fa-star-half-alt"
  minimumFindeksRatingInvalidMessage: string = "Please type the Car's Minimum Findeks Rating"

  file: any = null
  files: any[] = null

  constructor
    (
      private formBuilder: FormBuilder,
      private carService: CarService,
      private carImageService: CarImageService,
      private toastrService: ToastrService,
      private brandService: BrandService,
      private colorService: ColorService,
  ) { }

  ngOnInit(): void {
    this.createCarAddForm();
    this.createCarImageAddForm();

    this.getColors()
    this.getBrands()
  }

  fileValueChange(event: any) {
    if (event !== null) {
      if (event.srcElement.files.length > 5) {
        this.toastrService.error("You can select max 5 image for each car", "Error")
        return
      }
      if (event.srcElement.files.length > 1) {
        this.files = []
        for (let i = 0; i < event.srcElement.files.length; i++) {
          this.files[i] = event.srcElement.files[i];
        }
      } else {
        this.file = event.srcElement.files[0]
      }
    } else if (event === null) {
      this.file = null
      this.files = null
    }
  }

  getColors() {
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data
    })
  }

  getBrands() {
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data
    })
  }

  setBrand(brand: Brand) {
    this.brand = brand
    this.isNotInvalidButtonBrand = false
  }

  setColor(color: Color) {
    this.color = color
    this.isNotInvalidButtonColor = false
  }

  createCarAddForm() {
    this.carAddForm = this.formBuilder.group({
      brandId: ["", Validators.required],
      colorId: ["", Validators.required],
      modelYear: ["", Validators.required],
      dailyPrice: ["", [Validators.required, Validators.min(0)]],
      description: ["", Validators.required],
      minimumFindeksRating: ["", [Validators.required, Validators.min(0), Validators.max(1900)]],
    })
  }

  createCarImageAddForm() {
    this.carImageAddForm = this.formBuilder.group({
      carId: [""],
    })
  }

  addCarImage() {
    this.carImageAddForm.get("carId").patchValue(this.carId)

    this.carImageService.add(this.carImageAddForm.get("carId").value, this.file).subscribe(response => {
      this.toastrService.success("Car added", "Success");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    })
  }

  addCarImages() {
    this.carImageAddForm.get("carId").patchValue(this.carId)

    for (let i = 0; i < this.files.length; i++) {
      this.carImageService.add(this.carImageAddForm.get("carId").value, this.files[i]).subscribe(response => {
      }, responseError => {
        this.toastrService.error(responseError.Message)
      })
    }

    setTimeout(() => {
      window.location.reload();
    }, 1000);

  }

  add() {
    this.carAddForm.get("brandId").patchValue(this.brand.id)
    this.carAddForm.get("colorId").patchValue(this.color.id)

    if (this.brand.id === 0 || this.color.id === 0) {
      if (this.brand.id === 0) {
        this.isNotInvalidButtonBrand = true
      }
      if (this.color.id === 0) {
        this.isNotInvalidButtonColor = true
      }

      this.isNotInvalid = true

      return
    }

    if (this.carAddForm.valid) {
      this.carAddForm.get("dailyPrice").patchValue(parseInt(this.carAddForm.get("dailyPrice").value))
      this.carAddForm.get("minimumFindeksRating").patchValue(parseInt(this.carAddForm.get("minimumFindeksRating").value))
      this.carAddForm.get("modelYear").patchValue(parseInt(this.carAddForm.get("modelYear").value))
      let carModel = Object.assign({}, this.carAddForm.value)

      this.carService.addReturnableData(carModel).subscribe(response => {
        this.carId = response.data.id

        const checkFiles = this.files ?? []

        if (checkFiles.length > 0) {
          this.addCarImages()
        } else {
          this.addCarImage()
        }

        this.toastrService.success("Car added", "Success");
      }, responseError => {
        this.toastrService.error(responseError.error.Message, "Error")
        console.log(responseError);
        console.log(this.carAddForm.value);

      })
    }
    else {
      this.isNotInvalid = true
    }
  }
}
