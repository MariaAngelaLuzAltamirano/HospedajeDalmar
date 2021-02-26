import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingScreenService } from 'src/app/services/loading-screen.service';
import { ProductosService } from 'src/app/services/productos.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-editar-prod',
  templateUrl: './editar-prod.component.html',
  styleUrls: ['./editar-prod.component.css']
})
export class EditarProdComponent implements OnInit {

  @Input() card: any;

  public CardEdit = new FormGroup({
    nombre: new FormControl('', Validators.required),
    capacidad: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    valorPorNoche: new FormControl('', Validators.required),
    servicios: new FormControl('', Validators.required),
  })

  constructor(private service: ProductosService, private services: LoadingScreenService) { }

  ngOnInit(): void {
    this.initValuesForm();
  }

  private initValuesForm() {
    this.CardEdit.patchValue({
      nombre: this.card.nombre,
      capacidad: this.card.capacidad,
      descripcion: this.card.descripcion,
      valorPorNoche: this.card.valorPorNoche,
      servicios: this.card.servicios
    });
  }

  nuevoObj() {
    let imagenes = {};
    this.card.imgs.forEach((e) => {
      imagenes[e.id] = {
        ...e
      };
    });
    const obj = {
      ...this.CardEdit.value,
      estado: true,
      imgs: imagenes
    }
    return obj
  }


  editCard(){
    this.services.startLoading();
    this.nuevoObj();
    this.service.updateProd(this.card.id, this.nuevoObj()).then((res) =>{
      if(res){
        this.services.hideLoading();
        Swal.fire(
          'Editado!',
          'El producto se ha editado exitosamente',
          'success')
      }
    })
  }

}
