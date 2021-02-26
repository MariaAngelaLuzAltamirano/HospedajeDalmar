import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class BaseService {
  urlServer : string = environment.firebaseConfig.databaseURL;
  endopoint : string = '';
  token: string = localStorage.getItem('token');
  constructor(public http: HttpClient, public afDB: AngularFireDatabase, public router: Router) {}

  getCards(){
    return this.afDB.database.ref();
  }
  
  setEndpoint(endopoint) {
    this.endopoint = endopoint;
    return this.endopoint;
  }

  handlerError({status}){
    if(status === 401){
      Swal.fire(
      'Sin Autorizacion!',
      'Usted necesita loguearse para realizar esta operación',
      'success');
  
    }else if(status === 404){
      window.open(`https://http.cat/404`, "_blank");
    }
    else if(status === 500){
      window.open(`https://http.cat/500`, "_blank");
    }
  }

  async get() {
    try{ 
     return await this.http.get(`${this.urlServer}/${this.endopoint}.json`).toPromise();
    }catch(e){
      this.handlerError(e);
    }
  }
  async post(body) {
    try{ 
     return await this.http.post(`${this.urlServer}/${this.endopoint}.json?auth=${this.token}`, body).toPromise();
    }catch(e){
      this.handlerError(e);
    }
  }

  async put(id, obj) {
    try{ 
     return await this.http.put(`${this.urlServer}/${this.endopoint}/${id}.json?auth=${this.token}`,obj).toPromise();
    }catch(e){
      this.handlerError(e);
    }
  }


  async delete(id, obj) {
    try{ 
     return await this.http.put(`${this.urlServer}/${this.endopoint}/${id}.json?auth=${this.token}`,obj).toPromise();
    }catch(e){
      this.handlerError(e);
    }
  }

}
