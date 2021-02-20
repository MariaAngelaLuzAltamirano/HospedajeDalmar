import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { AngularFireDatabase } from '@angular/fire/database';


@Injectable({
  providedIn: 'root'
})
export class BaseService {
  urlServer : string = environment.firebaseConfig.databaseURL;
  endopoint : string = '';
  constructor(public http: HttpClient, public afDB: AngularFireDatabase,) {}

  getCards(){
    return this.afDB.database.ref();
  }
  
  setEndpoint(endopoint) {
    this.endopoint = endopoint;
    return this.endopoint;
  }
  handlerError({status}){
    if(status === 401){
      //redirigir a login y limpiar el storage
      //debo importar Route
      //this.router.navigate(['/login']);
  
    }else if(status === 404){
      //not found
      //this.router.navigate(['/notfound']);
    }
    else if(status === 500){
      //internal server error
    }
  }

  async get() {
    try{ 
     return await this.http.get(`${this.urlServer}/${this.endopoint}.json`).toPromise();
    }catch(e){
      this.handlerError(e);
      console.log(e)
    }
  }
  async post(body) {
    try{ 
     return await this.http.post(`${this.urlServer}/${this.endopoint}.json`, body).toPromise();
    }catch(e){
      this.handlerError(e);
      console.log(e)
    }
  }

  async put(id, obj) {
    try{ 
     return await this.http.put(`${this.urlServer}/${this.endopoint}/${id}.json`,obj).toPromise();
    }catch(e){
      this.handlerError(e);
      console.log(e)
    }
  }


  async delete(id, obj) {
    try{ 
     return await this.http.put(`${this.urlServer}/${this.endopoint}/${id}.json`,obj).toPromise();
    }catch(e){
      this.handlerError(e);
      console.log(e)
    }
  }

}
