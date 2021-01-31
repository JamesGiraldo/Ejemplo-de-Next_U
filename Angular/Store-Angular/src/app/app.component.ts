import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  kart=[];
constructor(){
  localStorage.setItem('kart', JSON.stringify(this.kart))
}

}
