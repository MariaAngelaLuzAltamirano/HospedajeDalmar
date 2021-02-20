import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { BaseService } from './base.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CaruoselService extends BaseService {
  filePath: any;
  dowloadURL: Observable<string>;
  estado : boolean;
  urlImg : string;

  constructor(public storage: AngularFireStorage, public http: HttpClient, public afDB: AngularFireDatabase) {
    super(http,afDB);
  }
  private saveImg(url, database){
    const objetoImg = {
      estado : true,
      urlImg : url
    }
    
    this.postImg(objetoImg, database).then(() =>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Su Imagen ha sido subida exitosamente',
        showConfirmButton: false,
        timer: 1500
      })
    }).catch( (e) =>{
      console.log(e);
    })
  }

  public uploadImg(img, carpeta, database){
    this.filePath = `${carpeta}/${img.name}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, img);
    task.snapshotChanges().pipe(finalize(() =>{
      fileRef.getDownloadURL().subscribe( urlImage => {
        this.dowloadURL = urlImage;
        this.saveImg(urlImage, database);
      })
    })).subscribe();
  }

  postImg(obj, common) {
    this.setEndpoint(common);
    return this.post(obj);
  }

  getImg(common) {
    this.setEndpoint(common);
    return this.get();
  }

  updateImg(id, obj, common) {
    this.setEndpoint(common);
    return this.put(id, obj);
  }

}
