import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.css']
})
export class BrandUpdateComponent implements OnInit {
  brandUpdateForm:FormGroup
  brand:Brand
  
  constructor(private brandService: BrandService, private activatedRoute:ActivatedRoute, private formBuilder:FormBuilder, private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if (params["brandId"]) {
        this.getBrandById(params["brandId"])
        this.createBrandUpdateForm(params["brandId"])
      }
    })
  }

  createBrandUpdateForm(id:string){
    this.activatedRoute.params.subscribe(params=>{
      this.brandUpdateForm = this.formBuilder.group({
        id: [parseInt(id), Validators.required],
        brandName: ["", Validators.required],
      })
    })

  }

  getBrandById(id:number){
    this.brandService.getBrandById(id).subscribe(response=>{
      this.brand = response.data
    })
  }

  update(){
    if (this.brandUpdateForm.valid) {
      let brandModel = Object.assign({}, this.brandUpdateForm.value)
      this.brandService.update(brandModel).subscribe(response=>{
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
