import { ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnDestroy {

  mobileQuery: MediaQueryList;
  shouldRun = true;

  fillerNav = [
    {id: 1, title: "HOME", link: "home", icon: "home"},
    {id: 2, title: "HABITACIONES", link: "productos", icon: "hotel"},
    {id: 3, title: "PROMOCIONES", link: "promociones", icon: "monetization_on"},
    {id: 4, title: "COVID-19", link: "covid", icon: "coronavirus"},
    {id: 5, title: "MENSAJES", link: "contactos", icon: "contact_mail"},
  ]      

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private service: AuthService, private router: Router) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  
  onLogout(){
    this.service.logout();
    this.router.navigate(['login']);
  }

}
