export class Producto {
  public name: string;
  public price:number;
  public available:number;
  public purchased:number;
  public imgPath: string;

  constructor(name:string,price:number,available:number,purchased:number,imgPath:string){
      this.name = name;
      this.price = price;
      this.available = available;
      this.purchased = purchased;
      this.imgPath = imgPath;
  }
}
