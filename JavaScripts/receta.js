var ingrediente1 = "Harina";
var ingrediente2 = "Agua";
var ingrediente3 = "Sal";
var ingrediente4 = "Manteca";
var ingrediente5 = "Marihuana";
var comida = "browniesLocos";

function capitalize(x) {
    return charAt(x[0]).toUpperCase().trim();
}

function receta(ingrediente1, ingrediente2, ingrediente3, ingrediente4, ingrediente5, comida) {
    return ("Mi bolsa de comida: Nombre de la receta " + comida + " Ingredientes: " + ingrediente1 + ", " + ingrediente2 + ", " + ingrediente3 + ", " + ingrediente4 + ", " + ingrediente5 + ".");
}
console.log(receta(ingrediente1, ingrediente2, ingrediente3, ingrediente4, ingrediente5, comida));