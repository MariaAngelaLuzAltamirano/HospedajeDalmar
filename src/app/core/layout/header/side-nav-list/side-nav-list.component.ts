import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NavBar, RouterNavBarService } from '../router-nav-bar.service';

@Component({
  selector: 'app-side-nav-list',
  templateUrl: './side-nav-list.component.html',
  styleUrls: ['./side-nav-list.component.css']
})
export class SideNavListComponent implements OnInit {
  navList:NavBar[];

  @Output() public eventoNavBar = new EventEmitter();
  
  constructor(private serv : RouterNavBarService) { 
    this.navList=this.serv.navBarRutas;
  }

  ngOnInit(): void {
  }

  funcionClose(){
    this.eventoNavBar.emit();
  }
  
}
