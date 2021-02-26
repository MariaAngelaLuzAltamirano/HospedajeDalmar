import { ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { RouterNavBarService, NavBar } from 'src/app/services/router-nav-bar.service';


@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnDestroy {

  mobileQuery: MediaQueryList;
  shouldRun = true;
  fillerNav:NavBar[];

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, public service: AuthService, public router: Router, public serv : RouterNavBarService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.fillerNav=this.serv.navBarAdmin;
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  
  onLogout(){
    this.service.logout();
    localStorage.clear();
    this.router.navigate(['login']);
  }

}
