import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
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
      return {token: result.user.getIdTokenResult(), usuario: result.user.uid};
    }catch(error){
      return error;
    }
  }

  async googleSignin() {
    const provider = new firebase.default.auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    return {token: credential.user.getIdTokenResult(), usuario: credential.user.uid};
  }

  async faceSignin() {
    const provider = new firebase.default.auth.FacebookAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    return {token: credential.user.getIdTokenResult(), usuario: credential.user.uid};
  }


  async logout() {
    await this.afAuth.signOut();
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
