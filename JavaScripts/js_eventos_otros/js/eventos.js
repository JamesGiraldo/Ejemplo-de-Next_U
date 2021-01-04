
function cambiarRadioButtons() {
    var estadoRB = document.getElementById('activar_rb').checked;
    console.log(estadoRB);
    if (estadoRB) {
        document.getElementById('animales').disabled = false;
        document.getElementById('postres').disabled = false;
        document.getElementById('musica').disabled = false;
    }
    else {
        document.getElementById('animales').disabled = true;
        document.getElementById('postres').disabled = true;
        document.getElementById('musica').disabled = true;
    }

}

function cargarPagina() {
    // alert("Se ha cargado toda la página");
}
document.getElementsByTagName("body")[0].onload = cargarPagina;

function eventoOnFocus(event) {
    var seleccion = event.currentTarget.id;
    console.log(event);
    switch (seleccion) {
        case "animales":
            document.getElementById("sel_animales").disabled = false;
            break;
        case "postres":
            document.getElementById("sel_postres").disabled = false;
            break;
        case "musica":
            document.getElementById("sel_musica").disabled = false;
            break;
        default:
    }
    $(document).ready(function () { $('select').material_select(); });
}

function eventoOnBlur(event) {
    var seleccion = event.currentTarget.id;
    console.log(event);
    switch (seleccion) {
        case "animales":
            document.getElementById("sel_animales").disabled = false
            break;
        case "postres":
            document.getElementById("sel_postres").disabled = false
            break;
        case "musica":
            document.getElementById("sel_musica").disabled = false
            break;
        default:
    }
    // $(document).ready(function () { $('select').material_select(); });

}

function asignarEventosRB() {
    document.getElementById("animales").onfocus = eventoOnFocus;
    document.getElementById("postres").onfocus = eventoOnFocus;
    document.getElementById("musica").onfocus = eventoOnFocus;

    document.getElementById("animales").onblur = eventoOnBlur;
    document.getElementById("postres").onblur = eventoOnBlur;
    document.getElementById("musica").onblur = eventoOnBlur;
}


asignarEventosRB();
