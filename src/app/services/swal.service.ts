import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class SwalService {

  normalMessage({title, icon, timer}) {
    Swal.fire({
      title,
      icon: icon || 'sucess',
      showConfirmButton: true,
      timer: timer || 1500,
    });
  }
 
}
