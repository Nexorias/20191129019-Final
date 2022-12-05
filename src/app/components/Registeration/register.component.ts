import { ToastInput } from '../../models/ToastInput';
import { Sonuc } from '../../models/Sonuc';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { MytoastService } from '../../services/mytoast.service';
import { Uye } from '../../models/Uye';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(public dataServis: DataService, public toast: MytoastService, public router: Router) { }

  ngOnInit() {}
  kayitOl(Mail:string, pass:string, passCheck:string, username:string){
    var Validity = this.CheckValidityOfForm(Mail,pass,passCheck,username);
    if (Validity == false) {return;} //Form is not filled properly

    if (pass == passCheck) {
    var NewUser = new Uye();
    NewUser.adsoyad = username;
    NewUser.admin = 0;
    var Time = Date.now();
    NewUser.duztarih = Time.toString();
    NewUser.kaytarih = Time.toString();
    console.log(Time.toString());
    NewUser.mail = Mail;
    NewUser.parola = pass;
    var result: Sonuc = new Sonuc();
     this.dataServis.UyeEkle(NewUser).subscribe(d => {
          result.islem = true;
          result.mesaj = "Hesap Oluşturuldu! Lütfen Giriş Yapınız!";
          this.toast.ToastUygula(result);
        });
    this.router.navigate(['/login'])
    } else{
    var result: Sonuc = new Sonuc();
    result.islem = false;
    result.mesaj = "Parola uyuşmuyor!";
    this.toast.ToastUygula(result);

    }


  }
  returnLogin(){
    this.router.navigate(['/login'])
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

