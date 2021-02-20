import { Injectable } from '@angular/core';
import { BaseService } from './../services/base.service';

@Injectable({
  providedIn: 'root'
})
export class ProductosService extends BaseService {
  common: string = 'productos';

 getAll() {
   this.setEndpoint(this.common);
   return this.get();
 }

//  getSingle(id){
//    this.setEndpoint(`${this.common}/${id}`);
//    return this.get();
//  }

  postProd(obj) {
    this.setEndpoint(this.common);
    return this.post(obj);
  }

 updateProd(id, obj) {
  this.setEndpoint(this.common);
  return this.put(id, obj);
}
}
