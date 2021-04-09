import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { SignupComponent } from './components/signup/signup.component';

import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandListComponent } from './components/brand-list/brand-list.component';
import { BrandUpdateComponent } from './components/brand-update/brand-update.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { CarComponent } from './components/car/car.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { ColorListComponent } from './components/color-list/color-list.component';
import { ColorUpdateComponent } from './components/color-update/color-update.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RentalComponent } from './components/rental/rental.component';
import { SettingComponent } from './components/setting/setting.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {path:"",pathMatch:"full", component:HomeComponent},
  {path:"1",pathMatch:"full", component:AppComponent},
  {path:"2",pathMatch:"full", component:SignupComponent},
  {path:"3",pathMatch:"full", component:LandingComponent},
  {path:"4",pathMatch:"full", component:ProfileComponent},
  {path:"5",pathMatch:"full", component:NavbarComponent},
  {path:"6",pathMatch:"full", component:FooterComponent},
  {path:"7",pathMatch:"full", component:LoginComponent},
  {path:"",pathMatch:"full", component:RentalComponent},

  {path:"signin", component:LoginComponent},
  {path:"signup", component:SignupComponent},
  {path:"profile", component:ProfileComponent},
  {path:"settings",component:SettingComponent, canActivate:[LoginGuard]},
  {path:"brands/add",component:BrandAddComponent, canActivate:[LoginGuard]},
  {path:"colors/add",component:ColorAddComponent, canActivate:[LoginGuard]},
  {path:"cars/add",component:CarAddComponent, canActivate:[LoginGuard]},


  {path:"cars", component:CarComponent},
  {path:"colors",component:ColorListComponent},
  {path:"brands",component:BrandListComponent},
  {path:"colors/update/:colorId",component:ColorUpdateComponent, canActivate:[LoginGuard]},
  {path:"brands/update/:brandId",component:BrandUpdateComponent, canActivate:[LoginGuard]},
  {path:"cars/update/:brandId/:carId",component:CarUpdateComponent, canActivate:[LoginGuard]},
  {path:"cars/brand/:brandId", component:CarComponent},
  {path:"cars/color/:colorId", component:CarComponent},
  {path:"cars/filter/:brandId/:colorId", component:CarComponent},
  {path:"cars/brand/:brandName/:id", component:CarDetailComponent},
  {path:"payment",component:PaymentComponent, canActivate:[LoginGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
