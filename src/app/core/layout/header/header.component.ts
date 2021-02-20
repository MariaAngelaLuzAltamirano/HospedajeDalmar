import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NavBar, RouterNavBarService } from './router-nav-bar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() public eventoNav = new EventEmitter();

  constructor(private serv : RouterNavBarService) { 
    this.navList=this.serv.navBarRutas;
  }

  ngOnInit(): void {
  }

  funcionToggle(){
    this.eventoNav.emit();
  }
  navList:NavBar[];
}
