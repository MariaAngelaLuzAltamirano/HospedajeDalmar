import { Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modales/carrusel/modal.component';
import { LoadingScreenService } from 'src/app/services/loading-screen.service';
import { Carousel } from 'src/app/interfaces/carousel';



@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})


export class CarouselComponent implements OnInit,  OnChanges{
  modo: string;
   /**
   * Custom Properties
   */
  @Input() height : number;
  @Input() items: Carousel[];
  @Input() database: string;
  @Input() carpeta: string;
  @Input() id?: string;

  /**
   * Final Properties
   */
  public finalHeight: string | number = 0;
  public currentPosition = 0;

  constructor(private rutaAdm: ActivatedRoute, public dialog: MatDialog, private services: LoadingScreenService) {
    this.services.startLoading(); 
    this.modo = this.modo || 'normal';
    this.items= [];
  }

  ngOnInit(){
    this.rutaAdm.data.subscribe(data =>{
      this.modo = data['modo']|| this.modo;
    });
    this.finalHeight = this.height ? `${this.height}px` : '100vh' ;
    this.mapeoItems();
    this.services.hideLoading();
  }

  mapeoItems(){
    setTimeout(() =>{
    this.items.map( ( i, index ) => {
    i.posicion = index;
    i.marginLeft = 0;
    });
    }, 2000)
  } //ver como hacer con esto

 

  setCurrentPosition(position: number) {
    this.currentPosition = position;
    this.items.find(i => i.posicion === 0).marginLeft = -100 * position;
  }

  setNext() {
    let finalPercentage = 0;
    let nextPosition = this.currentPosition + 1;
    if (nextPosition <= this.items.length - 1) {
      finalPercentage = -100 * nextPosition;
    } else {
      nextPosition = 0;
    }
    this.items.find(i => i.posicion === 0).marginLeft = finalPercentage;
    this.currentPosition = nextPosition;
  }


  setBack() {
    let finalPercentage = 0;
    let backPosition = this.currentPosition  - 1;
    if (backPosition >= 0) {
      finalPercentage = -100 * backPosition;
    } else {
      backPosition = this.items.length - 1;
      finalPercentage = -100 * backPosition;
    }
    this.items.find(i => i.posicion === 0).marginLeft = finalPercentage;
    this.currentPosition = backPosition;

  }

  subirImagen(){
    this.openDialog();
  }

  eliminarImagen(datos){
    this.openDialog(datos)
  }

  openDialog(info?): void{
    const dialogRef = this.dialog.open(ModalComponent, {
      width:"100%",
      data: {
        info,
        database :this.database,
        carpeta: this.carpeta,
        id: this.id,
        message: info? 'Eliminar Imagen' : 'Nueva Imagen',
      },
    });
    dialogRef.afterClosed().subscribe(() => {
      // this.services.startLoading();
      // setTimeout(() =>{
      //   this.services.hideLoading();
      // }, 1000)
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.items.currentValue != changes.items.previousValue){
      this.mapeoItems();
    }
  }

}
