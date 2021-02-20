import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class PromocionesService extends BaseService {
  common: string = 'promociones';

 getAll() {
   this.setEndpoint(this.common);
   return this.get();
 }

//  getSingle(id){
//    this.setEndpoint(`${this.common}/${id}`);
//    return this.get();
//  }

  postPromo(obj) {
    this.setEndpoint(this.common);
    return this.post(obj);
  }

 updatePromo(id, obj) {
  this.setEndpoint(this.common);
  return this.put(id, obj);
}
}
