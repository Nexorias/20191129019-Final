import { ToastInput } from './../../models/ToastInput';
import { Sonuc } from '../../models/Sonuc';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { MytoastService } from '../../services/mytoast.service';
import { HotToastService } from '@ngneat/hot-toast';
import { Uye } from '../../models/Uye';
import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  Users!: Uye[];

  constructor(public dataServis: DataService, public toast: MytoastService, public router: Router,   public htoast: HotToastService,) { }

  ngOnInit() {}

   ListUsers() {
    this.dataServis.UyeListele().subscribe(d => {
      this.Users = d;
    });
  }
  kayitOl(Mail:string, pass:string, passCheck:string, username:string){
    var Validity = this.CheckValidityOfForm(Mail,pass,passCheck,username);
    if (Validity == false) {return;} //Form is not filled properly
    if (pass == passCheck) {
    var NewUser = new Uye();
    NewUser.adsoyad = username;
    NewUser.mail = Mail;
    var Time = Date.now();
     this.dataServis.
      Register(Mail, pass)
      .pipe(
        switchMap(({ user: { uid } }) =>
          this.dataServis.UyeEkle({
            id : uid,
            mail: Mail,
            adsoyad: username,
            parola: pass,
            admin: 0,
            kaytarih: Time.toString(),
            duztarih: Time.toString()

          })
        ),
         this.htoast.observe({
        loading: 'Kayıt işlemi gerçekleştiriliyor lütfen bekleyiniz.',
        success: (s) => "Hesap Oluşturuldu! Lütfen Giriş Yapınız!",
        error: ({ message }) => this.returnErrorResponse(message),
        })

      )
      .subscribe(() => {
        this.router.navigate(['/login']);
      });
    } else {
      this.toast.ToastOther({action: "warning", Msg: "Şifreler uyuşmuyor!",Loading: "..."})
    }
  }

  returnLogin(){
    this.router.navigate(['/login'])
  }

  returnErrorResponse(returningError:string){

    if (returningError.includes("invalid-email")){
      return "Geçersiz E-mail."
    } else if (returningError.includes("weak-password")){
      return "Şifre en az 6 karakter içermelidir!"
    } else if (returningError.includes("email-already-in-use")){
      return "Bu e-mail zaten kullanımdadır!"
    }
    return "Hata: " + returningError
  }

  CheckValidityOfForm(Mail:string, pass:string, passCheck:string, username:string) {
  let Items: string[] = [Mail,pass,passCheck,username]
  for (var val of Items){
    if (val == "" || val == " ") {
      var ValidationReturn = new ToastInput();
      ValidationReturn.Msg = "Lütfen tüm alanları doldurunuz.";
      ValidationReturn.action = "warning";
      this.toast.ToastOther(ValidationReturn);
      return false
    }
  }
  for (var val of Items){
    if (val.length < 3) {
      var ValidationReturn = new ToastInput();
      ValidationReturn.Msg = "Bilgiler en az 3 karakter içermelidir.";
      ValidationReturn.action = "warning";
      this.toast.ToastOther(ValidationReturn);
      return false
    }
  }
  return true
}

}

