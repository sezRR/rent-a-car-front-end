import { Directive, HostListener } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Directive({
  selector: '[appMaintenance]'
})
export class MaintenanceDirective {

  constructor(private toastrService:ToastrService){

  }

  @HostListener('click') koo(){
    this.toastrService.warning("This page is maintenance now", "Warning")
  }
}
