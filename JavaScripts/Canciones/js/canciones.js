function cargarDatos() {
    $.ajax({
        url: "http://127.0.0.1:5500/datos.json"
    }).done(function (respuesta) {
        arreglo = respuesta.canciones;
        mostrarArreglo(arreglo);
    });
};

function cargarSeleccion() {
    $.ajax({
        url: "http://127.0.0.1:5500/datos.json"
    }).done(function (respuesta) {
        arreglo1 = respuesta.canciones;
        //console.log("Esto es arrego en seleccion" + arreglo1);
        mostrarSeleccion(arreglo1);
        var html="";
        $("#lista-canciones").append(html);
    });
};

function mostrarArreglo(arregloCanciones) {
    var fila = "";
    var campoBuscar = $.trim($("#inputBuscar").val());
    /*if (campoBuscar.length > 0) {
        $("#inputBuscar").keyup(function(){
            
        });
        /* $("#user-data-next-button").attr('disabled', true);*/
    /*} else {*/
        iconoArreglo = "";
        for (x = 0; x < (arregloCanciones.length); x++) {
            var nombreCancion = arregloCanciones[x].nombre;
            var rutaCancion = "http://127.0.0.1:5500/canciones/" + arregloCanciones[x].ruta;
            switch (arregloCanciones[x].icono) {
                case 1:
                    iconoArreglo = "http://127.0.0.1:5500/imagenes/icon_1.svg";
                    break;
                case 2:
                    iconoArreglo = "http://127.0.0.1:5500/imagenes/icon_2.svg";
                    break;
                case 3:
                    iconoArreglo = "http://127.0.0.1:5500/imagenes/icon_3.svg";
                    break;
                case 4:
                    iconoArreglo = "http://127.0.0.1:5500/imagenes/icon_4.svg";
                    break;
            }
            var html = `                    
                    <div class="col-md-4 py-2">
                        <div class="col-12 col-sm-12">
                        <p class="text-center">
                            <img class="img-fluid" src=${iconoArreglo} width="50" alt=>
                        </p>
                        <p class="text-center"><strong>${nombreCancion}</strong></p>
                        <p class="text-center">
                            <audio controls>
                                <source src = ${rutaCancion} type="audio/mp3"> 
                                El navegador utilizado no soporta ese formato de audio
                            </audio>
                        </p>
                        </div>
                    </div>`
            $("#lista-canciones").append(html);
        //};
    };
};

function mostrarSeleccion(arregloCanciones1){
   $("#lista-canciones").empty();
    var texto = $("#inputBuscar").val().toLowerCase();
    for (x = 0; x < arregloCanciones1.length; x++) {
        var nombreCancion = arregloCanciones1[x].nombre.toLowerCase();
        if (nombreCancion.indexOf(texto) != -1) {
            console.log("Estoy en el if")
            var rutaCancion = "http://127.0.0.1:5500/canciones/" + arregloCanciones1[x].ruta;
            switch (arregloCanciones1[x].icono) {
                case 1:
                    iconoArreglo = "http://127.0.0.1:5500/imagenes/icon_1.svg";
                    break;
                case 2:
                    iconoArreglo = "http://127.0.0.1:5500/imagenes/icon_2.svg";
                    break;
                case 3:
                    iconoArreglo = "http://127.0.0.1:5500/imagenes/icon_3.svg";
                    break;
                case 4:
                    iconoArreglo = "http://127.0.0.1:5500/imagenes/icon_4.svg";
                    break;
            }
            var html = `                    
                        <div class="col-md-4 py-2">
                            <div class="col-12 col-sm-12">
                                <p class="text-center">
                                    <img class="img-fluid" src=${iconoArreglo} width="50" alt=>
                                </p>
                                <p class="text-center"><strong>${nombreCancion}</strong></p>
                                <p class="text-center">
                                    <audio controls>
                                        <source src = ${rutaCancion} type="audio/mp3"> 
                                        El navegador utilizado no soporta ese formato de audio
                                    </audio>
                                </p>
                            </div>
                        </div>`
            $("#lista-canciones").append(html);
        }
    }
};

$(document).ready(function () {
    cargarDatos();
    $("#inputBuscar").keyup(function (){
        //console.log("Estoy en funcion para seleccion");
        cargarSeleccion();
    });
});
