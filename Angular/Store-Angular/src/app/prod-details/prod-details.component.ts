import { Component, OnInit } from '@angular/core';
import {HomeComponent} from '../home/home.component'


@Component({
  selector: 'app-prod-details',
  templateUrl: './prod-details.component.html',
  styleUrls: ['./prod-details.component.css']
})
export class ProdDetailsComponent implements OnInit {
producto=''
  constructor(private home:HomeComponent) { }

  ngOnInit() {
  this.producto=JSON.parse(localStorage.getItem('currentProd'))
  }

back(){
  this.home.changeVisibility()
}
}
