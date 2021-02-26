import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NavBar, RouterNavBarService } from '../../../services/router-nav-bar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() public eventoNav = new EventEmitter();
  navList:NavBar[];
  
  constructor(private serv : RouterNavBarService) { 
    this.navList=this.serv.navBarHome;
  }

  ngOnInit(): void {
  }

  funcionToggle(){
    this.eventoNav.emit();
  }

}
