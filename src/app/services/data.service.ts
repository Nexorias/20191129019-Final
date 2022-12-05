import { LocationsModal } from '../models/LocationsModal';
import { ProductModel } from './../models/ProductModel';
import { ReturnUserData } from './../models/ReturnUserData';
import { Uye } from './../models/Uye';
import { Injectable } from '@angular/core';
import { Kategori } from '../models/Kategori';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public apiUrl = "http://localhost:3000/";
  public aktifUye: Uye = new Uye();
  constructor(
    public http: HttpClient
  ) { }

    /* Product Service  */
    GetAllProductData(){
     return this.http.get<ProductModel[]>(this.apiUrl + "products");
    }
    GetProductById(id: number){
      return this.http.get<ProductModel>(this.apiUrl + "products/"+id);
    }
    AddProduct(product: ProductModel){
      return this.http.post(this.apiUrl + "products/", product);

    }
    EditProduct(product: ProductModel) {
    return this.http.put(this.apiUrl + "products/" + product.id, product);
    }

    DeleteProduct(product: ProductModel) {
    return this.http.delete(this.apiUrl + "products/" + product.id);
     }
    /* Product Service End */
    /* Locations Service Start */
    ListLocations() {
    return this.http.get<LocationsModal[]>(this.apiUrl + "locations");
   }
    LocationById(id: number) {
    return this.http.get<LocationsModal>(this.apiUrl + "locations/" + id);
  }
   AddLocation(Location: LocationsModal) {
    return this.http.post(this.apiUrl + "locations/", Location);
  }
  EditLocation(Location: LocationsModal) {
    return this.http.put(this.apiUrl + "locations/" + Location.id, location);
  }
   DeleteLocationById(id: number) {
    return this.http.delete(this.apiUrl + "locations/" + id);
  }
    /* Locations Service End */
  /* kategori servis başla*/


  KategoriListele() {
    return this.http.get<Kategori[]>(this.apiUrl + "categories");
  }
  KategoriById(id: number) {
    return this.http.get<Kategori>(this.apiUrl + "categories/" + id);
  }
  KategoriEkle(kat: Kategori) {
    return this.http.post(this.apiUrl + "categories/", kat);
  }
  KategoriDuzenle(kat: Kategori) {
    return this.http.put(this.apiUrl + "categories/" + kat.id, kat);
  }
  KategoriSil(id: number) {
    return this.http.delete(this.apiUrl + "categories/" + id);
  }
  /* kategori servis bitiş*/

  /* Uye servis başla*/

  OturumAc(mail: string, parola: string) {
    return this.http.get<Uye[]>(this.apiUrl + "users?mail=" + mail + "&parola=" + parola);
  }

  ReturnActiveUserData(){
    return this.aktifUye;
  }

  OturumKontrol() {
    if (localStorage.getItem("adsoyad")) {
      this.AktifUyeBilgi()
      return true;
    } else {
      return false;
    }
  }
  LogoffUser() {
    if (localStorage.getItem("adsoyad")) {
      localStorage.clear();
      return true;
    } else {
      return false;
    }
  }

  ReturnUserData(){
    var UserData = new ReturnUserData();
    if (localStorage.getItem("adsoyad")){
      UserData.IsAdmin = parseInt(localStorage.getItem("admin") || "0");
       UserData.UserName = localStorage.getItem("adsoyad") || "";
       UserData.Mail = localStorage.getItem("mail") || "";
       UserData.RegisterationDate = localStorage.getItem("registeration")||"";
       return UserData;
    } else {
       UserData.IsAdmin = 0;
       UserData.UserName = "John Doe";
       UserData.Mail = "Test@mail.com";
       UserData.RegisterationDate = "0";
    return UserData;
    }
  }
  AktifUyeBilgi() {
    if (localStorage.getItem("adsoyad")) {
      this.aktifUye.adsoyad = localStorage.getItem("adsoyad") || "";
      var admin = localStorage.getItem("admin") || "0";
      this.aktifUye.admin = parseInt(admin);
    }
  }
  CheckAdmin(){
     if (this.aktifUye.admin == 1){
      return true;
     } else {
      return false;
     }
  }
  UyeListele() {
    return this.http.get<Uye[]>(this.apiUrl + "users");
  }
  UyeById(id: number) {
    return this.http.get<Uye>(this.apiUrl + "users/" + id);
  }
  UyeEkle(uye: Uye) {
    return this.http.post(this.apiUrl + "users/", uye);
  }
  UyeDuzenle(uye: Uye) {
    return this.http.put(this.apiUrl + "users/" + uye.id, uye);
  }
  UyeSil(id: number) {
    return this.http.delete(this.apiUrl + "users/" + id);
  }
  /* Uye servis bitiş*/
}
