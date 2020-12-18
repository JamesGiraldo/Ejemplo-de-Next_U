import { Component, OnInit,Output,EventEmitter} from '@angular/core';

import { Producto } from '../../producto';
import { DataService } from '../../data.service';

@Component({
  selector: 'tienda-galley',
  templateUrl: './tienda-galley.component.html',
  styleUrls: ['./tienda-galley.component.css']
})
export class TiendaGalleyComponent implements OnInit {

  producto: Producto;
  productos : any[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getProductos();
  }
  //Hace el http request para poer los articulos en la vista
  //se llama en ngOnInit
  getProductos(): void {
    this.dataService.getProducts()
        .subscribe(productos => this.productos = productos)
  }

  ///handle Counter


  ///Valida si el objecto ha sido cambiado para aregarlo a la compra
  onAdd( producto: Producto, input){

        this.producto  = new Producto(
            producto.name,
            producto.price,
            producto.available - Number(input.value),
            Number(input.value),
            producto.imgPath
        );
        //Actualizo la cantidad disponble
        producto.available = this.producto.available;
        //Agrego el producto a la compra a trave del servicio
        this.dataService.addProduct(this.producto);
        ////Agrego uno al contador

      }
}
