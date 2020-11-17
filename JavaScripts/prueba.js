function GestionarEstudiante(estudiante, nota1, nota2, Gestion) {
    var resGestion = Gestion(nota1, nota2);
    console.log(` Nombre Completo del Estudiante: ${ estudiante } ${ resGestion } `);
}

function Promedio(nota1, nota2) {
    return (nota1 + nota2) / 2;
}
GestionarEstudiante(' Jose Carrillo ', 18, 2, Promedio);
// ===========


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

console.log(ordenServicio());