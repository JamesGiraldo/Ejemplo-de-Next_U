import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'app/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //Declarar las variables de correo y contraseña
  email: string = ""
  password: string = ""
  isError: string = ""

  //Se inicializa el servicio en el componente
  constructor(private route: Router, private services: AuthServiceService) { }

  ngOnInit() { }

  //Función que ejecuta el evento onsubmit del formulario
  onSubmitLogin() {
    //Se llama a la función del servicio para obtener los datos
    this.services.obtenerDatosUsuario().subscribe((data: any) => {
      if (this.email === data.email && this.password === data.password) {
        this.route.navigate(['/home']);
      } else {
        this.isError = "Error en el inicio de sesión";
      }
    });
  }

  //Función para eliminar el mensaje de error
  resetErrorLogin() {
    this.isError = "";
  }

}
