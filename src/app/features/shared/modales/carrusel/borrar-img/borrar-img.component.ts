import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import Swal from 'sweetalert2';
import { CaruoselService } from 'src/app/services/caruosel.service';

@Component({
  selector: 'app-borrar-img',
  templateUrl: './borrar-img.component.html',
  styleUrls: ['./borrar-img.component.css']
})
export class BorrarImgComponent implements OnInit {
  @Input() imgs: [];
  @Input() database: string;
  @Input() id?: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['imagen','actions'];
  dataSource = new MatTableDataSource();

  constructor(public services : CaruoselService) { }

  ngOnInit(): void {
    this.dataSource.data = this.imgs;
  }

  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  async getImg(){
    const result = await this.services.getImg(this.armarUrlDinamicaDatabase());
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
  armarUrlDinamicaDatabase(){
    if(this.id){
      return `${this.database}/${this.id}/imgs`
    }else{
      return this.database
    }
  }

  
  onDeleteImg({id, urlImg}){
    Swal.fire({
      title: '¿Estas seguro de borrar esta imagen?',
      text: "No podras revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {
        this.services.updateImg(id, {urlImg, estado: false},this.armarUrlDinamicaDatabase()).then(() =>{
          this.getImg().then((data) => {        
            this.dataSource.data = data;
          })
        })
        Swal.fire(
        'Borrado!',
        'La Imagen ha sido eliminada',
        'success')
      }
    })
  }

}
