import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css']
})
export class BrandAddComponent implements OnInit {
  brandAddForm : FormGroup;
  focus:any

  isInvalid:boolean = false

  constructor(private formBuilder: FormBuilder, private brandService: BrandService, private toastrService:ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.createBrandAddForm();
  }

  createBrandAddForm(){
    this.brandAddForm = this.formBuilder.group({
      brandName: ["", Validators.required],
    })
  }

  add(){
    if (this.brandAddForm.valid) {
      let brandModel = Object.assign({},this.brandAddForm.value)
      this.brandService.add(brandModel).subscribe(response=>{
        this.toastrService.success("Brand added", "Success");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
    } else {
      // this.toastrService.warning("Please check your brand name.", "Warning");
      this.isInvalid=true
    }
  }
}
