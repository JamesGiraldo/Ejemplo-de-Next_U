import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Producto } from './producto';
//import { PRODUCTOS } from './mock-product'

@Injectable()
export class DataService {

  //local urls para probar

  // private productosUrl = './assets/productos.json';
  private productosUrl = 'https://la-bodega-angular.firebaseio.com/.json';
  // private usersUrl = './assets/users.json';
  private usersUrl = 'https://la-bodega-angularb.firebaseio.com/.json';

  ///creo la variable compra para pasarla al componente checkout
  compra : any[] = [];



  constructor(private http : HttpClient) { }
    ///Se hace el http request
    getProducts() : Observable<Producto[]>{
      return this.http.get<Producto[]>(this.productosUrl)
    }
    //funcion que captura elproducto para ser empujado al compra
    addProduct(producto:Producto){
      this.compra.push(producto);
    }
    //esta funcion retorna la compra
    getCompra(){
      return this.compra;
    }
    ///Limpio el shopping cart
    deleteCompra(){
      this.compra = [];
    }


    getUsers(){
      return this.http.get(this.usersUrl);
    }

    updateProductos(string){
      return this.http.patch(this.productosUrl, [])
    }

}
