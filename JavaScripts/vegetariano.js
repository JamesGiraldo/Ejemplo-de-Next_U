// Se declaran las variables de tipo arreglo [ ]
var vegetarianos = ["sopa de verduras", "fideos salteados", "lasagna verde"];
var noVegetarianos = ["sopa de pollo", "hamburguesa con papas", "bife chorizo"];

// Variables booleanas
var tipoDeMenu = false
/*var tipoDeMenu = true;*/
function menu(tipoDeMenu) {
  // validamos el tipo de menú si es verdadero imprime tal menú
  if (tipoDeMenu === true) {
    console.log(`menus vegetarianos: ${vegetarianos[0]}, ${vegetarianos[1]}, ${vegetarianos[2]}`)
    // si el tipo de menú es falso imprime este menú
  } else {
    console.log(`menus no vegetarianos ${noVegetarianos[0]}, ${noVegetarianos[1]}, ${noVegetarianos[2]} `)
  }
}
// se llama la función
menu(true);

/////////////===================================================/////////////

var Veg = ["Lechuga", "Cebolla"] //Recetas Vegetarianas
var noVeg = ["Carne", "Pollo"] //Recetas No Vegetarianas
var tipoVeg = true //Variable si es de tipo vegetariano
var tiponoVeg = false //Variable si no es de tipo vegetariano

function mostrar(tipo, vegana, novegana) { //Funcion que recibe el tipo y los dos arreglos con recetas
  if (tipo === true) { //si el tipo es true retorna el menu vegetariano
    return "Menu Vegetario: " + vegana[0] + "," + vegana[1]
  } else { //por el contrario si no es true retorna no vegetariano
    return "Menu No Vegetario: " + novegana[0] + "," + novegana[1]
  }
}

console.log(mostrar(tipoVeg, Veg, noVeg)) //ejemplo pasando la variable tipo true es decir vegetariana
console.log(mostrar(tiponoVeg, Veg, noVeg)) //ejemplo pasando la variable tipo false es decir no vegetariana

// ================================= //

var recetaMenuVegetarianos = ["Receta Vegetaria 1", "Receta Vegetariana 2"];
var recetaMenuNoVegetarianos = ["Receta No Vegetaria 1", "Receta No Vegetariana 2"];
var menu = true;

function ordenServicio(x) {
  if (x) {
    var orden1 = "Menus Vegetariano:" + " " + recetaMenuVegetarianos[0] + " " + recetaMenuVegetarianos[1];
    return console.log(orden1);
  } else {
    var orden2 = "Menus No Vegetariano:" + " " + recetaMenuNoVegetarianos[0] + " " + recetaMenuNoVegetarianos[1];
    return console.log(orden2);
  }
}

ordenServicio(false)


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
