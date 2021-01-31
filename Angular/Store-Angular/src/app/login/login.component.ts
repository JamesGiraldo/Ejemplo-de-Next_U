import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service'
import {Http,Response} from '@angular/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[DataService]
})
export class LoginComponent implements OnInit {

  constructor(private dataService: DataService,private router:Router) { }

  ngOnInit() {
  }


  checkLogin(usernamep,passwordp){

  this.dataService.getData()
  .subscribe(
  (data:Response)=>{
      for (let user of data['Usuarios']) {
        if ((user.username==usernamep)&&(user.pass==passwordp)){
            this.router.navigate(['home']);
          return true
        }
      }
      alert('Nombre de usuario o conraseña incorrecto')
      return false
  }


  )

  }

}
