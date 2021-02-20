import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Modal3Component } from 'src/app/features/shared/modales/promociones/modal3.component';
import { PromocionesService } from 'src/app/services/promociones.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-promociones',
  templateUrl: './promociones.component.html',
  styleUrls: ['./promociones.component.css']
})
export class PromocionesComponent implements OnInit {
  modo: string;
  breakpoint: number;
  public promocionesData: any[];
  public database: string = 'promociones';

  constructor(private rutaAdm: ActivatedRoute, public dialog: MatDialog, private services: PromocionesService) {
      this.modo = 'normal'
   }

  ngOnInit(){
    this.rutaAdm.data.subscribe(data =>{
      this.modo = data['modo']|| this.modo;
    });
    this.breakpoint = (window.innerWidth <= 768) ? 1 : 3;
    this.getPromociones().then((data) =>{
      console.log(data);
      this.promocionesData = data;
    })
    this.detectarCambio();
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 768) ? 1 : 3;
  }

  async getPromociones(){
    const result = await this.services.getAll();
    let array= Object.values(result);
    let arrayNuevo = this.agregarId(array, result);
    let arrayFinal = arrayNuevo.filter(this.filtrarPorEstado);
    return arrayFinal;
  }

  
  filtrarPorEstado(obj) {
    if(obj.estado == true){
      return obj;
    }
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
        width:"500px",
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
      window.open(`https://wa.me/+5493513099197?text=Hola%20Hospedaje%20Dalmar,%20me%20gustaría%20saber%20disponibilidad%20de%20la%20promo%20${nombre}`, "_blank");
    }
  

}
