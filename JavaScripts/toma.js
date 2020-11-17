function saludar(nombre, apellido, genero, evento, tiemporestante) { //definimos los parametros que recibe la funcion
    var saludo = ""; //declaramos las variables que usaremos
    var dia = "";

    switch (genero) {
        case "F":
            saludo = "Bienvenida"
            break;
        case "M":
            saludo = "Bienvenido"
            break;
    }

    if (tiemporestante < 60 * 24) { // si el tiemporestante pasado en el parametro es menor a 60x24 entonces es hoy
        aux = 1
    } else if (tiemporestante < 60 * 24 * 2) { // si el tiemporestante pasado en el parametro es menor a 60x24x2 entonces es mañana
        aux = 2
    } else { // si no es ninguna de las anteriores se dice que es pronto
        aux = 3
    }

    switch (aux) {
        case 1:
            dia = "hoy"
            break
        case 2:
            dia = "mañana"
            break
        case 3:
            dia = "pronto"
            break
    }

    //Establecemos la impresion
    return `${saludo} ${nombre.trim().toUpperCase()} ${apellido.trim().toUpperCase()}, recuerda ${dia} el evento (${evento})`;

}
//probamos la funcion  con diferentes valores
console.log(saludar("    LUIS", "perez", "M", "Pelicula", 600));
console.log(saludar("ana ", "peRez", "F", "Comidas del Mundo", 1500));
console.log(saludar("  PEDRO ", "Gil", "M", "Juego de Baloncesto", 5000));