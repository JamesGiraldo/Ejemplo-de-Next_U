import { Component, OnInit,OnChanges } from '@angular/core';

import { DataService } from '../../data.service'

@Component({
  selector: 'top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {



  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

  ngOnChanges(){

  }
}
