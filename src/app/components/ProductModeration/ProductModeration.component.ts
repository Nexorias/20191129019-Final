import { LocationsModal } from '../../models/LocationsModal';
import { Sonuc } from './../../models/Sonuc';
import { ToastInput } from './../../models/ToastInput';
import { ProductModel } from '../../models/ProductModel';
import { Router } from '@angular/router';
import { MytoastService } from '../../services/mytoast.service';
import { DataService } from 'src/app/services/data.service';
import { Component, OnInit } from '@angular/core';
import { Modal } from 'bootstrap';
import { FormGroup, FormControl } from '@angular/forms';
import * as bootstrap from 'bootstrap';


@Component({
  selector: 'app-ProductSection',
  templateUrl: './ProductModeration.component.html',
  styleUrls: ['./ProductModeration.component.scss']
})
export class ProductSectionComponent implements OnInit {
  product: ProductModel = new ProductModel();
  products : ProductModel[]= [];
  locations: LocationsModal[]=[];
  NoImage : boolean = false;
  DeleteAssurance: number = 0;

  ProductModal!: Modal;
  CurrentForm = null;

  ChosenProduct!: ProductModel;
  U_ModalName: string = "";

  ProductForm: FormGroup = new FormGroup({
    id                     : new FormControl(),
    ProductName            : new FormControl(),
    ProductDescription     : new FormControl(),
    ProductAdress          : new FormControl(),
    ProductLocation        : new FormControl(),
    ProductSellerName      : new FormControl(),
    ProductSellerCellPhone : new FormControl(),
    ProductPrice           : new FormControl(),
    regDate                : new FormControl(),
    editDate               : new FormControl(),
    IsActive               : new FormControl(),
    DiscountPrice          : new FormControl(),
    IsDiscount             : new FormControl(),
    ProductIMG1             : new FormControl(),
    ProductIMG2             : new FormControl(),
    ProductIMG3             : new FormControl(),
    ProductIMG4             : new FormControl(),
  });
  ImageForm: FormGroup = new FormGroup({
    id                      : new FormControl(),
    ProductIMG1             : new FormControl(),
    ProductIMG2             : new FormControl(),
    ProductIMG3             : new FormControl(),
    ProductIMG4             : new FormControl(),
    ProductName            : new FormControl(),
    ProductDescription     : new FormControl(),
    ProductAdress          : new FormControl(),
    ProductLocation        : new FormControl(),
    ProductSellerName      : new FormControl(),
    ProductSellerCellPhone : new FormControl(),
    ProductPrice           : new FormControl(),
    regDate                : new FormControl(),
    editDate               : new FormControl(),
    IsActive               : new FormControl(),
    DiscountPrice          : new FormControl(),
    IsDiscount             : new FormControl(),
  });
  constructor(
    public servis: DataService,
    public toast: MytoastService,
    public router: Router) { }

