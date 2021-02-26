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
    return this.post(obj);
  }

  updateMess(id, obj) {
    this.setEndpoint(this.common);
    return this.put(id, obj);
  }

  deleteMess(id, obj) {
    this.setEndpoint(this.common);
    return this.delete(id, obj);
  }

  getCardExample(){
    return this.getCards
  }

}
