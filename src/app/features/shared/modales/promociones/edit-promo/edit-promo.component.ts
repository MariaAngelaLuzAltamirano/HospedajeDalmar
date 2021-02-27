import { Component, Input, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingScreenService } from 'src/app/services/loading-screen.service';
import { PromocionesService } from 'src/app/services/promociones.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-promo',
  templateUrl: './edit-promo.component.html',
  styleUrls: ['./edit-promo.component.css']
})
export class EditPromoComponent implements OnInit {  
  @Input() card: any;

  carpeta: string = "ImagenesPromociones";
  filePath: any;
  dowloadURL: Observable<string>;
  estado : boolean;
  urlImg : string;
  selectFile: File;
  previewUrl: any;
  
  private img:any;

  public CardEdit = new FormGroup({
    nombre: new FormControl('', Validators.required),
    capacidad: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    imagen: new FormControl('', Validators.required),
  })

  constructor(private services: PromocionesService, public storage: AngularFireStorage, private service: LoadingScreenService) { }

  ngOnInit(): void {
    this.initValuesForm();
  }

  editCard(){
    this.service.startLoading();
    if(this.img){
      this.uploadImg(this.img, this.carpeta);
      this.service.hideLoading();
    }else{
      const objPost = {
        nombre: this.CardEdit.value.nombre,
        capacidad: this.CardEdit.value.capacidad,
        descripcion: this.CardEdit.value.descripcion,
        imagen: this.card.imagen,
        estado: true
      };
      this.services.updatePromo( this.card.id,objPost).then((data) =>{
        if(data){
          this.service.hideLoading();
          Swal.fire(
          'Agregado!',
          'La promoción se ha actualizada exitosamente',
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
          nombre: this.CardEdit.value.nombre,
          capacidad: this.CardEdit.value.capacidad,
          descripcion: this.CardEdit.value.descripcion,
          imagen: urlImage,
          estado: true
        };
        this.services.updatePromo(this.card.id, objPost).then((data) =>{
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

  handleImage(e:any):void{
    const reader = new FileReader();
    const {files} = e.target;
    if( files && files.length){
      this.selectFile = files[0];
      console.log(this.selectFile);
      reader.onload = (e) => {
        this.previewUrl = reader.result;
      };
      reader.readAsDataURL(this.selectFile);
    }
    this.img = e.target.files[0];
  }

  private initValuesForm() {
    this.CardEdit.patchValue({
      nombre: this.card.nombre,
      capacidad: this.card.capacidad,
      descripcion: this.card.descripcion,
      imagen: this.card.imagen
    });
  }

}
