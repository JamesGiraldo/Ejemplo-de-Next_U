import { Component, OnInit } from '@angular/core';

@Component({
  selector: 't-i-tareas-grupos',
  templateUrl: './i-tareas-grupos.component.html',
  styleUrls: ['./i-tareas-grupos.component.css']
})
export class ITareasGruposComponent implements OnInit {

  grupos : Object[];


  constructor() { }

  ngOnInit() {
    this.grupos = [
      {
        nombre: 'Trabajo',
        icono: 'business_center',
        resaltado: false
      },
      {
        nombre: 'Amigos',
        icono: 'people',
        resaltado: false
      },
      {
        nombre: 'Universidad',
        icono: 'school',
        resaltado: false
      }
    ];

    

  }

  onHoverGroupIn(item){
    item.resaltado = true;
  }

  onHoverGroupOut(item){
    item.resaltado = false;
  }

}
