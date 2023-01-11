import { ToastInput } from './../models/ToastInput';
import { HotToastModule, HotToastService } from '@ngneat/hot-toast';
import { Sonuc } from '../models/Sonuc';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MytoastService {

  constructor(
    private toast: HotToastService

  ) { }
  ToastUygula(sonuc: Sonuc) {

    if (sonuc.islem) {
      this.toast.success(sonuc.mesaj, {
        style: {
          border: '1px solid #0e7309',
          padding: '16px',
          color: '#0e7309',
        }
      });
    } else {
      this.toast.error(sonuc.mesaj, {
        style: {
          border: '1px solid #a30505',
          padding: '16px',
          color: '#a30505',
        }
      });
    }
  }
  ToastOther(Result: ToastInput){

    switch(Result.action){
      case "info":
        this.toast.info(Result.Msg, {
        style: {
          border: '1px solid #74A5F2',
          padding: '16px',
          color: '#74A5F2',
        }});
      break
      case "warning":
        this.toast.warning(Result.Msg, {
        style: {
          border: '1px solid #B58C05',
          padding: '16px',
          color: '#B58C05',
        }});
    }


  }

  returnErrorResponse(returningError:string){

    if (returningError.includes("invalid-email")){
      return "Geçersiz E-mail."
    } else if (returningError.includes("weak-password")){
      return "Şifre en az 6 karakter içermelidir!"
    } else if (returningError.includes("email-already-in-use")){
      return "Bu e-mail zaten kullanımdadır!"
    } else if (returningError.includes("wrong-password")){
      return "Şifre Geçersizdir."
    }
    return "Hata: " + returningError
  }
}
