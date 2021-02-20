import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CaruoselService } from 'src/app/services/caruosel.service';
import { ProductosService } from 'src/app/services/productos.service';

declare let $: any;

export interface ICarouselItem {
  id?: number;
  urlImge: string;
  estado: boolean;
  marginLeft?: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  public carouselData: ICarouselItem[];
  public heightHome: number;
  public databaseHome: string = 'imagenesCarrusel';
  public carpetaHome: string = 'ImagenesCarrusel';
  public productosData: any[];
  public databaseProd: string = 'productos';
  modo: string;

  

  constructor(private rutaAdm: ActivatedRoute, private service: CaruoselService, private serv: ProductosService ) { 
    this.modo = 'normal';
    this.detectarCambioImg();
    this.detectarCambio();
  }

  async ngOnInit(){
    this.rutaAdm.data.subscribe(data =>{
      this.modo = data['modo']|| this.modo;
    })
    this.carouselData = await this.getImgCarrusel();
    this.productosData = await this.getProductos();
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
    let arrayFinal = arrayNuevo.filter(this.filtrarPorEstado);
    return arrayFinal;
  }


  filtrarPorEstado(obj) {
    if(obj.estado == true){
      return obj;
    }
  }


  detectarCambioImg(){
    const refImg = this.service.afDB.database.ref(`${this.databaseHome}`)
    refImg.on('value', (data) => {
      if(data){
        this.getImgCarrusel().then((res) =>{
          this.carouselData = res;
        });
      }
    });
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

  async getProductos(){
    const result = await this.serv.getAll();
    let array= Object.values(result);
    let arrayNuevo = this.agregarId(array, result);
    let arrayProd = arrayNuevo.filter(this.filtrarPorEstado);
    let arrayFinal = arrayProd.map((e) =>{
      let arrayImg = Object.values(e.imgs);
      let arrayImgId = this.agregarId(arrayImg, e.imgs);
      e.imgs = arrayImgId.filter(this.filtrarPorEstado);
      e.servicios = this.filterResult(e.servicios);
      return e;
    });
    return arrayFinal;
  }



  filterResult(elements: any[]) {
   const resultado = elements.filter((element) => element != null);
   return resultado;
  }

  agregarId(arrayNuevo, result){
    let i = 0;  
    for (let id in result){
      if(i < arrayNuevo.length){
        arrayNuevo[i]= ({'id': id, ...arrayNuevo[i]});
        i = i+1;
      }
    };
    return arrayNuevo;
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
  }

}
