import { AuthGuard } from '../../services/auth.guard';
import { Router } from '@angular/router';
import { MytoastService } from '../../services/mytoast.service';
import { DataService } from '../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { Sonuc } from 'src/app/models/Sonuc';
import { variable } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-userpage',
  templateUrl: './userpage.component.html',
  styleUrls: ['./userpage.component.scss',]
})
export class UserpageComponent implements OnInit {

  constructor(public Service:DataService, public toast: MytoastService,public routing:Router, public Authorization : AuthGuard) { }
  UserDisplayName = '';
  IsAdmin = '';
  AdminBool: boolean = false;
  Mail = '';
  RegisterDate = new Date(0).toLocaleString();

  ngOnInit() {
    var UserData = this.Service.ReturnUserData();
    this.UserDisplayName = UserData.UserName;
    if (UserData.IsAdmin > 0) {
      this.IsAdmin.toString();
      this.IsAdmin = "(Admin)";
      this.AdminBool = true;
    } else {
      this.AdminBool = false;
    }
    this.UserDisplayName = UserData.UserName + " "+ this.IsAdmin;
    this.RegisterDate = new Date((parseInt(UserData.RegisterationDate))).toLocaleString();
    this.Mail = UserData.Mail;

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
    if (IsAdmin) {
    this.routing.navigate(['/admin'])

    } else {
    this.routing.navigate(['/userpage'])

    }
  }
  CheckAdmin(){
  return this.Authorization.checkAdmin();
  }

}
