import { Component, OnInit } from '@angular/core';
import { ColorService } from 'src/app/services/color.service';
import { Color } from 'src/app/models/color';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-color-list',
  templateUrl: './color-list.component.html',
  styleUrls: ['./color-list.component.css']
})
export class ColorListComponent implements OnInit {
  colors:Color[] = []
  dataLoaded = false
  
  constructor(private colorService: ColorService, private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.getColors()
  }

  getColors(){
    this.colorService.getColors().subscribe(response =>{
      this.colors = response.data
      this.dataLoaded = true
    })
  }

  delete(color:Color){
    this.colorService.delete(color).subscribe(response =>{
      this.toastrService.success(response.message,"Success")
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }, responseError =>{
      this.toastrService.error(responseError.error.Message,"Error")
    })
  }
}
