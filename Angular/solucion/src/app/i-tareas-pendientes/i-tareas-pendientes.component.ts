import { Component, OnInit } from '@angular/core';

@Component({
  selector: 't-i-tareas-pendientes',
  templateUrl: './i-tareas-pendientes.component.html',
  styleUrls: ['./i-tareas-pendientes.component.css']
})
export class ITareasPendientesComponent implements OnInit {

  tareas : string[];

  constructor() { }

  ngOnInit() {
    this.tareas = ['Recoger libros', 'Firmar autorización', 'Cita con María']
  }

}
