import { BrowserModule } from '@angular/platform-browser';
import {FormsModule } from '@angular/forms'
import { NgModule } from '@angular/core';
import {HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { TopBarComponent } from './tienda-main/top-bar/top-bar.component';
import { LogInComponent } from './log-in/log-in.component';
import { TiendaMainComponent } from './tienda-main/tienda-main.component';
import { TiendaGalleyComponent } from './tienda-main/tienda-galley/tienda-galley.component';
import { DataService } from './data.service';
import { FilterPipe } from './filter.pipe';
import { CheckOutComponent } from './tienda-main/check-out/check-out.component';
import { DetailComponent } from './tienda-main/detail/detail.component';
///Routing con child routes
const appRoutes: Routes = [
  {path: '', component:LogInComponent},
  {path: 'store', component:TiendaMainComponent , children:[
    {path: 'products', component:TiendaGalleyComponent},
    {path: 'detail/:name/:price/:image/:available', component:DetailComponent},
    {path: 'checkout', component:CheckOutComponent}
  ]}
]


@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    LogInComponent,
    TiendaMainComponent,
    TiendaGalleyComponent,
    FilterPipe,
    CheckOutComponent,
    DetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
