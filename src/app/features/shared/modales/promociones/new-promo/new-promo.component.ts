import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingScreenService } from 'src/app/services/loading-screen.service';
import { PromocionesService } from 'src/app/services/promociones.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-promo',
  templateUrl: './new-promo.component.html',
  styleUrls: ['./new-promo.component.css']
})
export class NewPromoComponent implements OnInit {
  carpeta: string = "ImagenesPromociones";
  filePath: any;
  dowloadURL: Observable<string>;
  estado : boolean;
  urlImg : string;
  selectFile: File;
  previewUrl: any;
  
  private img:any;

  public CardUp = new FormGroup({
    nombre: new FormControl('', Validators.required),
    capacidad: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    imagen: new FormControl('', Validators.required),
  })


  constructor(private services: PromocionesService, public storage: AngularFireStorage, private service: LoadingScreenService) { }

  ngOnInit(): void {
  }

  cardUpload(){
    this.service.startLoading();
    this.uploadImg(this.img, this.carpeta);
    this.service.hideLoading();
  }

  public uploadImg(img, carpeta){
    this.filePath = `${carpeta}/${img.name}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, img);
    task.snapshotChanges().pipe(finalize(() =>{
      fileRef.getDownloadURL().subscribe( urlImage => {
        this.dowloadURL = urlImage;
        const objPost = {
          nombre: this.CardUp.value.nombre,
          capacidad: this.CardUp.value.capacidad,
          descripcion: this.CardUp.value.descripcion,
          imagen: urlImage,
          estado: true
        };
        this.services.postPromo(objPost).then((data) =>{
          if(data){
            Swal.fire(
            'Agregado!',
            'La promoción se ha subido exitosamente',
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

}
