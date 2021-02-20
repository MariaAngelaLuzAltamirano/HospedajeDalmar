import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ContactsService } from './../../../services/contacts.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  year: Date = new Date();
  @ViewChild('noteForm', { static: true }) noteForm: NgForm;
  form: FormGroup;
  estado: boolean = true;
  leido: boolean = false;

  FormObject= {
    nombre: new FormControl('', Validators.required),
    apellido: new FormControl('', Validators.required),
    celular: new FormControl('', [Validators.required, Validators.minLength(10)]),
    email: new FormControl('', [Validators.required, Validators.minLength(5)]),
    mensaje: new FormControl('', [Validators.required, Validators.minLength(10)]),
  };

  
  constructor(private service: ContactsService) {}

  ngOnInit(): void {
    this.form = new FormGroup(this.FormObject);
  }

  async onMessage() {
    const {nombre, apellido, celular, email, mensaje} = this.form.value;
    const obj = {nombre, apellido, celular, email, mensaje, leido: this.leido, estado: this.estado};
    const idObj = await this.service.postMess(obj);
    this.form.reset();
    this.noteForm.resetForm();
    if(idObj){
      Swal.fire(
        'Enviado!',
        'Su mensaje ha sido enviado',
        'success')
    }
  }

}
