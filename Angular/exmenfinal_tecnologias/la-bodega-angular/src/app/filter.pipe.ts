import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(productos: any, term: any): any {
    ///check if term search is undefined
    if(term === undefined) return productos;
    //return updated array
    return productos.filter((producto)=>{
      return producto.name.toLowerCase().includes(term.toLowerCase())
    })
  }

}
