function capitalize(x) {
    return x.charAt(0).toUpperCase() + x.slice(1).toLowerCase();
}

function saludo(nombre, apellido, género, evento, minutosQueFaltan) {
    var nombre = capitalize(nombre.trim());
    var apellido = capitalize(apellido.trim());
    var saludo = "";
    if (género == "FEMENINO") {
        saludo = "Bienvenida";
    } else {
        saludo = "Bienvenido"
    }
    console.log(género);
    var evento = evento;
    if (minutosQueFaltan < 60 * 24) {
        minutosQueFaltan = "hoy";
    } else if (minutosQueFaltan < 60 * 24 * 2) {
        minutosQueFaltan = "mañana";
    } else {
        minutosQueFaltan = "pronto";
    }
    console.log(saludo + " " + nombre + " " + apellido + " recuerda " + minutosQueFaltan + " el evento: " + evento);
}
saludo("ana ", "peRez", "FEMENINO", "Película", 600);