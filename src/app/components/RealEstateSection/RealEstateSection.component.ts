import { LocationsModal } from './../../models/LocationsModal';
import { Router } from '@angular/router';
import { MytoastService } from './../../services/mytoast.service';
import { DataService } from 'src/app/services/data.service';
import { ProductModel } from './../../models/ProductModel';
import { Component, LOCALE_ID, OnInit } from '@angular/core';

@Component({
  selector: 'app-RealEstateSection',
  templateUrl: './RealEstateSection.component.html',
  styleUrls: ['./RealEstateSection.component.scss']
})
export class RealEstateSectionComponent implements OnInit {
  product: ProductModel = new ProductModel();
  products : ProductModel[]= [];
  popularProducts : ProductModel[]= [];
    locations: LocationsModal[]=[];
  NoImage : boolean = false;


  constructor(
    public servis: DataService,
    public toast: MytoastService,
    public router: Router,
    ) { }

  ngOnInit() {
        this.ListProducts();
        this.GetLocationsFromDB();
  }
  ListProducts() {
    this.servis.GetAllProductData().subscribe(d => {
      for (let i=0; i < d.length; i++){
        d[i].ProductIMG1 = this.FixArrayNoImage(d[i].ProductIMG1)
      }
      this.products = d;
      this.popularProducts =  d.sort((a, b) => b.Clicks - a.Clicks).slice(0, 5);
    });
}
 FixArrayNoImage(imgpath : string){
    this.NoImage=false;
    if(imgpath == "" || imgpath == null){
      this.NoImage=true;
      return "https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-15.png";
    }
    return imgpath;
  }
  RedirectToDetailsPage(product:ProductModel){
    product.Clicks += 1;
    this.servis.EditProduct(product);
    this.router.navigate(['/Details/' + product.id])
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
