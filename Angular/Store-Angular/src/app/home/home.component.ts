import { Component, OnInit,ViewChild} from '@angular/core';
import {NavBarComponent} from '../nav-bar/nav-bar.component'
import {CatalogoComponent} from '../catalogo/catalogo.component'
import {ProdDetailsComponent} from '../prod-details/prod-details.component'
import {CartComponent} from '../cart/cart.component'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']

})
export class HomeComponent implements OnInit {
catalogoVisible=true;
detailsVisible=false;
cartVisible=false;

@ViewChild(NavBarComponent) contador: NavBarComponent;
  constructor() { }

  ngOnInit() {
  }





changeVisibility()
{
this.catalogoVisible=!this.catalogoVisible;
this.detailsVisible=!this.detailsVisible;
}


actualizarKart(){
  this.contador.actualizarContador()


}

showCart():void{
  this.cartVisible=true;
  this.catalogoVisible=false;
  this.detailsVisible=false;
  
   }
}
