import { Injectable } from '@angular/core';
import { BaseService } from './../services/base.service';


@Injectable({
  providedIn: 'root'
})
export class ContactsService extends BaseService{
  common: string = 'mensajes';

  getMess() {
    this.setEndpoint(this.common);
    return this.get();
  }
  
  postMess(obj) {
    this.setEndpoint(this.common);
    return this.postM(obj);
  }

  updateMess(id, obj) {
    this.setEndpoint(this.common);
    return this.put(id, obj);
  }

  deleteMess(id, obj) {
    this.setEndpoint(this.common);
    return this.delete(id, obj);
  }



  async postM(body) {
    try{ 
     return await this.http.post(`${this.urlServer}/${this.endopoint}.json`, body).toPromise();
    }catch(e){
      this.handlerError(e);
    }
  }

}
