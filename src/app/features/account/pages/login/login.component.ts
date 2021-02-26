import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { CaruoselService } from 'src/app/services/caruosel.service';
import Swal from 'sweetalert2';
import { UtilsService } from 'src/app/services/utils.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  admin: boolean;

  FormObject= {
    email: new FormControl('', [Validators.required, Validators.minLength(5)]),
    password: new FormControl('', Validators.required),
  };

  constructor(public service: AuthService, public router: Router, public services: CaruoselService, public utils: UtilsService) { }

  ngOnInit(): void {
    this.form = new FormGroup(this.FormObject);
  }

  onLogin(){
    const {email, password} = this.form.value;
    const result = this.service.login(email, password);
    result.then((response) => {
      response.token.then((res) =>{

        this.verificarAdmin(response.usuario).then(() =>{

          if(this.admin === true){
            localStorage.setItem("token",res.token);   
            this.router.navigate(['admin']);
            this.expiredToken();
            Swal.fire({
            title: 'Atención!',
            text: 'Por razones de seguridad, dentro de un Hora deberá loguerse nuevamente!',
            icon:'success'           
            });
          }else{
            Swal.fire(
            'Ingreso Denegado!',
            'No es un usuario Administrador',
            'success');
            this.service.logout();
            this.router.navigate(['login']);
          }           
        })
      })
    })
  }

  onGoogle(){
    this.service.googleSignin().then(async (response) => {
      response.token.then((res) =>{

        this.verificarAdmin(response.usuario).then(() =>{

          if(this.admin === true){
            localStorage.setItem("token",res.token);   
            this.router.navigate(['admin']);
            this.expiredToken();
            Swal.fire({
            title: 'Atención!',
            text: 'Por razones de seguridad, dentro de un Hora deberá loguerse nuevamente!',
            icon:'success'           
            });
          }else{
            Swal.fire(
            'Ingreso Denegado!',
            'No es un usuario Administrador',
            'success');
            this.service.logout();
            this.router.navigate(['login']);
          }           
        })
      })
    })
  }

  onFacebook(){
    this.service.faceSignin().then((response) => {
      response.token.then((res) =>{

        this.verificarAdmin(response.usuario).then(() =>{

          if(this.admin === true){
            localStorage.setItem("token",res.token);   
            this.router.navigate(['admin']);
            this.expiredToken();
            Swal.fire({
            title: 'Atención!',
            text: 'Por razones de seguridad, dentro de un Hora deberá loguerse nuevamente!',
            icon:'success'           
            });
          }else{
            Swal.fire(
            'Ingreso Denegado!',
            'No es un usuario Administrador',
            'success');
            this.service.logout();
            this.router.navigate(['login']);
          }           
        })
      })
    })
  }

  async verificarAdmin(uid){
    const resultado = await this.services.getImg('admin').then((res) =>{
      let array= Object.values(res);
      let arrayNuevo = this.utils.agregarId(array, res);
      return this.utils.filterResult(arrayNuevo);
    })
    resultado.forEach(element => {
      if(element.id === uid){
        this.admin = true;
      }
    });
  }

  expiredToken(){
    setTimeout(() =>{
      Swal.fire(
        'Sesion Caducada!',
        'Su token ha expirado, debe salir y loguearse nuevamente!',
        'success');
        //esto no me funciona
        // this.service.logout();
        // this.router.navigate(['login']);
      }, 3590000) //antes de que expire el token(1hs tiene), deslogueo al usuario
  }

}
