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
  selector: 'app-modal5',
  templateUrl: './modal5.component.html',
  styleUrls: ['./modal5.component.css']
})
export class Modal5Component implements OnInit {
  carpeta: string = "ImagenCovid";
  database: string = "covid"
  filePath: any;
  dowloadURL: Observable<string>;
  estado : boolean;
  urlImg : string;
  selectFile: File;
  previewUrl: any;
  
  private img:any;

  public CardEdit = new FormGroup({
    titulo1: new FormControl('', Validators.required),
    titulo2: new FormControl('', Validators.required),
    parrafoA1: new FormControl('', Validators.required),
    parrafoA2: new FormControl('', Validators.required),
    parrafoA3: new FormControl('', Validators.required),
    parrafoB: new FormControl('', Validators.required),
    aHref: new FormControl('', Validators.required),
    aText: new FormControl('', Validators.required),
    imagen: new FormControl('', Validators.required),
  })



  constructor(public dialog:MatDialogRef<Modal5Component>,
    @Inject(MAT_DIALOG_DATA) public data: any, private services: CaruoselService, public storage: AngularFireStorage, private service: LoadingScreenService) { }

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
          titulo1: this.CardEdit.value.titulo1,
          titulo2: this.CardEdit.value.titulo2,
          parrafo1:{
            etiquetaA:{
              href: this.CardEdit.value.aHref,
              text: this.CardEdit.value.aText
            },
            parte1: this.CardEdit.value.parrafoA1,
            parte2: this.CardEdit.value.parrafoA2,
            parte3: this.CardEdit.value.parrafoA3
          },
          parrafo2: this.CardEdit.value.parrafoB,
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
            titulo1: this.CardEdit.value.titulo1,
            titulo2: this.CardEdit.value.titulo2,
            parrafo1:{
              etiquetaA:{
                href: this.CardEdit.value.aHref,
                text: this.CardEdit.value.aText
              },
              parte1: this.CardEdit.value.parrafoA1,
              parte2: this.CardEdit.value.parrafoA2,
              parte3: this.CardEdit.value.parrafoA3
            },
            parrafo2: this.CardEdit.value.parrafoB,
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
        titulo1: this.data.info.titulo1,
        titulo2: this.data.info.titulo2,
        parrafoA1: this.data.info.parrafo1.parte1,
        parrafoA2: this.data.info.parrafo1.parte2,
        parrafoA3: this.data.info.parrafo1.parte3,
        parrafoB: this.data.info.parrafo2,
        aHref: this.data.info.parrafo1.etiquetaA.href,
        aText: this.data.info.parrafo1.etiquetaA.text,
        imagen: this.data.info.urlImg
      });
    }

}
