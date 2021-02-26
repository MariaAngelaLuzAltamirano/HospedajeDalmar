import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  filterResult(elements: any[]) {
    const resultado = elements.filter((element) => element != null);
    return resultado;
  }

  agregarId(arrayNuevo, result){
    let i = 0;  
    for (let id in result){
      if(i < arrayNuevo.length){
        arrayNuevo[i]= ({'id': id, ...arrayNuevo[i]});
        i = i+1;
      }
    };
    return arrayNuevo;
  }
  
  filtrarPorEstado(obj) {
    if(obj.estado == true){
      return obj;
    }
  }

}
