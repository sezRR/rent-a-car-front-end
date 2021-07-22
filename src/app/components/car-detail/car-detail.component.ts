import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { Customer } from 'src/app/models/customer';
import { Rental } from 'src/app/models/rental';
import { User } from 'src/app/models/user';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { CustomerService } from 'src/app/services/customer.service';
import { RentalService } from 'src/app/services/rental.service';
import { StorageService } from 'src/app/services/storage.service';
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

  userList: User[] = []
  isEnough: boolean = false

  identityId: number
  userCustomers: Customer[] = []

  rentForm: FormGroup

  customer: Customer = { id: 0, userId: 0, companyName: "COMPANIES" }

  carImages: CarImage[] = []

  constructor
    (
      private carService: CarService,
      private activatedRoute: ActivatedRoute,
      private rentalService: RentalService,
      private router: Router,
      private toastrService: ToastrService,
      private userService: UserService,
      private storageService: StorageService,
      private formBuilder: FormBuilder,
      private customerService: CustomerService,
      private carImageService: CarImageService
    ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.getCarDetails(params["id"])
      this.getCarImages(params["id"])
      this.checkLogin()
      this.createRentForm()
    }).unsubscribe()
  }

  createRentForm() {
    this.rentForm = this.formBuilder.group({
      carId: ["", Validators.required],
      userId: ["", Validators.required],
      rentDate: ["", Validators.required],
      returnDate: ["", Validators.required],
    })
  }

  setCustomer(userCustomer: Customer) {
    this.customer = userCustomer
  }

  getCarImages(carId: number) {
    this.carImageService.getImagesByCarId(carId).subscribe(response => {
      this.carImages = response.data
    })
  }

  getCarDetails(carId: number) {
    this.carService.getCarById(carId).subscribe(response => {
      this.car = response.data;
    })
  }

  isRentable(rental: Rental) {
    this.rentalService.isRentable(rental).subscribe(response => {
      if (response.success != true) {
        return
      }
      this.rentableCar = rental
    })
  }

  findeksRatingGet(findeksRating: number) {
    this.userService.getUsersByFindeksRating(findeksRating).subscribe(response => {
      this.userList = response.data
      this.findeksRatingCheck();
    })
  }

  getCustomersByUserId(userId: number) {
    this.customerService.getCustomersByUserId(userId).subscribe(response => {
      this.userCustomers = response.data
    })
  }

  checkLogin() {
    if (this.storageService.getFromLocal("rememberMe") === "true") {
      this.identityId = parseInt(this.storageService.getFromLocal("identityId"))
      this.getCustomersByUserId(this.identityId)
    } else if (this.storageService.getFromSession("rememberMe") === "false") {
      this.identityId = parseInt(this.storageService.getFromSession("identityId"))
      this.getCustomersByUserId(this.identityId)
    } else {
      this.toastrService.warning("Please login to system!", "Warning")
      return
    }
  }



  findeksRatingCheck() {
    if (this.userList.length === 0) {
      return
    }

    this.userList.forEach(user => {
      if (user.id === this.identityId) {
        this.isEnough = true
        return
      } else {
        return
      }
    });
  }

  rent() {
    this.findeksRatingGet(this.car.minimumFindeksRating)

    if (this.customer.id === 0) {
      this.toastrService.warning("Please check your forms.", "Warning");
      return
    }

    this.rentForm.get("carId").patchValue(this.car.id)
    this.rentForm.get("userId").patchValue(this.identityId)

    if (this.rentForm.valid) {
      setTimeout(() => {
        if (this.isEnough) {
          let rentalModel = Object.assign({}, this.rentForm.value)


          this.isRentable(rentalModel)

          setTimeout(() => {
            if (this.rentableCar != null) {
              this.toastrService.success("Redirecting to payment page", "Success");
              this.router.navigateByUrl('/payment');
            } else {
              this.toastrService.error("The car was rented for the selected date ranges.", "Error");
            }
          }, 500);


        } else {
          this.toastrService.error("Your findeks rating is not enough for renting this car.", "Error")
        }
      }, 500);
    } else {
      this.toastrService.warning("Please check your forms", "Warning")
    }
  }
}
