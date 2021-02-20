import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable} from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private service: AuthService){}
  canActivate(): Observable<boolean>|boolean{
   return this.service.obtenerEstadoUsuario.pipe(tap(data =>{
    if(data === true){
      return true;
    }else{
      this.router.navigate(['login']);
    }
   }));
  }

}
