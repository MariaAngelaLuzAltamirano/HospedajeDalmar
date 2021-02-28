import { Component, OnInit, ViewChild} from '@angular/core';
import { ContactsService } from './../../../../services/contacts.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import Swal from 'sweetalert2';
import { LoadingScreenService } from 'src/app/services/loading-screen.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Messages } from 'src/app/interfaces/messages';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})


export class ContactComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
 
  displayedColumns: string[] = ['apellido', 'nombre', 'celular', 'email', 'actions'];
  dataSource = new MatTableDataSource();

  
  constructor(public service: ContactsService, public services: LoadingScreenService, public utils: UtilsService) {}

  async ngOnInit() {
    this.services.startLoading(); 
    this.dataSource.data = await this.getMessages(); 
    this.services.hideLoading();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  async getMessages(): Promise<Messages[]>{
    const result = await this.service.getMess();
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

  onDeleteMessage({nombre, apellido, celular, email, mensaje, leido, id}){
    Swal.fire({
      title: '¿Estas seguro de borrar este mensaje?',
      text: "No podras revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteMess(id, {nombre, apellido, celular, email, mensaje, leido, estado: false}).then(() =>{
          this.getMessages().then((data) => {
            this.dataSource.data = data;
          })
        })
        Swal.fire(
        'Borrado!',
        'El mensaje ha sido eliminado',
        'success')
      }
    })
  }
  onSeeMessage({nombre, apellido, celular, email, mensaje, estado, id}){
    Swal.fire({
      title: `<h1><strong>Mensaje de <u>${nombre}</u> ${apellido}</strong></h1>`,
      icon: 'info',
      html:
      `<br>
      <h1>Email: ${email}</h1>
      <h1>Telefono: ${celular}</h1>
      <h2><strong>${mensaje}</strong></h2>
      `,
      showCloseButton: true,
      focusConfirm: true,
      confirmButtonText:
        '<i class="fa fa-thumbs-up"></i> Bien!',
      confirmButtonAriaLabel: 'Thumbs up, great!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.updateMess(id, {nombre, apellido, celular, email, mensaje, estado, leido: true}).then(() =>{
          this.getMessages().then((data) => {
            this.dataSource.data = data;
          })
        })
      } 
    })
  }

}
