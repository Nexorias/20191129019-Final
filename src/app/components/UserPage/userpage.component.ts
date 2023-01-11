import { concatMap, Observable } from 'rxjs';
import { HotToastModule, HotToastService } from '@ngneat/hot-toast';
import { ReturnUserData } from './../../models/ReturnUserData';
import { DataService } from 'src/app/services/data.service';
import { AuthGuard } from '../../services/auth.guard';
import { Router } from '@angular/router';
import { MytoastService } from '../../services/mytoast.service';
import { Component, OnInit } from '@angular/core';
import { Sonuc } from 'src/app/models/Sonuc';
import { User } from 'firebase/auth';
import {Storage,
  ref,
  uploadBytesResumable,
  getDownloadURL
} from '@angular/fire/storage';
@Component({
  selector: 'app-userpage',
  templateUrl: './userpage.component.html',
  styleUrls: ['./userpage.component.scss',]
})
export class UserpageComponent implements OnInit {
 user = this.Service.auth!.currentUser!;

  constructor(public Service:DataService, public toast: MytoastService, public routing:Router, public Authorization : AuthGuard, public htoast: HotToastService) { }
  UserDisplayName = 'John Doe';
  IsAdmin = '0';
  AdminBool: boolean = false;
  Mail = 'John@mail.com';
  ProfileIMG = "assets/img/Profile-Icon.png";
  RegisterDate = new Date(0).toLocaleString();

  ngOnInit() {

     this.Service.ReturnUserData
      .subscribe((user) => {
       this.UserDisplayName = user?.adsoyad || "John Doe";
    if (user?.admin && user?.admin > 0) {
      this.IsAdmin.toString();
      this.IsAdmin = "(Admin)";
      this.AdminBool = true;
    } else {
      this.AdminBool = false;
    }
    this.UserDisplayName = user?.adsoyad + " "+ this.IsAdmin;
    this.RegisterDate = new Date((parseInt(user?.kaytarih || "0"))).toLocaleString();
    this.Mail = user?.mail || "john@mail.com";
    this.ProfileIMG = user?.profileimg || "assets/img/Sample_User_Icon.png";
    this.user = this.Service.auth!.currentUser!;

      });


  }
  UserLogoff(){
    var result = new Sonuc()
    result.islem = this.Service.LogoffUser()
    result.mesaj = "Çıkış Yapıldı."
    this.routing.navigate(['/login'])
   this.toast.ToastUygula(result);
  }
  redirectToAdminPage(){
    var IsAdmin = this.Authorization.checkAdmin();
    console.log(IsAdmin);
    if (IsAdmin) {
    this.routing.navigate(['/admin'])

    } else {
    this.routing.navigate(['/userpage'])

    }
  }
  CheckAdmin(){
  return this.Service.CheckAdmin();
  }
  UploadImage(event:any){
    var user =  this.Service.auth.currentUser;
    console.log(event.target.files[0])
    this.Service.uploadImage(event.target.files[0], 'product/profile/'+user?.uid).pipe(

    this.htoast.observe(
      {
        loading: 'image is being uploaded...',
        success: 'Image uploaded!',
        error: 'there was an error uploading your image.'
      }
    ),
    concatMap((photoURL) => this.Service.updateProfileData({ photoURL }))
    ).subscribe();
  }
}
