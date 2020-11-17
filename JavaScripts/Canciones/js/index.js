function abrir() {
    $('#ventana').modal('show');
};

function cargarDatos() {
    $.ajax({
        url: "http://127.0.0.1:5500/datos.json"
    }).done(function (respuesta) {
        arreglo = respuesta.canciones;
        arreglo = arreglo.sort((cancion1, cancion2) => {
            return cancion2.reproducciones - cancion1.reproducciones
        })
        for (x=0;x<3;x++){
            var nombreCancion=arreglo[x].nombre
            var rutaCancion = "http://127.0.0.1:5500/canciones/" + arreglo[x].ruta;
            var html = `<tr>
                            <td class="text-center">${nombreCancion}</td>
                            <td colspan = "3" class = "text-center">
                                <p class = "text-center">
                                  <audio controls><source src=${rutaCancion} type="audio/mp3">
                                    El navegador utilizado no soporta ese formato de audio </audio>
                                </p>
                            </td>
                        </tr>`
            $("#cuerpo-tabla").append(html);
        }
    });
};

function muestraCanciones(){
    arreglo=respuesta.canciones;
    console.log("Estoy en muestra canciones y el arreglo es: " + arreglo);
    mostrarArreglo(arreglo);
};

function mostrarArreglo(arreglo){
    var fila = "";
    var campoBuscar = $.trim($("#inputBuscar").val());
    if (campoBuscar.length > 0) {
        /* $("#user-data-next-button").attr('disabled', true);*/
    } else {
        iconoArreglo = "";
        for (x = 0; x < (arreglo.length); x++) {
            var nombreCancion = arreglo[x].nombre;
            var rutaCancion = "http://127.0.0.1:5500/canciones/" + arreglo[x].ruta;
            switch (arreglo[x].icono) {
                case 1:
                    console.log("escojo icono 1");
                    iconoArreglo = "http://127.0.0.1:5500/imagenes/icon_1.svg";
                    break;
                case 2:
                    console.log("escojo icono 2");
                    iconoArreglo = "http://127.0.0.1:5500/imagenes/icon_2.svg";
                    break;
                case 3:
                    console.log("escojo icono 3");
                    iconoArreglo = "http://127.0.0.1:5500/imagenes/icon_3.svg";
                    break;
                case 4:
                    console.log("escojo icono 4");
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
            console.log(html);
            $("#lista-canciones").append(html);
            /*switch (x) {
                case 0:
                    console.log("primera figura");
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
                                    El navegador utilizado no soporta ese formato de audio</audio>
                            </p>
                        </div>
                    </div>`
                    console.log(html);
                    $("#lista-canciones").append(html);
                    break;
                case 1:
                    console.log("segunda figura");
                    var html = `
                    <div class="col-md-4 py-2">
                        <div class="col-12 col-sm-12">
                            <p class="text-center">
                                <img class="img-fluid" src=${iconoArreglo} width= "50" alt=>
                            </p>
                            <p class="text-center"><strong>${nombreCancion}</strong></p>
                            <p class="text-center">
                                <audio controls>
                                    <source src = ${rutaCancion} type="audio/mp3">
                                    El navegador utilizado no soporta ese formato de audio</audio>
                            </p>
                        </div>
                    </div>`
                    $("#lista-canciones").append(html);
                    break;
                case 2:
                    console.log("tercera figura");
                    var html = `
                    <div class="col-md-4 py-2">
                    <div class="col-12 col-sm-12">
                    <p class="text-center">
                       <img class="img-fluid" src=${iconoArreglo} width= "50" alt=>
                    </p><p class="text-center"><strong>${nombreCancion}</strong ></p>
                    <p class="text-center">
                       < audio controls >< source src = ${rutaCancion} type=audio/mp3>
                          El navegador utilizado no soporta ese formato de audio</audio></p>
                    </div></div>`
                    $("#lista-canciones").html = html;
                    break;
                case 3:
                   console.log("cuarta figura");
                   var html = `
                    <div class="col-md-4 py-2">
                    <div class="col-12 col-sm-12">
                    <p class="text-center">
                       <img class="img-fluid" src=${iconoArreglo} width= "50" alt=>
                    </p><p class="text-center"><strong>${nombreCancion}</strong ></p>
                    <p class="text-center">
                       < audio controls > < source src = ${rutaCancion} type=audio/mp3>
                          El navegador utilizado no soporta ese formato de audio</audio></p>
                    </div></div>`
                   $("#lista-canciones").append(html);
                   break;
               case 4:
                   console.log("quinta figura");
                    var html = `
                    <div class="col-md-4 py-2">
                    <div class="col-12 col-sm-12">
                    <p class="text-center">
                       <img class="img-fluid" src=${iconoArreglo} width= "50" alt=>
                    </p><p class="text-center"><strong>${nombreCancion}</strong ></p>
                    <p class="text-center">
                       < audio controls > < source src = ${rutaCancion} type=audio/mp3>
                          El navegador utilizado no soporta ese formato de audio</audio></p>
                    </div></div>`
                    $("#lista-canciones").append(html);
                    break;
               case 5:
                   console.log("sexta figura");
                    var html = `
                    <div class="col-md-4 py-2">
                    <div class="col-12 col-sm-12">
                    <p class="text-center">
                       <img class="img-fluid" src=${iconoArreglo} width= "50" alt=>
                    </p><p class="text-center"><strong>${nombreCancion}</strong ></p>
                    <p class="text-center">
                       < audio controls > < source src = ${rutaCancion} type=audio/mp3>
                          El navegador utilizado no soporta ese formato de audio</audio></p>
                    </div></div>`
                    $("#lista-canciones").html = html;
                    break;
                case 6:
                    console.log("septima figura");
                    var html = `
                    <div class="col-md-4 py-2">
                    <div class="col-12 col-sm-12">
                    <p class="text-center">
                       <img class="img-fluid" src=${iconoArreglo} width= "50" alt=>
                    </p><p class="text-center"><strong>${nombreCancion}</strong ></p>
                    <p class="text-center">
                       < audio controls > < source src = ${rutaCancion} type=audio/mp3>
                          El navegador utilizado no soporta ese formato de audio</audio></p>
                    </div></div>`
                    $("#lista-canciones").append(html);
                    break;
                case 7:
                    console.log("octava figura");
                    var html = `
                    <div class="col-md-4 py-2">
                    <div class="col-12 col-sm-12">
                    <p class="text-center">
                       <img class="img-fluid" src=${iconoArreglo} width= "50" alt=>
                    </p><p class="text-center"><strong>${nombreCancion}</strong ></p>
                    <p class="text-center">
                       < audio controls > < source src = ${rutaCancion} type=audio/mp3>
                          El navegador utilizado no soporta ese formato de audio</audio></p>
                    </div></div>`
                    $("#lista-canciones").append(html);
                    break;
                case 8:
                    console.log("novena figura");
                    var html = `
                    <div class="col-md-4 py-2">
                    <div class="col-12 col-sm-12">
                    <p class="text-center">
                       <img class="img-fluid" src=${iconoArreglo} width= "50" alt=>
                    </p><p class="text-center"><strong>${nombreCancion}</strong ></p>
                    <p class="text-center">
                       < audio controls > < source src = ${rutaCancion} type=audio/mp3>
                          El navegador utilizado no soporta ese formato de audio</audio></p>
                    </div></div>`
                    $("#lista-canciones").append(html);
                    break;
            };*/
        };
    };
};

function activa_carrusel(){
    var imgItems = $('.carrusel img').length;
    var imgPos = 1;
    $('.carrusel img').hide();
    $('.carrusel img:first').show();

    setInterval(function () {
        nextSlider();
    }, 3000);

    function pagination() {
        var paginationPos = $(this).index() + 1;
        $('.carrusel img').hide();
        $('.carrusel img:nth-child(' + paginationPos + ')').fadeIn();
        imgPos = paginationPos;
    }

    function nextSlider() {
        if (imgPos >= imgItems) {
            imgPos = 1;
        } else {
            imgPos++;
        }
        $('.carrusel img').hide();
        $('.carrusel img:nth-child(' + imgPos + ')').fadeIn();
    }

    function prevSlider() {
        if (imgPos <= 1) {
            imgPos = imgItems;
        } else {
            imgPos--;
        }
        $('.carrusel img').hide();
        $('.carrusel img:nth-child(' + imgPos + ')').fadeIn();
    }
};

$(document).ready(function () {
    $("button.cargar").click(function () {
        cargarDatos();
    });
    activa_carrusel();

});
