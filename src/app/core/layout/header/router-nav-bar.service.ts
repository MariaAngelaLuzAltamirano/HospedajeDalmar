import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RouterNavBarService {

  constructor() { 
    this.navList = [
      {id: 1, title: "HOME", link: "home", icon: "home"},
      {id: 2, title: "HABITACIONES", link: "productos", icon: "hotel"},
      {id: 3, title: "PROMOCIONES", link: "promociones", icon: "monetization_on"},
      {id: 4, title: "COVID-19", link: "covid", icon: "coronavirus"},
      {id: 5, title: "LOGIN ADMIN", link: "login", icon: "admin_panel_settings"},
      //contacts agregar
    ]

  }
 

  get navBarRutas() : NavBar[] {
    return this.navList;
  }
  
  navList:NavBar[];
}

export interface NavBar{
  id: number, title: string, link: string, icon: string;

}