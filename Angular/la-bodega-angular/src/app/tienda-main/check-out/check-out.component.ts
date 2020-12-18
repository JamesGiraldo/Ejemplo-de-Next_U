import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { DataService } from '../../data.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  ///propiedades
  orden: any[] = [];
  title = "Carrito de compras";
  message: string = "Carrito vacio";
  total: number;
  sum: number = 0;


  constructor(private dataService: DataService, private router: Router) { }
  //se obtiene la orden del servicio
  ngOnInit() {
    this.getOrden()
  }
  getOrden(){
     this.orden = this.dataService.getCompra();
     this.getSum();
  }


  getSum(): number {
    ///Funcion q obtiene el total de la compra
    for (let i = 0; i < this.orden.length; i++) {
      this.sum += this.orden[i].price * this.orden[i].purchased;
    }
    return this.sum;
  }
  onPagar(){
    console.log(this.orden)


//     this.dataService.updateProductos(this.orden)
//     .subscribe(
//        (val) => {
//            console.log("PATCH call successful value returned in body",
//                        val);
//        },
//        response => {
//            console.log("PATCH call in error", response);
//        },
//        () => {
//            console.log("The PATCH observable is now completed.");
// });
    this.orden = [];
    this.dataService.deleteCompra();
    this.router.navigate(['/store/products']);
  }

  onCancel(){
    ///Limpia la orden y la compra del servicio
     this.orden = [];
     this.dataService.deleteCompra()
  }
}
