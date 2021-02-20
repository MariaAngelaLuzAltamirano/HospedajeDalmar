import { Component} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // title = 'proyAngularDalmar';
  // subscription: Subscription;
  // showHeader : boolean;
  // showFooter : boolean;
  // showNavBar : boolean;
  constructor(private router : Router, private activatedRoute : ActivatedRoute) {
    // this.subscription = router.events.subscribe(event =>{
    //    if(event instanceof NavigationEnd){
    //      const {showHeader = true, showFooter = true, showNavBar = true} = this.activatedRoute.firstChild.snapshot.data;
    //      this.showHeader = showHeader;
    //      this.showFooter = showFooter;
    //     //  this.showNavBar = showNavBar;
    //    }
    // })
  }

}
