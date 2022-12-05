import { Router, RouterModule } from '@angular/router';
import { Sonuc } from '../../models/Sonuc';
import { MytoastService } from '../../services/mytoast.service';
import { Uye } from '../../models/Uye';
import { DataService } from 'src/app/services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  constructor(public dataServis: DataService, public toast: MytoastService, public router: Router) {}

  ngOnInit() {}
  OturumAc(mail: string, parola: string) {
    this.dataServis.OturumAc(mail, parola).subscribe((d) => {
      if (d.length > 0) {
        var result: Sonuc = new Sonuc();
        result.islem = true;
        result.mesaj = "Giriş yapıldı!";
        this.toast.ToastUygula(result);
        var kayit: Uye = d[0];
        this.router.navigate(['/'])
        localStorage.setItem('adsoyad', kayit.adsoyad);
        localStorage.setItem('admin', kayit.admin.toString());
        localStorage.setItem('mail', kayit.mail);
        localStorage.setItem('registeration',kayit.kaytarih)
      } else {
        var s: Sonuc = new Sonuc();
        s.islem = false;
        s.mesaj = 'E-Posta Adresi veya Parola Geçersizdir!';
        this.toast.ToastUygula(s);
      }

    });
  }
   directToRegister(){
    this.router.navigate(['/register'])
  }
  CheckLogin(){
    if (this.dataServis.OturumKontrol()){
    this.router.navigate(['/userpage'])
    }
  }
}
