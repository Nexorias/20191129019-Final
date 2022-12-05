import { DataService } from 'src/app/services/data.service';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    public servis: DataService
  ) {

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    var sonuc: boolean = false;
    if (this.servis.OturumKontrol()) {
      sonuc = true;
    } else {
      location.href = "/login";
    }
    return sonuc;
  }
  checkAdmin() {
    var IsAdmin = false;
    var User = this.servis.ReturnActiveUserData();
    console.log(User.admin)
    if (User.admin > 0) {
      IsAdmin = true;
    }
    return IsAdmin;
  }
}
