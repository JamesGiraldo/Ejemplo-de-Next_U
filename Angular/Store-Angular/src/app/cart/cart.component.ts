import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service'
import {Http,Response} from '@angular/http';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers:[DataService]
})


export class CartComponent implements OnInit {
carrito;
totalPago=0;

  constructor(private dataService: DataService) { }

  ngOnInit() {
  this.carrito=JSON.parse(localStorage.getItem('kart'))
  for (let item of this.carrito) {
    this.totalPago+=parseInt(item.subtotal);
}
  }


pagar(){

this.dataService.getData()
.subscribe(
(data:Response)=>{



for (let car of this.carrito) {
  for (let producto of data['Productos']) {
    if(car.nombre==producto.nombre){
     producto.disponible-=parseInt(car.cantidad)
       break;

    }
  }

}

this.dataService.SendData(data)
.subscribe(
(res:Response)=>{
  this.carrito=[]
  window.location.replace('./home')
})

})
}


}
