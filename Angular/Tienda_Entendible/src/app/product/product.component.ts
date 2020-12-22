import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthServiceService } from 'app/auth-service.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Output() eventEmitNavBar = new EventEmitter<number>();
  pathImg: string = "../../assets/fotos proyecto final/imagenesBase/";
  title: string = "Catálogo de productos";
  listData: any;
  listDataCopy: any;
  listBuyData: any;
  details: Object = {};
  countProduct: number = 0;
  totalBuyProduct: number = 0;

  constructor(private servicio: AuthServiceService) { }

  ngOnInit() {
    this.initData();
  }

  initData() {
    const title = localStorage.getItem('title'),
      details = localStorage.getItem('productDetails'),
      cartDataList = localStorage.getItem("cart");
    if (title) {
      this.title = title;
    }
    if (details) {
      this.details = JSON.parse(details);
    }
    if (cartDataList) {
      this.listBuyData = JSON.parse(cartDataList);
      this.funSumSubTotal();
    }
    this.servicio.obtenerProductos().subscribe((res: any) => {
      this.listData = this.listDataCopy = res;
    });
  }

  changeTitle(newTitle: string) {
    if (newTitle === '0') {
      this.title = 'Catálogo de productos';
    } else if (newTitle === '1') {
      this.title = 'Carrito de compras';
    } else {
      this.title = newTitle;
    }
    localStorage.setItem('title', this.title);
  }

  getDetailsProduct(data: any) {
    this.details = data;
    this.changeTitle(data.name);
    localStorage.setItem("productDetails", JSON.stringify(data));
  }

  searchProduct(search: string) {
    this.listData = this.listDataCopy.filter((item: any) => new RegExp(search, 'i').test(item.name));
  }

  addProduct(product: any, purchasedAmount: number = 0) {
    let listProducts = JSON.parse(localStorage.getItem("cart"));
    const newPurchasedAmount = Number(purchasedAmount);
    product.id = this.listData.findIndex((item: any) => item.name === product.name);
    product.purchasedAmount = newPurchasedAmount;
    if (listProducts) {
      let isAdd = false;
      for (const item of listProducts) {
        if (item.name === product.name) {
          item.purchasedAmount += newPurchasedAmount;
          isAdd = true;
        }
      }
      if (!isAdd) {
        listProducts.push(product);
      }
    } else {
      listProducts = [product];
    }
    const indexProduct = listProducts.find((item: any) => item.name === product.name);
    if (product.count < indexProduct.purchasedAmount) {
      return alert("No hay suficiente cantidad del producto");
    }
    // console.log(listProducts);
    this.listBuyData = listProducts;
    localStorage.setItem("cart", JSON.stringify(listProducts));
    this.funCountProduct(listProducts);
    this.funSumSubTotal();
  }

  funCountProduct(products: any) {
    let totalProduct = 0;
    for (const item of products) {
      totalProduct += item.purchasedAmount;
    }
    this.eventEmitNavBar.emit(totalProduct);
    localStorage.setItem("countProduct", JSON.stringify(totalProduct));
  }

  funSumSubTotal() {
    let listSubTotal = [];
    for (const item of this.listBuyData) {
      listSubTotal.push(item.price * item.purchasedAmount);
    }
    this.totalBuyProduct = listSubTotal.reduce((total, num) => total + num);
    console.log(listSubTotal);
  }

  processToBuy() {
    if (confirm("¿Desea realizar esta compra?")) {

    }
  }
}
