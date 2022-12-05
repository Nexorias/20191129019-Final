import { ToastInput } from '../../models/ToastInput';
import { Sonuc } from '../../models/Sonuc';
import { Uye } from '../../models/Uye';
import { Router } from '@angular/router';
import { MytoastService } from '../../services/mytoast.service';
import { DataService } from 'src/app/services/data.service';
import { Component, OnInit } from '@angular/core';
import { Modal } from 'bootstrap';
import * as bootstrap from 'bootstrap';
import { FormGroup, FormControl } from '@angular/forms';
import { endWith } from 'rxjs';


@Component({
  selector: 'app-RealEstateModeration',
  templateUrl: './RealEstateModeration.component.html',
  styleUrls: ['./RealEstateModeration.component.scss']
})
export class RealEstateModerationComponent implements OnInit {
  Users!: Uye[];
  UserModal!: Modal;
  U_ModalName: string = "";
  ChosenUser!: Uye;
  sonuc: Sonuc = new Sonuc();
  ToastResult : ToastInput = new ToastInput();
  U_Form: FormGroup = new FormGroup({
    id      : new FormControl(),
    adsoyad : new FormControl(),
    mail    : new FormControl(),
    parola  : new FormControl(),
    admin   : new FormControl(),
    kaytarih: new FormControl(),
    duztarih: new FormControl()
  });
  constructor(
    public servis: DataService,
    public toast: MytoastService,
    public router: Router

  ) { }

  ngOnInit() {
    this.ListUsers();
  }
RouteToAdminSection(){
this.router.navigate(['/admin'])
}
RouteToHomeSection(){
    this.router.navigate(['/estatemoderation']);
  }

  //Users
  AddUserModal(el: HTMLElement) {
   if (this.CheckUnathorizedAccess()==false ) {return}

    this.U_Form.reset();
    this.UserModal = new bootstrap.Modal(el);
    this.U_ModalName = "Kullanıcı Ekle";
    this.UserModal.show();
  }
  EditUserModal(User: Uye, el: HTMLElement) {
   if (this.CheckUnathorizedAccess()==false ) {return}

    this.U_Form.patchValue(User);
    this.U_ModalName = "Kullanıcı Düzenle";
    this.UserModal   = new bootstrap.Modal(el);
    this.UserModal.show();
  }
  DeleteUserModal(User: Uye, el: HTMLElement) {
    if (this.CheckUnathorizedAccess()==false ) {return}

    this.ChosenUser = User;
    this.U_ModalName = "Kullanıcı Sil";
    this.UserModal = new bootstrap.Modal(el);
    this.UserModal.show();
  }

  ListUsers() {
    this.servis.UyeListele().subscribe(d => {
      this.Users = d;
    });
  }
  AdjustUsers() {
        if (this.CheckUnathorizedAccess()==false ) {return}
    var User: Uye = this.U_Form.value
    var date = new Date();
    if (!User.id) {
      var Filter = this.Users.filter(s => s.adsoyad == User.adsoyad);
      if (Filter.length > 0) {
        this.ToastResult.action = "warning";
        this.ToastResult.Msg = "Bu Kullanıcı zaten var!";
        this.toast.ToastOther(this.ToastResult);
      } else {
        User.kaytarih = date.getTime().toString();
        User.duztarih = date.getTime().toString();
        this.servis.UyeEkle(User).subscribe(d => {
          this.sonuc.islem = true;
          this.sonuc.mesaj = "Kullanıcı Eklendi";
          this.toast.ToastUygula(this.sonuc);
          this.ListUsers();
          this.UserModal.toggle();
        });
      }
    } else {
      User.duztarih = date.getTime().toString();
      this.servis.UyeDuzenle(User).subscribe(d => {
        this.sonuc.islem = true;
        this.sonuc.mesaj = "Kullanıcı Düzenlendi";
        this.toast.ToastUygula(this.sonuc);
        this.ListUsers();
        this.UserModal.toggle();
      });
    }

  }
  DeleteUser() {
    if (this.CheckUnathorizedAccess()==false ) {return}

    this.servis.UyeSil(this.ChosenUser.id).subscribe(d => {
      this.sonuc.islem = true;
      this.sonuc.mesaj = "User Silindi";
      this.toast.ToastUygula(this.sonuc);
      this.ListUsers();
      this.UserModal.toggle();
    });
  }
  CheckUnathorizedAccess(){
    if (this.servis.CheckAdmin() == false) {
     this.router.navigate(['/'])
     return false
    } else {
      return true
    }
  }
}
