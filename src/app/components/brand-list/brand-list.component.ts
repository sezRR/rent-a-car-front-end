import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.css']
})
export class BrandListComponent implements OnInit {
  brands:Brand[] = []
  dataLoaded = false
  
  constructor(private brandService: BrandService, private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.getBrands()
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response =>{
      this.brands = response.data
      this.dataLoaded = true
    })
  }

  delete(brand:Brand){
    this.brandService.delete(brand).subscribe(response =>{
      this.toastrService.success(response.message,"Success")
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }, responseError =>{
      this.toastrService.error(responseError.error.Message,"Error")
    })
  }
}
