import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingScreenService } from 'src/app/services/loading-screen.service';
import { ProductosService } from 'src/app/services/productos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-prod',
  templateUrl: './new-prod.component.html',
  styleUrls: ['./new-prod.component.css']
})
export class NewProdComponent implements OnInit {

  public CardUp = new FormGroup({
    nombre: new FormControl('', Validators.required),
    capacidad: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    valorPorNoche: new FormControl('', Validators.required),
    servicios: new FormControl('', Validators.required),
  })

  constructor(private service: ProductosService, private services: LoadingScreenService) { }

  ngOnInit(): void {
  }

  onUpload(){
    this.services.startLoading();
    const objPost = {
      ...this.CardUp.value,
      imgs: {
        0:{
          estado: false,
          urlImg: "blabla"
        }
      },
      estado: true
    };
    this.service.postProd(objPost).then((data) =>{
      if(data){
        this.services.hideLoading();
        Swal.fire(
        'Agregado!',
        'El producto se ha subido exitosamente',
        'success')
      }
    });
  }

}
