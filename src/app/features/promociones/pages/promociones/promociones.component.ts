import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Modal3Component } from 'src/app/features/shared/modales/promociones/modal3.component';
import { Promociones } from 'src/app/interfaces/promociones';
import { LoadingScreenService } from 'src/app/services/loading-screen.service';
import { PromocionesService } from 'src/app/services/promociones.service';
import { UtilsService } from 'src/app/services/utils.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-promociones',
  templateUrl: './promociones.component.html',
  styleUrls: ['./promociones.component.css']
})
export class PromocionesComponent implements OnInit {
  modo: string;
  breakpoint: number;
  public promocionesData: Promociones[];
  public database: string = 'promociones';

  constructor(public rutaAdm: ActivatedRoute, public dialog: MatDialog, public services: PromocionesService, public service: LoadingScreenService, public utils: UtilsService) {
    this.service.startLoading();
    this.modo = 'normal'
  }

  ngOnInit(){
    this.rutaAdm.data.subscribe(data =>{
      this.modo = data['modo']|| this.modo;
    });
    this.getPromociones().then((data) =>{
      this.promocionesData = data;
      this.service.hideLoading();
    })
    this.detectarCambio();
    window.scrollTo(0,0);
  }

  async getPromociones(): Promise<Promociones[]>{
    const result = await this.services.getAll();
    let array= Object.values(result);
    let arrayNuevo = this.utils.agregarId(array, result);
    let arrayFinal = arrayNuevo.filter(this.utils.filtrarPorEstado);
    return arrayFinal;
  }

  detectarCambio(){
    const refProd = this.services.afDB.database.ref(`${this.database}`);
    refProd.on('value', (data) => {
      if(data){
        this.getPromociones().then((res) =>{
           this.promocionesData = res;
         });
      }
    });
  }


  //funciones del html
  editarCard(e){
    this.openDialog(e);
  }

  newCard(){
    this.openDialog();
  }

  openDialog(info?): void{
    const dialogRef = this.dialog.open(Modal3Component, {
      width:"100%",
      data: {
        info,
        message: info? 'Editar Card' : 'Nueva Card',
      },
    });
    dialogRef.afterClosed().subscribe(() => {});
  }

  borrarCard({id, nombre, capacidad, descripcion, imagen}){
    Swal.fire({
      title: '¿Estas seguro de borrar este producto?',
      text: "No podras revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {
        this.services.updatePromo(id, {nombre, capacidad, descripcion, imagen, estado: false}).then(() =>{
          this.getPromociones().then((res) =>{
            this.promocionesData = res;
          });
          Swal.fire(
          'Borrado!',
          'El mensaje ha sido eliminado',
          'success')
        })

      }
    })
  }

  enviarWA({nombre}){
    window.open(`https://wa.me/+5493513268151?text=Hola%20Hospedaje%20Dalmar,%20me%20gustaría%20saber%20disponibilidad%20de%20la%20promo%20${nombre}`, "_blank");
  }
  

}
