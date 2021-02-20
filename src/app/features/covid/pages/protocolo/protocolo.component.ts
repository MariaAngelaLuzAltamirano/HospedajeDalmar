import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-protocolo',
  templateUrl: './protocolo.component.html',
  styleUrls: ['./protocolo.component.css']
})
export class ProtocoloComponent implements OnInit {

  modo: string;
  constructor(private rutaAdm: ActivatedRoute) { 
    this.modo = 'normal'
  }

  ngOnInit(): void {
    
    this.rutaAdm.data.subscribe(data =>{
      this.modo = data['modo']|| this.modo;
    })
  }

}
