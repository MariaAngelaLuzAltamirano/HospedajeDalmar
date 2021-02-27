import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Modal4Component } from 'src/app/features/shared/modales/home/modal4.component';
import { Carousel } from 'src/app/interfaces/carousel';
import { Home } from 'src/app/interfaces/home';
import { Producto } from 'src/app/interfaces/productos';
import { CaruoselService } from 'src/app/services/caruosel.service';
import { LoadingScreenService } from 'src/app/services/loading-screen.service';
import { ProductosService } from 'src/app/services/productos.service';
import { UtilsService } from 'src/app/services/utils.service';

declare let $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  public carouselData: Carousel[];
  public heightHome: number;
  public databaseHome: string = 'imagenesCarrusel';
  public carpetaHome: string = 'ImagenesCarrusel';
  public productosData: Producto[];
  public databaseProd: string = 'productos';
  public database: string = 'home';
  public homeData: Home[];

  modo: string;

  constructor(public rutaAdm: ActivatedRoute, public service: CaruoselService, public serv: ProductosService, public services: LoadingScreenService, public dialog: MatDialog,
    public utils: UtilsService ) { 
    this.services.startLoading();
    this.modo = 'normal';
    this.detectarCambio();
  }

  async ngOnInit(){
    this.rutaAdm.data.subscribe(data =>{
      this.modo = data['modo']|| this.modo;
    })
    this.carouselData = await this.getImgCarrusel();
    this.productosData = await this.getProductos();
    this.homeData = await this.getHome();
    window.scrollTo(0,0);
    this.services.hideLoading();
  }

  async getImgCarrusel(){
    const result = await this.service.getImg(this.databaseHome);
    let arrayNuevo= Object.values(result);
    let i = 0;  
    for (let id in result){
      if(i < arrayNuevo.length){
        arrayNuevo[i]= ({'id': id, ...arrayNuevo[i]});
        i = i+1;
      }
    };
    let arrayFinal = arrayNuevo.filter(this.utils.filtrarPorEstado);
    return arrayFinal;
  }

  ngAfterViewInit(){
    setTimeout(()=>{
          $('.owl-carousel').owlCarousel({
      loop: true,
      autoplay: true,
      autoplayTimeout: 6000,
      margin:5,
      nav: false,
      responsive:{
        0:{
            items:1
        },
        600:{
            items:2
        },
        1000:{
            items:3
        }
      }
    })
    }, 2000)
  }

  async getProductos(): Promise<Producto[]>{
    const result = await this.serv.getAll();
    let array= Object.values(result);
    let arrayNuevo = this.utils.agregarId(array, result);
    let arrayProd = arrayNuevo.filter(this.utils.filtrarPorEstado);
    let arrayFinal = arrayProd.map((e) =>{
      let arrayImg = Object.values(e.imgs);
      let arrayImgId = this.utils.agregarId(arrayImg, e.imgs);
      e.imgs = arrayImgId.filter(this.utils.filtrarPorEstado);
      e.servicios = this.utils.filterResult(e.servicios);
      return e;
    });
    return arrayFinal;
  }


  detectarCambio(){
    const refProd = this.service.afDB.database.ref(`${this.databaseProd}`);
    refProd.on('value', (data) => {
      if(data){
        this.getProductos().then((res) =>{
           this.productosData = res;
         });
      }
    });
    const refHome = this.service.afDB.database.ref(`${this.database}`);
    refHome.on('value', (data) => {
      if(data){
        this.getHome().then((res) =>{
           this.homeData = res;
         });
      }
    });
    const refImg = this.service.afDB.database.ref(`${this.databaseHome}`)
    refImg.on('value', (data) => {
      if(data){
        this.getImgCarrusel().then((res) =>{
          this.carouselData = res;
        });
      }
    });
  }

  editarCard(e){
    this.openDialog(e);
  }
    
  openDialog(info): void{
    const dialogRef = this.dialog.open(Modal4Component, {
      width:"100%",
      data: {
        info,
        message:'Editar Card',
      }
    });
    dialogRef.afterClosed().subscribe(() => {});
  }

  async getHome(): Promise<Home[]>{
    const result = await this.service.getImg(this.database);
    let array= Object.values(result);
    let arrayNuevo = this.utils.filterResult(array);
    let arrayHome = this.utils.agregarId(arrayNuevo, result);
    return arrayHome;
  }

}
