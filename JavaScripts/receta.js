// Se declaran las 5 variables
var ingrediente1 = "HARINA";
var ingrediente2 = "Agua";
var ingrediente3 = "Sal";
var ingrediente4 = "Manteca";
var ingrediente5 = "Marihuana";
var comida = "browniesLocos";

function capitalize(x) {
    return x.charAt(0).toUpperCase()+ x.slice(1).toLowerCase();
}

// se declara la función junto los parametros que que necesita imprimir
function receta(ingrediente1, ingrediente2, ingrediente3, ingrediente4, ingrediente5, comida) {
    // la función lo qu eva hacer es imprimir en pantalla gracias a este console.log como tal
    return (`Mi bolsa de comida: La receta ${comida} \n Ingredientes:  ${ingrediente1}  ${ingrediente2} ${ingrediente3} ${ingrediente4} ${ingrediente5}`);
}
// llamamos la función junto a la cantidad de parametros que requiere esos parametros son las variables si quiere.
console.log(receta(capitalize(ingrediente1), ingrediente2, ingrediente3, ingrediente4, ingrediente5, comida));




// ======================================================= //

function capitalize(x){
    return x.charAt(0).toUpperCase()+ x.slice(1).toLowerCase();
}
function procesarFila(fila){
    var arreglo= fila.split(" ");
    var nombre= arreglo[0].trim();
    var apellido= arreglo[1].trim();
    return capitalize(nombre) + " " + capitalize(apellido);
}
var fila= "AnGiE, jAmES"
console.log(procesarFila(fila))
