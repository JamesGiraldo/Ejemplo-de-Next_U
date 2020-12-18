import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from '../data.service'

@Component({
  selector: 'log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  //propiedades
  match:boolean = false;
  errorMessage:boolean = false;
  users:any= [];
  user = {
    name: "",
    pass: ""
  };


  constructor(private router: Router, private dataservice: DataService) { }

  ngOnInit() {
    this.getUsers()
  }
  //obtinen los usuarios de la base de datos
  getUsers(): void{
    this.dataservice.getUsers()
    .subscribe(users =>{
      return this.users = users
    })
  }

  //dummy function verifica el acceso devolviendo match
  onVerify(){

    for (let i = 0; i < this.users.length; i++) {
      if(this.user.name !== this.users[i].name && this.user.pass !== this.users[i].pass ){
        console.log('Negado')
        this.match = this.match;
      }
      if(this.user.name == this.users[i].name && this.user.pass == this.users[i].pass ){
        console.log('Bienvenido')
        this.match = !this.match;
        console.log('this.match ', this.match);
      }

    }

    return this.match;
  }
  //registra el vlor de los inputs y se llama la funcion q esta arriba
  onAttemptToLog(form){
    this.user = {
      name: form.value.name.trim(),
      pass: form.value.pass.trim()
    }
    this.onVerify();
    //si onverify retorna match == true se ingresa a la tienda
    //sino se muestra el mensaje de error
    if(this.match == true){
      this.router.navigate(['/store/products'])
    }else{
      this.errorMessage = !this.errorMessage;
    }

  }

}
