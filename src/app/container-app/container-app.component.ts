import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-container-app',
  templateUrl: './container-app.component.html',
  styleUrls: ['./container-app.component.css']
})
export class ContainerAppComponent{

  subscription: Subscription;
  showHeader : boolean;
  showFooter : boolean;

  constructor(private router : Router, private activatedRoute : ActivatedRoute) {
    this.subscription = router.events.subscribe(event =>{
       if(event instanceof NavigationEnd){
         const {showHeader = true, showFooter = true} = this.activatedRoute.firstChild.snapshot.data;
         this.showHeader = showHeader;
         this.showFooter = showFooter;
       }
    })
  }
}
