import { Component, Inject, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { CaruoselService } from 'src/app/services/caruosel.service';
import { LoadingScreenService } from 'src/app/services/loading-screen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal4',
  templateUrl: './modal4.component.html',
  styleUrls: ['./modal4.component.css']
})
export class Modal4Component implements OnInit {
  
  carpeta: string = "ImagenHome";
  database: string = "home"
  filePath: any;
  dowloadURL: Observable<string>;
  estado : boolean;
  urlImg : string;
  selectFile: File;
  previewUrl: any;
  
  private img:any;

  public CardEdit = new FormGroup({
    titulo: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    span: new FormControl('', Validators.required),
    imagen: new FormControl('', Validators.required),
  })


  constructor(public dialog:MatDialogRef<Modal4Component>,
    @Inject(MAT_DIALOG_DATA) public data: any, private services: CaruoselService, public storage: AngularFireStorage, private service: LoadingScreenService) {

  }

  ngOnInit(): void {
    this.initValuesForm();
  }

  editCard(){
    this.service.startLoading();
    const id = parseInt(this.data.info.id)+1;

    if(this.img){
      this.uploadImg(this.img, this.carpeta);
      this.service.hideLoading();

    }else{
      const objPost = {
        titulo: this.CardEdit.value.titulo,
        descripcion: this.CardEdit.value.descripcion,
        span: this.CardEdit.value.span,
        urlImg: this.data.info.urlImg,
        estado: true
      };
      this.services.updateImg(id ,objPost, this.database).then((data) =>{
        if(data){
          this.service.hideLoading();
          Swal.fire(
          'Agregado!',
          'La sección se ha actualizada exitosamente',
          'success')
        }
      });
    }
  }

  public uploadImg(img, carpeta){
    this.filePath = `${carpeta}/${img.name}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, img);
    task.snapshotChanges().pipe(finalize(() =>{
      fileRef.getDownloadURL().subscribe( urlImage => {
        this.dowloadURL = urlImage;
        const objPost = {
          titulo: this.CardEdit.value.titulo,
          descripcion: this.CardEdit.value.descripcion,
          span: this.CardEdit.value.span,
          urlImg: urlImage,
          estado: true
        };
        const id = parseInt(this.data.info.id)+1;
        this.services.updateImg(id, objPost, this.database).then((data) =>{
          if(data){
            Swal.fire(
            'Agregado!',
            'La sección se ha actualizada exitosamente',
            'success')
          }
        });
      })
    })).subscribe();
  }

  handleImage(e:any){     
    const reader = new FileReader();
    const {files} = e.target;
    if( files && files.length){
      this.selectFile = files[0];
      console.log(this.selectFile);
      reader.onload = (e) => {
        this.previewUrl = reader.result;
        console.log(this.previewUrl);
      };
      reader.readAsDataURL(this.selectFile);
    }
    this.img = e.target.files[0];
  }

  private initValuesForm() {
    this.CardEdit.patchValue({
      titulo: this.data.info.titulo,
      descripcion: this.data.info.descripcion,
      span: this.data.info.span,
      imagen: this.data.info.urlImg
    });
  }

}
