import { HotToastService } from '@ngneat/hot-toast';
import { Router, RouterModule } from '@angular/router';
import { MytoastService } from '../../services/mytoast.service';

import { DataService } from 'src/app/services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  constructor(public htoast: HotToastService, public dataServis: DataService, public toast: MytoastService, public router: Router) {}

  ngOnInit() {


  }
  OturumAc(mail: string, parola: string) {
    this.dataServis.login(mail, parola)
      .pipe(
        this.htoast.observe({
          success: 'Oturum Açıldı',
          loading: 'Oturum Açılıyor...',
          error: ({ message }) => this.toast.returnErrorResponse(message)
        })
      )
      .subscribe(() => {
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
