var recetaMenuVegetarianos = ["Receta Vegetaria 1", "Receta Vegetariana 2"];
var recetaMenuNoVegetarianos = ["Receta No Vegetaria 1", "Receta No Vegetariana 2"];
var menuVegetarianos = true;
var menuNoVegetarianos = false;

var x = menuVegetarianos;

function ordenServicio(x) {
  if (menuVegetarianos) {
      var orden1 = "Menus Vegetariano:" + " " + recetaMenuVegetarianos[0] + " " + recetaMenuVegetarianos[1];
      return orden1;
    } else {
      var orden2 = "Menus No Vegetariano:" + " " + recetaMenuNoVegetarianos[0] + " " + recetaMenuNoVegetarianos[1];
      return orden2;
    }
}


// ==========================
var recVeg = ["Sampler vegetariano", "Salsas vegetarianas", "Berro con limón", "Fideos de calabaza", "Albondigas vegetarianas"];
var recNoVeg = ["Carne asada", "Hamburguesa", "Frijoles con chicharrón", "Chicharrón", "Sudado de pollo"];

var veg = true;
var noVeg = false;

function menu(recVeg, recNoVeg) {
    if (veg = true) {
        var resultado = "recVeg";
        document.write(recVeg);
    } else {
        document.write(recNoVeg);
    }
    return menu;
}
console.log(menu);
