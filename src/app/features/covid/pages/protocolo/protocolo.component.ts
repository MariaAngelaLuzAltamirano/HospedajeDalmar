import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Modal5Component } from 'src/app/features/shared/modales/covid/modal5.component';
import { Covid } from 'src/app/interfaces/covid';
import { CaruoselService } from 'src/app/services/caruosel.service';
import { LoadingScreenService } from 'src/app/services/loading-screen.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-protocolo',
  templateUrl: './protocolo.component.html',
  styleUrls: ['./protocolo.component.css']
})
export class ProtocoloComponent implements OnInit {

  public database: string = 'covid';
  public covidData: Covid[];

  modo: string;
  constructor(public rutaAdm: ActivatedRoute, public dialog: MatDialog, public service: CaruoselService, public services: LoadingScreenService, public utils: UtilsService) {
    this.services.startLoading(); 
    this.modo = 'normal';
    this.detectarCambio();
  }

  async ngOnInit() {
    
    this.rutaAdm.data.subscribe(data =>{
      this.modo = data['modo']|| this.modo;
    })

    this.covidData = await this.getCovid();
    window.scrollTo(0,0);
    this.services.hideLoading();
  }

  editarCard(e){
    this.openDialog(e);
  }

  openDialog(info){
    const dialogRef = this.dialog.open(Modal5Component, {
      width:"100%",
      data: {
        info,
        message:'Editar Card',
      }
    });
    dialogRef.afterClosed().subscribe(() => {});
  }

  async getCovid(): Promise<Covid[]>{
    const result = await this.service.getImg(this.database);
    let array= Object.values(result);
    let arrayNuevo = this.utils.filterResult(array);
    let arrayCovid = this.utils.agregarId(arrayNuevo, result);
    return arrayCovid;
  }

  detectarCambio(){
    const refCovid = this.service.afDB.database.ref(`${this.database}`);
    refCovid.on('value', (data) => {
      if(data){
        this.getCovid().then((res) =>{
           this.covidData = res;
         });
      }
    });
  }

}
