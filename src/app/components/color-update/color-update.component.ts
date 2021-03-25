import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.css']
})
export class ColorUpdateComponent implements OnInit {
  colorUpdateForm:FormGroup
  color:Color

  constructor(private colorService: ColorService, private activatedRoute:ActivatedRoute, private formBuilder:FormBuilder, private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if (params["colorId"]) {
        this.getColorById(params["colorId"])
        this.createColorUpdateForm(params["colorId"])
      }
    })
  }

  createColorUpdateForm(id:string){
    this.activatedRoute.params.subscribe(params=>{
      this.colorUpdateForm = this.formBuilder.group({
        id: [parseInt(id), Validators.required],
        colorName: ["", Validators.required],
      })
    })

  }

  getColorById(id:number){
    this.colorService.getColorById(id).subscribe(response=>{
      this.color = response.data
    })
  }

  update(){
    if (this.colorUpdateForm.valid) {
      let colorModel = Object.assign({}, this.colorUpdateForm.value)
      this.colorService.update(colorModel).subscribe(response=>{
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
