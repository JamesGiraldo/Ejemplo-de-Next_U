import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service'
import {Http,Response} from '@angular/http';
import {HomeComponent} from '../home/home.component';



@Component({
selector: 'app-catalogo',
templateUrl: './catalogo.component.html',
styleUrls: ['./catalogo.component.css'],
providers:[DataService]
})
export class CatalogoComponent implements OnInit {
productos
kart=JSON.parse(localStorage.getItem('kart'))

constructor(private dataService: DataService,private home:HomeComponent) { this.onChange('') }

ngOnInit() {
}

onChange(el){
this.dataService.getData()
.subscribe(
(data:Response)=>{
this.productos=[]
for (let prod of data['Productos']) {
if(el==""){
this.productos.push(prod)
}
else if (prod.nombre.includes(el)){
this.productos.push(prod)
}
}
})
}

verProducto(nombre){

for (let prod of this.productos) {
if(prod.nombre==nombre){
  localStorage.setItem('currentProd', JSON.stringify(prod))
  this.home.changeVisibility()
return
}

}
}

addToKart(nombre,cantidad){
for (let prod of this.productos) {
if(prod.nombre==nombre){
let subtotal=prod.precio*cantidad;
let p=JSON.parse(`{"nombre":"${prod.nombre}","subtotal":"${subtotal}","cantidad":"${cantidad}"}`)
  this.kart.push(p)
  localStorage.setItem('kart', JSON.stringify(this.kart))

  this.home.actualizarKart()
return
}
}

}
}
