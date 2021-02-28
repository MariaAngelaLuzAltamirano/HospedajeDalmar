import { Component, OnInit} from '@angular/core';
import { ProductosService } from './../../../../services/productos.service';
import { Producto, ProductoHTML } from './../../../../interfaces/productos'
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { Modal2Component } from 'src/app/features/shared/modales/productos/modal2.component';
import { LoadingScreenService } from 'src/app/services/loading-screen.service';
import { UtilsService } from 'src/app/services/utils.service';

interface Personas {
  value: string;
}

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  public productosData: Producto[];
  public databaseProd: string = 'productos';
  public carpetaProd: string = 'ImagenesProductos';

  formDate: FormGroup;
  productos: ProductoHTML[];
  productosNuevo: ProductoHTML[];
  modo: string;


  adultos: Personas[] = [
    {value: '2'},
    {value: '3'},
    {value: '4'},
    {value: '5'}
  ];

  ninos: Personas[] = [
    {value: '0'},
    {value: '1'},
    {value: '2'},
    {value: '3'},
  ];


  constructor(public service: ProductosService, public rutaAdm: ActivatedRoute, public fb: FormBuilder, public dialog: MatDialog, public services: LoadingScreenService, public utils: UtilsService) {
    this.modo = 'normal';
    this.detectarCambio();
    this.productos = [];
    this.productosNuevo = [];
  }

  ngOnInit(){
    this.services.startLoading();
    this.formDate = this.fb.group({
      range : new FormGroup({
        start: new FormControl('', Validators.required),
        end: new FormControl('', Validators.required)
      }),
      adulto : new FormControl('', Validators.required),
      nino : new FormControl('', Validators.required)
    })

    this.rutaAdm.data.subscribe(data =>{
      this.modo = data['modo']|| this.modo;
    })

    this.getProductos().then((data) =>{
      this.productosData = data;
      this.productos.length = 0;
      this.productosData.forEach((e)=>{
        this.productos.push({
          form: this.fb.group({
            range : new FormGroup({
              start: new FormControl('', Validators.required),
              end: new FormControl('', Validators.required)
            }),
            adulto : new FormControl('', Validators.required),
            nino : new FormControl('', Validators.required)
          }),
          producto: e,
        })
      })
      this.services.hideLoading(); 
    })
    window.scrollTo(0,0);


    //ejemplo de change en un form reactive

    // this.formControls.adulto.valueChanges.subscribe(data=>{
    //   console.log(data);
      
    // })
    // this.rangeControls.start.valueChanges.subscribe(data=>{
    //   let fechadeInicio :Moment = data;
    //   console.log(fechadeInicio);
      
    // })
    // this.rangeControls.end.valueChanges.subscribe(data=>{
    //   let fechadesalida :Moment = data;
    //   console.log(fechadesalida);
      
    // })
    
  }
  // get formControls (){
  //   return this.formDate.controls;
  // }
  // get rangeControls() : {[key:string]: AbstractControl}
  // {
  //   return this.formControls.range['controls'];
  // }
  
  async getProductos(): Promise<Producto[]>{
    const result = await this.service.getAll();
    let array= Object.values(result);
    let arrayNuevo = this.utils.agregarId(array, result);
    let arrayProd = arrayNuevo.filter(this.utils.filtrarPorEstado);
    let arrayFinal = arrayProd.map((e) =>{
      let arrayImg = Object.values(e.imgs);
      let arrayImgId = this.utils.agregarId(arrayImg, e.imgs);
      e.imgs = arrayImgId.filter(this.utils.filtrarPorEstado);
      let servicios = this.utils.filterResult(e.servicios);
      e.servicios = this.idsServicio(servicios);
      return e;
    });
    return arrayFinal;
  }

  idsServicio(serv){
    let arrayNuevo = [];
    serv.forEach(element => {
      if(element === "bed"){
        const servicio = {
          nombre: "Cama",
          item: element
        };
        arrayNuevo.push(servicio);
      }
      if(element === "bathtub"){
        const servicio = {
          nombre: "Baño priv.",
          item: element
        };
        arrayNuevo.push(servicio);
      }
      if(element === "countertops"){
        const servicio = {
          nombre: "Cocina",
          item: element
        };
        arrayNuevo.push(servicio);
      }
      if(element === "garage"){
        const servicio = {
          nombre: "Cochera",
          item: element
        };
        arrayNuevo.push(servicio);
      }
      if(element === "tv"){
        const servicio = {
          nombre: "Televisión",
          item: element
        };
        arrayNuevo.push(servicio);
      }
      if(element === "wifi"){
        const servicio = {
          nombre: "Internet",
          item: element
        };
        arrayNuevo.push(servicio);
      }
      if(element === "phone"){
        const servicio = {
          nombre: "Teléfono",
          item: element
        };
        arrayNuevo.push(servicio);
      }
      if(element === "ac_unit"){
        const servicio = {
          nombre: "Aire Acond.",
          item: element
        };
        arrayNuevo.push(servicio);
      }
      if(element === "balcony"){
        const servicio = {
          nombre: "Balcon",
          item: element
        };
        arrayNuevo.push(servicio);
      }
      if(element === "local_fire_department"){
        const servicio = {
          nombre: "Calefacción",
          item: element
        };
        arrayNuevo.push(servicio);
      }
      if(element === "lock"){
        const servicio = {
          nombre: "Seguridad",
          item: element
        };
        arrayNuevo.push(servicio);
      }
      if(element === "pets"){
        const servicio = {
          nombre: "Mascotas",
          item: element
        };
        arrayNuevo.push(servicio);
      }
    });
    return arrayNuevo;
  }

  detectarCambio(){
    this.services.startLoading();
    const refProd = this.service.afDB.database.ref(`${this.databaseProd}`);
    refProd.on('value', async () => {
      this.services.startLoading();
      this.productosData = await this.getProductos();
      this.productos.length = 0;
      this.productosData.forEach((e)=>{
        this.productos.push({
          form: this.fb.group({
            range : new FormGroup({
              start: new FormControl('', Validators.required),
              end: new FormControl('', Validators.required)
            }),
            adulto : new FormControl('', Validators.required),
            nino : new FormControl('', Validators.required)
          }),
          producto: e,
        })
      })
    });
    this.services.hideLoading();
  }

  //funciones del html
  editarCard(e){
    this.openDialog(e);
  }

  newCard(){
    this.openDialog();
  }

  openDialog(info?): void{
    const dialogRef = this.dialog.open(Modal2Component, {
      width:"100%",
      data: {
        info,
        message: info? 'Editar Card' : 'Nueva Card',
      },
    });
    dialogRef.afterClosed().subscribe(() => {});
  }

  borrarCard({id, nombre, capacidad, descripcion, imgs, valorPorNoche, servicios}){
    let imagenes = {};
    imgs.forEach((e) => {
      imagenes[e.id] = {
        ...e
      };
    });
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
        this.service.updateProd(id, {nombre, capacidad, descripcion, imgs:imagenes, valorPorNoche, servicios , estado: false}).then(() =>{
          this.getProductos().then((res) =>{
            this.productosData = res;
          });
          Swal.fire(
          'Borrado!',
          'El mensaje ha sido eliminado',
          'success')
        })
        //este servicio reemplaza todo el objeto de imagenes, borrando todas las imagenes que tengan estado = false, dejando solo aquellas que estaban en true al momento de borrar este producto...

      }
    })
  }

  verMas({nombre, descripcion}){
    Swal.fire({
      html: `<h1>${nombre}</h1>
      <p style=""text-aling": justify"><strong>${descripcion}</strong></p>
      `,
      imageUrl: 'https://firebasestorage.googleapis.com/v0/b/hospedaje-dalmar.appspot.com/o/shared%2FHospedaje%20Dalmar.png?alt=media&token=e8a33332-fc1f-41f4-a877-f876fda6de15',
      imageWidth: 150,
      imageHeight: 150,
      imageAlt: 'Custom image',
    })
  }
  
  unavaibleDays(calendarDate: Date): boolean{
    return calendarDate > new Date();
  }

  enviarWA({nombre}, form){
    const fechaIngreso= `${form.value.range.start.toLocaleDateString()}`;
    const fechaSalida= `${form.value.range.end.toLocaleDateString()}`;
    window.open(`https://wa.me/+5493513268151?text=Hola%20Hospedaje%20Dalmar,%20me%20gustaría%20saber%20disponibilidad%20de%20el/la%20${nombre}%20desde%20${fechaIngreso}%20al%20${fechaSalida}%20para%20${form.value.adulto}%20adultos%20y%20${form.value.nino}%20niños`, "_blank");
    form.reset();
    form.markAsPristine();
    form.markAsUntouched();
  }


}
