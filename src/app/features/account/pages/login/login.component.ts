import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  FormObject= {
    email: new FormControl('', [Validators.required, Validators.minLength(5)]),
    password: new FormControl('', Validators.required),
  };

  constructor(private service: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup(this.FormObject);
  }

  onLogin(){
    const {email, password} = this.form.value;
    const result = this.service.login(email, password);
    result.then((response) => {
      if(response.user){
        this.router.navigate(['admin']);
      }else{
        console.log(`${response.message}`);
      }
    })
  }

  onLogout(){
    this.service.logout();
  }

  onSeeState(){
    this.service.userState();
  }

}
