import { MytoastService } from './services/mytoast.service';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { DataService } from 'src/app/services/data.service';
import { Component, OnInit } from '@angular/core';
import { Uye } from './models/Uye';
import { switchMap } from 'rxjs';
import { error } from 'console';


@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']

})
export class AppComponent implements OnInit {
  constructor(
    public servis: DataService,
    public router: Router,
    public htoast: HotToastService,
    public toast: MytoastService
  ) { }
  ngOnInit(): void {
  }
  OturumKapat() {
    localStorage.clear();
    location.href = "/";
  }
 
}
