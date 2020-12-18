import { Component, OnInit } from '@angular/core';
import { TopBarComponent } from './top-bar/top-bar.component'
import { TiendaGalleyComponent } from './tienda-galley/tienda-galley.component';
import { CheckOutComponent } from './check-out/check-out.component';
import {DetailComponent } from './detail/detail.component';

@Component({
  selector: 'tienda-main',
  templateUrl: './tienda-main.component.html',
  styleUrls: ['./tienda-main.component.css']
})
export class TiendaMainComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }


}
