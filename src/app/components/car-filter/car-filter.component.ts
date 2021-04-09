import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-filter',
  templateUrl: './car-filter.component.html',
  styleUrls: ['./car-filter.component.css']
})
export class CarFilterComponent implements OnInit {
  brands:Brand[] = []
  colors:Color[] = []

  isFiltered:boolean

  brandFilter:number = 0;
  colorFilter:number = 0;

  constructor(private colorService:ColorService, private brandService:BrandService, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.getBrands();
    this.getColors();

    this.activatedRoute.params.subscribe(params=>{
      if(params["brandId"] && params["colorId"]){
        this.isFiltered = true
      } 
      else{
        this.isFiltered = false
      }
    })
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands = response.data;
    });
  }

  getColors(){
    this.colorService.getColors().subscribe(response=>{
      this.colors = response.data;
    });
  }

  getIndexes(){
    console.log(this.brandFilter, this.colorFilter)
  }

  onChangeBrandFilter(newBrandFilterValue:number) {
    this.brandFilter = newBrandFilterValue;
  }

  onChangeColorFilter(newColorFilterValue:number) {
    this.colorFilter = newColorFilterValue;
  }

  resetFilterBoxes(){
    this.brandFilter = 0;
    this.colorFilter = 0;
  }

  resetFilter(){
    this.brandFilter = 0;
    this.colorFilter = 0;
  }
}
