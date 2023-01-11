import { LocationsModal } from './../../models/LocationsModal';
import { ProductModel } from './../../models/ProductModel';
import { ActivatedRoute, Router } from '@angular/router';
import { MytoastService } from '../../services/mytoast.service';
import { DataService } from '../../services/data.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-DetailedProductSection',
  templateUrl: './DetailedProductSection.component.html',
  styleUrls: ['./DetailedProductSection.component.scss']
})
export class DetailedProductSectionComponent implements OnInit {
    locations: LocationsModal[]=[];
    CurrentIMG="";
   constructor(public servis: DataService,
    public toast: MytoastService,
    public router: Router,
    public activatedRouter: ActivatedRoute) { }
  ngOnInit() {
    this.activatedRouter.params.subscribe(params => this.getProductDataFromId(params['id']));
    this.GetLocationsFromDB();
    this.ProductData
    console.log(this.ProductData.id)

  }
    ProductData!: ProductModel;

    getProductDataFromId(id:string){
    this.servis.GetProductById(id).subscribe(d => {
      this.ProductData = d;
      console.log("Product Id is: " + this.ProductData.id)
      console.log(this.ProductData.IsDiscount);
      this.CurrentIMG = this.ProductData.ProductIMG1;
    });
  }


  changeImage(IMGId:string) {
    switch(IMGId != null){
      case IMGId == '1':{
        this.CurrentIMG = this.ProductData.ProductIMG1
        break
      }
      case IMGId == '2':{
        this.CurrentIMG = this.ProductData.ProductIMG2
        break
        }
      case IMGId == '3':{
        this.CurrentIMG = this.ProductData.ProductIMG3
        break
      }
      case IMGId == '4':{
        this.CurrentIMG = this.ProductData.ProductIMG4
        break
      }
    }
        }
   GetLocationsFromDB(){
    this.servis.ListLocations().subscribe(d=>{
      this.locations = d;
    })
  }
   ConvertLocationId(id:string){
    var Filter = this.locations.filter(s=> s.id == id);
    if (Filter.length>0){
      var CurrentLocation = new LocationsModal;
      CurrentLocation = Filter[0];
      return CurrentLocation.LocationName;
    } else {
      return "LocationDataDoesNotExist";
    }
  }
}
