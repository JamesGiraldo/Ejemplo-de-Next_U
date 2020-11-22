import { Component } from '@angular/core';

@Component({
  selector: 'form-usuarios',
  templateUrl: './form-usuarios.component.html',
  styleUrls: ['./form-usuarios.component.css']
})
export class FormUsuariosComponent {

  email = "";
  error = "";

  //Función para validar el correo de usuario
  validarCorreo() {
    console.log(this.email);
    if (this.email == "") {
      this.error = "Debes ingresar un valor en el campo";
    } else if (/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(this.email)) {
      alert("La dirección de email " + this.email + " es correcta.")
    } else {
      this.error = "Debes ingresar un email válido";
    }

  }

  //Función para eliminar el mensaje de error 
  resetErrorLogin() {
    this.error = "";
  }


}
