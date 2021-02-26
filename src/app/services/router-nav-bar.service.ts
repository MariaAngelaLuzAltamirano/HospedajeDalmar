import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RouterNavBarService {
  
  navList:NavBar[];
  fillerNav:NavBar[];

  constructor() { 
    this.navList = [
      {id: 1, title: "HOME", link: "home", icon: "home"},
      {id: 2, title: "HABITACIONES", link: "productos", icon: "hotel"},
      {id: 3, title: "PROMOCIONES", link: "promociones", icon: "monetization_on"},
      {id: 4, title: "COVID-19", link: "covid", icon: "coronavirus"},
      {id: 5, title: "LOGIN ADMIN", link: "login", icon: "admin_panel_settings"},
    ]
    this.fillerNav = [
      {id: 1, title: "HOME", link: "home", icon: "home"},
      {id: 2, title: "HABITACIONES", link: "productos", icon: "hotel"},
      {id: 3, title: "PROMOCIONES", link: "promociones", icon: "monetization_on"},
      {id: 4, title: "COVID-19", link: "covid", icon: "coronavirus"},
      {id: 5, title: "MENSAJES", link: "contactos", icon: "contact_mail"},
    ]      

  }

  get navBarHome() : NavBar[] {
    return this.navList;
  }
  get navBarAdmin() : NavBar[] {
    return this.fillerNav;
  }
  

}

export interface NavBar{
  id: number, title: string, link: string, icon: string;

}