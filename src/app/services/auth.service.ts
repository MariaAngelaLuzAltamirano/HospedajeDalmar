import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService{
  
  constructor(private afAuth: AngularFireAuth) {};

  async login(email:string, password:string) {
    try{
      const result = await this.afAuth.signInWithEmailAndPassword(
        email,
        password
      );
      console.log('logueada');
      return result;
    }catch(error){
      return error;
    }
  }

  async logout() {
    try{
      await this.afAuth.signOut();
      console.log("deslogueado")
    }catch(error){console.log(error)}
  }

  obtenerEstadoUsuario = new Observable<boolean>((subscriber)=>{
    this.afAuth.onAuthStateChanged((user) => {
        
      if (user!= undefined) {
        subscriber.next(true);
      }else{
        subscriber.next(false);
      }
      subscriber.complete();
    },err=>{
      subscriber.error(err);
    });
  });

  async userState(){
    try{
      await this.afAuth.onAuthStateChanged((user) => {
        
        if (user) {
          console.log('Usuario logueado');
          console.log(user);
        }else{
          console.log('Usuario deslogueado');
        }
      });
    }catch(error){console.log(error)}
  }

}
