import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Params } from '@angular/router';


@Component({
  selector: 'detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
//se setea el producto, se pudo haber importado el modelo
  producto :{
            name:string,
            price:number,
            image:string,
            available:number
          };

  constructor(private route:ActivatedRoute) { }
// se llama on inint para q tome las variables de la ruta especificadas en el componente de la galleria
  ngOnInit() {
    this.producto = {
      name: this.route.snapshot.params['name'],
      price: this.route.snapshot.params['price'],
      image: this.route.snapshot.params['image'],
      available: this.route.snapshot.params['available']
    };
  }

}
