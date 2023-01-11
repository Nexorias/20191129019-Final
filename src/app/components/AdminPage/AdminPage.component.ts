import { LocationsModal } from './../../models/LocationsModal';
import { ToastInput } from './../../models/ToastInput';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Sonuc } from './../../models/Sonuc';
import { MytoastService } from './../../services/mytoast.service';
import { Kategori } from './../../models/Kategori';
import { DataService } from './../../services/data.service';
import { Modal } from 'bootstrap';
import * as bootstrap from 'bootstrap';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-AdminPage',
  templateUrl: './AdminPage.component.html',
  styleUrls: ['./AdminPage.component.scss']
})
export class AdminPageComponent implements OnInit {


  modal!: Modal;
  modalBaslik: string = "";
  sonuc: Sonuc = new Sonuc();
  ToastResult : ToastInput = new ToastInput();

  kategoriler!: Kategori[];
  secKat!: Kategori;
  frm: FormGroup = new FormGroup({
    id: new FormControl(),
    adi: new FormControl(),
    kaytarih: new FormControl(),
    duztarih: new FormControl(),
  });


  Locations!: LocationsModal[];
  ChosenLocation!: LocationsModal;
  LocationForm: FormGroup = new FormGroup({
    id      : new FormControl(),
    LocationName : new FormControl(),
    RegDate    : new FormControl(),
    EditDate  : new FormControl()
  });
  constructor(
    public servis: DataService,
    public toast: MytoastService,
    public router: Router
  ) { }

  ngOnInit() {
    //this.KategoriListele();
    this.ListLocations();
  }
  RouteToHomeSection(){
    this.router.navigate(['/usermoderation']);
  }
  RouteToProducts(){
    this.router.navigate(['/products']);
  }
  //Locations//
   Add(el: HTMLElement) {
    if (this.CheckUnathorizedAccess()==false ) {return}

    this.frm.reset();
    this.modal = new bootstrap.Modal(el);
    this.modalBaslik = "Bölge Ekle";
    this.modal.show();
  }
  Edit(Loc: LocationsModal, el: HTMLElement) {
    if (this.CheckUnathorizedAccess()==false ) {return}

    this.LocationForm.patchValue(Loc);
    console.log(Loc.id)
    this.modalBaslik = "Bölge Düzenle";
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }
  Delete(Loc: LocationsModal, el: HTMLElement) {
    if (this.CheckUnathorizedAccess()==false ) {return}

    this.ChosenLocation = Loc;
    this.modalBaslik = "Bölge Sil";
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }

  ListLocations() {
    this.servis.ListLocations().subscribe(d => {
      this.Locations = d;
    });
  }

  AdjustLocation() {
    if (this.CheckUnathorizedAccess()==false ) {return}

    var Loc: LocationsModal = this.LocationForm.value
    var tarih = new Date();
    if (!Loc.id) {
      var Filter = this.Locations.filter(s => s.LocationName == Loc.LocationName);
      if (Filter.length > 0) {
        this.sonuc.islem = false;
        this.sonuc.mesaj = "Girilen Bölge Kayıtlıdır!";
        this.toast.ToastUygula(this.sonuc);
      } else {
        Loc.RegDate = tarih.getTime().toString();
        Loc.EditDate = tarih.getTime().toString();

        this.servis.AddLocation(Loc)
          this.sonuc.islem = true;
          this.sonuc.mesaj = "Bölge Eklendi";
          this.toast.ToastUygula(this.sonuc);
          this.ListLocations();
          this.modal.toggle();

      }
    } else {
      Loc.EditDate = tarih.getTime().toString();
      this.servis.EditLocation(Loc)
        this.sonuc.islem = true;
        this.sonuc.mesaj = "Bölge Düzenlendi";
        this.toast.ToastUygula(this.sonuc);
        this.ListLocations();
        this.modal.toggle();
    }

  }
  DeleteLocation() {
    if (this.CheckUnathorizedAccess()==false ) {return}

    this.servis.DeleteLocationById(this.ChosenLocation.id)
      this.sonuc.islem = true;
      this.sonuc.mesaj = "Kategori Silindi";
      this.toast.ToastUygula(this.sonuc);
      this.ListLocations();
      this.modal.toggle();

  }
  CheckUnathorizedAccess(){ //to stop people from abusing admin commands via editing accessability by inspect element
    if (this.servis.CheckAdmin()) {
           return true
    } else {
      this.router.navigate(['/'])
     return false
    }
  }
//*locations end *//
/** Kategori
   Ekle(el: HTMLElement) {
    this.frm.reset();
    this.modal = new bootstrap.Modal(el);
    this.modalBaslik = "Kategori Ekle";
    this.modal.show();
  }
  Duzenle(kat: Kategori, el: HTMLElement) {
    this.frm.patchValue(kat);
    this.modalBaslik = "Kategori Düzenle";
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }
  Sil(kat: Kategori, el: HTMLElement) {
    this.secKat = kat;
    this.modalBaslik = "Kategori Sil";
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }

  KategoriListele() {
    this.servis.KategoriListele().subscribe(d => {
      this.kategoriler = d;
    });
  }
  KategoriEkleDuzenle() {
    var kat: Kategori = this.frm.value
    var tarih = new Date();
    if (!kat.id) {
      var filtre = this.kategoriler.filter(s => s.adi == kat.adi);
      if (filtre.length > 0) {
        this.sonuc.islem = false;
        this.sonuc.mesaj = "Girilen Kategori Kayıtlıdır!";
        this.toast.ToastUygula(this.sonuc);
      } else {
        kat.kaytarih = tarih.getTime().toString();
        kat.duztarih = tarih.getTime().toString();
        this.servis.KategoriEkle(kat).subscribe(d => {
          this.sonuc.islem = true;
          this.sonuc.mesaj = "Kategori Eklendi";
          this.toast.ToastUygula(this.sonuc);
          this.KategoriListele();
          this.modal.toggle();
        });
      }
    } else {
      kat.duztarih = tarih.getTime().toString();
      this.servis.KategoriDuzenle(kat).subscribe(d => {
        this.sonuc.islem = true;
        this.sonuc.mesaj = "Kategori Düzenlendi";
        this.toast.ToastUygula(this.sonuc);
        this.KategoriListele();
        this.modal.toggle();
      });
    }

  }
  KategoriSil() {
    this.servis.KategoriSil(this.secKat.id).subscribe(d => {
      this.sonuc.islem = true;
      this.sonuc.mesaj = "Kategori Silindi";
      this.toast.ToastUygula(this.sonuc);
      this.KategoriListele();
      this.modal.toggle();
    });
  } **/

}
