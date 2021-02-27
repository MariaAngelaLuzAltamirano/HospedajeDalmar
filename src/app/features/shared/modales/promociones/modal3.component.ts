import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal3',
  templateUrl: './modal3.component.html',
  styleUrls: ['./modal3.component.css']
})
export class Modal3Component implements OnInit {

  constructor(public dialog:MatDialogRef<Modal3Component>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }
  
  cerrar(){
    this.dialog.close();
  }

}
