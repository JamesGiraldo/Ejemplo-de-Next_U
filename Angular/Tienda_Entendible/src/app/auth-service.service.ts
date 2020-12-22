import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class AuthServiceService {

  //Se inicializa el modulo http en el servicio
  constructor(private http: Http) { }

  // Función de servicio de usuario en firebase
  obtenerDatosUsuario() {
    return this.http.get("https://angular-login-682a8.firebaseio.com/.json")
      .map((res: Response) => res.json())  //Convertir la respuesta a formato JSON
  }

  // Función de servicio de todos los productos en firebase
  obtenerProductos() {
    return this.http.get("https://angular-login-682a8.firebaseio.com/products.json")
      .map((res: Response) => res.json())  //Convertir la respuesta a formato JSON
  }

  actualizarProductos() {
    return this.http.put(`https://angular-login-682a8.firebaseio.com/products/${0}.json`, {})
  }


}