  ngOnInit() {
    this.ListProducts();
    this.GetLocationsFromDB();
  }
  editProduct(IsIMG:boolean){
    if (this.CheckUnathorizedAccess()==false ) {return}
    var CurrentProduct : ProductModel;
    if (IsIMG == true) {
      CurrentProduct = this.ImageForm.value
    } else {
      CurrentProduct = this.ProductForm.value
    }
     console.log(CurrentProduct.ProductIMG1)
     CurrentProduct.ProductIMG1 = this.FixArrayNoImage(CurrentProduct.ProductIMG1);
    var date = new Date();
    if (!CurrentProduct.id) {
        CurrentProduct.regDate = date.getTime().toString();
        CurrentProduct.editDate = date.getTime().toString();
        this.servis.AddProduct(CurrentProduct).subscribe(d => {
          var ToastMain = new Sonuc();
          ToastMain.islem = true;
          ToastMain.mesaj = "Kullanıcı Eklendi";
          this.toast.ToastUygula(ToastMain);
          this.ListProducts();
          this.ProductModal.toggle();
        });
    } else {
      CurrentProduct.editDate = date.getTime().toString();
      this.servis.EditProduct(CurrentProduct).subscribe(d => {
        var ToastMain = new Sonuc();
        ToastMain.islem = true;
        ToastMain.mesaj = "Kullanıcı Düzenlendi";
        this.toast.ToastUygula(ToastMain);
        this.ListProducts();
        this.ProductModal.toggle();
      });
    }
  }
  deleteProduct(){
    if (this.CheckUnathorizedAccess()==false ) {return}
    this.DeleteAssurance += 1;
    if (this.DeleteAssurance>1) {
      this.DeleteAssurance = 0;
      this.servis.DeleteProduct(this.ChosenProduct).subscribe(d => {
        var ToastMain = new Sonuc();
        ToastMain.islem = true;
        ToastMain.mesaj = "İlan Silindi";
        this.toast.ToastUygula(ToastMain);
        this.ListProducts();
        this.ProductModal.toggle();
    });
    }

  }
   AddProduct(){
if (this.CheckUnathorizedAccess()==false ) {return}
    this.FixNoImage()
    this.products.push(this.product);
    this.product = new ProductModel();
  }
   ListProducts() {
    this.servis.GetAllProductData().subscribe(d => {
      for (let i=0; i < d.length; i++){
        d[i].ProductIMG1 = this.FixArrayNoImage(d[i].ProductIMG1)
        this.ChosenProduct = d[i]
      }
      this.products = d;
    });
  }
 //Products end//

//Locations start//
  GetLocationsFromDB(){
    this.servis.ListLocations().subscribe(d=>{
      this.locations = d;
    })
  }
   ConvertLocationId(id:string){
    var Filter = this.locations.filter(s=> s.id == parseInt(id));
    if (Filter.length>0){
      var CurrentLocation = new LocationsModal;
      CurrentLocation = Filter[0];
      return CurrentLocation.LocationName;
    } else {
      return "LocationDataDoesNotExist";
    }
  }
//locations end//

  AddModal(el: HTMLElement) {
    if (this.CheckUnathorizedAccess()==false ) {return}
    this.ProductForm.reset();
    this.U_ModalName = "İlan Ekle";
    this.ProductModal = new bootstrap.Modal(el);
    this.ProductModal.show();
  }
  EditModal(ProductData: ProductModel, el: HTMLElement) {
    if (this.CheckUnathorizedAccess()==false ) {return}
    this.ProductForm.patchValue(ProductData);
    this.U_ModalName = "ilan Düzenle";
    this.ProductModal   = new bootstrap.Modal(el);
    this.ProductModal.show();
  }

  deleteModal(ProductData: ProductModel, el: HTMLElement) {
if (this.CheckUnathorizedAccess()==false ) {return}

    this.DeleteAssurance = 0
    this.UpdateCurrentProduct(ProductData)
    this.U_ModalName = "Kullanıcı Sil";
    this.ProductModal = new bootstrap.Modal(el);
    this.ProductModal.show();
  }

  UpdateCurrentProduct(ProductData: ProductModel) {
    for (let i=0; i < this.products.length; i++){
      if (this.products[i].id == ProductData.id) {
        this.ChosenProduct = this.products[i];
      }
    }
  }
//modal main end//
//modal secondary start//
ImageEditModal(ProductData: ProductModel, el: HTMLElement) {
    if (this.CheckUnathorizedAccess()==false ) {return}
    this.ImageForm.patchValue(ProductData);
    this.U_ModalName = "Resimleri Düzenle";
    this.ProductModal   = new bootstrap.Modal(el);
    this.ProductModal.show();
  }
//modal secondary end//
  FixNoImage(){
    this.NoImage=false;
    if(this.product.ProductIMG1 == ""){
      this.NoImage=true;
      this.product.ProductIMG1 = "https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-15.png";
    }
  }

  FixArrayNoImage(imgpath : string){
    this.NoImage=false;
    if(imgpath == "" || imgpath == null){
      this.NoImage=true;
      return "https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-15.png";
    }
    return imgpath;
  }

  RouteToAdminSection(){
  this.router.navigate(['/admin'])
  }
  RouteToHomeSection(){
      this.router.navigate(['/estatemoderation']);
  }

  CheckUnathorizedAccess(){ //to stop people from abusing admin commands via editing accessability by inspect element
    if (this.servis.CheckAdmin() == false) {
     this.router.navigate(['/'])
     return false
    } else {
      return true
    }
  }
}
