import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CaruoselService } from '../../../../../services/caruosel.service'


@Component({
  selector: 'app-subir-img',
  templateUrl: './subir-img.component.html',
  styleUrls: ['./subir-img.component.css']
})
export class SubirImgComponent implements OnInit {
  @Input() carpeta: string;
  @Input() database: string;  
  @Input() id?: string;

  private img:any;
  private selectFile: File;
  public previewUrl: any;


  public imgUp = new FormGroup({
    imagen:  new FormControl('', Validators.required),
  })
  constructor(public services : CaruoselService) { }

  ngOnInit(): void {

  }

  armarUrlDinamicaDatabase(){
    if(this.id){
      return `${this.database}/${this.id}/imgs`
    }else{
      return this.database
    }
  }

  armarUrlDinamicaStorage(){
    if(this.id){
      return `${this.carpeta}/${this.id}`
    }else{
      return this.carpeta
    }
  }

  onUpload(){
    this.services.uploadImg(this.img,this.armarUrlDinamicaStorage(), this.armarUrlDinamicaDatabase());
  }

  handleImage(e:any){
    const reader = new FileReader();
    const {files} = e.target;
    if( files && files.length){
      this.selectFile = files[0];
      reader.onload = (e) => {
        this.previewUrl = reader.result;
      };
      reader.readAsDataURL(this.selectFile);
    }
    this.img = e.target.files[0];
  }

}
