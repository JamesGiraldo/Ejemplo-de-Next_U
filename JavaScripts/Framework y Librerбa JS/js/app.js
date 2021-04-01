var cambioColor = true;
var puntuacion;
var continuar;
var aRealizarMovimientos;
var movimientos;

$(function () {
    setInterval(function () {
        cambioColor ? $(".main-titulo").css('color', 'white') : $(".main-titulo").css('color', 'yellow');
        cambioColor = !cambioColor;
    }, 1000);

    $('.col-1').droppable({
        accept: ".col-2"
    });
    $('.col-2').droppable({
        accept: ".col-1, .col-3"
    });
    $('.col-3').droppable({
        accept: ".col-2, .col-4"
    });
    $('.col-4').droppable({
        accept: ".col-3, .col-5"
    });
    $('.col-5').droppable({
        accept: ".col-4, .col-6"
    });
    $('.col-6').droppable({
        accept: ".col-5, .col-7",
    });
    $('.col-7').droppable({
        accept: ".col-6"
    });

    $('.btn-reinicio').click(function () {
        if ($('.btn-reinicio').text() === 'Iniciar') {
            if ($(".panel-tablero").css('display') === 'none') {
                $(".panel-tablero").css('display', 'flex');
                $(".panel-tablero").css('width', '70%');
                $(".panel-tablero").css('height', '700px');
                $(".panel-score").css('display', 'flex');
                $(".panel-score").css('width', '25%');
                $(".panel-score").css('height', '700px');
                $(".time").css('display', 'block');
                $(".time").css('width', '100%');
                $(".time").css('height', '23%');
                $(".time").css('opacity', '1.0');
            }

            $('.main-titulo-juego-terminado').css("display", "none");

            removerElementos();
            rellenarTablero();
            puntuacion = 0;
            movimientos = 0;
            iniciarJuego();
            $(this).text('Reiniciar');
        }
        else {
            clearInterval(aRealizarMovimientos);
            $('#countdowntimer').countdowntimer({
                minutes: 0,
                seconds: 0
            });
            $(this).text('Iniciar');
            $('#score-text').text('0');
        }
    });
});

function removerElementos() {
    for (var col = 1; col <= 7; ++col) {
        $('.col-' + col).empty();
    }
}

function rellenarTablero() {
    for (var col = 1; col <= 7; ++col) {
        for (var fila = 1; fila <= 7; ++fila) {
            var nuevaImagen = $('<img>',
                {"src": "image/" + (1 + Math.floor(Math.random() * 4)) + ".png", "class": "elemento"}
            );
            $(nuevaImagen).draggable();
            $('.col-' + col).append(nuevaImagen);
        }
    }
}

function iniciarJuego() {
    continuar = true;

    droppableDraggable();

    $('#countdowntimer').countdowntimer({
        minutes: 2,
        seconds: 0,
        timeUp: function () {
            continuar = false;
            clearInterval(realizarMovimientos());

            var anchoPanelTablero = $('.panel-tablero').css('width');

            $(".panel-tablero").animate({
                height: "0",
                width: "0"
            }, 1000, function () {
                $(".panel-tablero").css('display', 'none');
            });

            $('.panel-score').animate({
                width: anchoPanelTablero
            }, 1000);

            $('.time').animate({
                opacity: 0.0
            }, 1000);

            $('.btn-reinicio').text('Iniciar');

            $('.main-titulo-juego-terminado').css("display", "block")
        }
    });

    aRealizarMovimientos = setInterval(realizarMovimientos, 1500);
}

function actualiarNumeroMovimientos() {
    movimientos += 1;

    $('#movimientos-text').text(movimientos);
}

function intercambiarElementos(elemento1, elemento2) {
    var parent1, next1,
        parent2, next2;

    parent1 = elemento1.parentNode;
    next1 = elemento1.nextSibling;
    parent2 = elemento2.parentNode;
    next2 = elemento2.nextSibling;

    parent1.insertBefore(elemento2, next1);
    parent2.insertBefore(elemento1, next2);
}

function realizarMovimientos() {

    var contador;
    var nombreImagen;
    var nombreImagen2;
    var figurasMarcadas = inicializarFigurasMarcadas();
    var cambios = false;

    for (var row = 0; row < 7; ++row) {
        for (var col = 0; col < 7; ++col) {
            if ((7 - col) > 2) {
                nombreImagen = $('.col-' + (col + 1)).children()[row];
                nombreImagen = $(nombreImagen).prop('src').substring($(nombreImagen).prop('src').length - 5);

                contador = 1;

                while ((7 - col) >= 3 && contador < (7 - col)) {
                    nombreImagen2 = $('.col-' + (col + contador + 1)).children()[row];
                    nombreImagen2 = $(nombreImagen2).prop('src').substring($(nombreImagen2).prop('src').length - 5);

                    if (nombreImagen !== nombreImagen2) {
                        break;
                    }

                    ++contador;
                }

                if (contador >= 3) {
                    cambios = true;
                    for (var i = 0; i < contador; ++i) {
                        figurasMarcadas[row][col + i] = true;
                    }
                }
            }

            if ((7 - row) > 2) {
                nombreImagen = $('.col-' + (col + 1)).children()[row];
                nombreImagen = $(nombreImagen).prop('src').substring($(nombreImagen).prop('src').length - 5);

                contador = 1;

                while ((7 - row) >= 3 && contador < (7 - row)) {
                    nombreImagen2 = $('.col-' + (col + 1)).children()[row + contador];
                    nombreImagen2 = $(nombreImagen2).prop('src').substring($(nombreImagen2).prop('src').length - 5);

                    if (nombreImagen !== nombreImagen2) {
                        break;
                    }

                    ++contador;
                }

                if (contador >= 3) {
                    cambios = true;
                    for (var i = 0; i < contador; ++i) {
                        figurasMarcadas[row + i][col] = true;
                    }
                }
            }
        }
    }

    if (cambios) {
        actualizarTablero(figurasMarcadas);
    } else {
        clearInterval(aRealizarMovimientos);
    }
}


function inicializarFigurasMarcadas() {
    var figurasMarcadas = [];

    for (var row = 0; row < 7; ++row) {
        figurasMarcadas[row] = new Array(7);
        for (var col = 0; col < 7; ++col) {
            figurasMarcadas[row][col] = false;
        }
    }

    return figurasMarcadas;
}

function actualizarTablero(figurasMarcadas) {
    var puntuacion = 0;
    for (var col = 0; col < 7; ++col) {
        for (var fila = 0; fila < 7; ++fila) {
            if (figurasMarcadas[fila][col]) {
                $($('.col-' + (col + 1)).children()[fila]).addClass('remover');
                puntuacion += 10;
            }
        }
    }

    if ($('.remover').length > 0) {
        $('.remover').fadeIn(200).fadeOut(200).fadeIn(200).fadeOut(200, function () {
            $(this).remove();

            actualizarPuntuacion(puntuacion);
            crearDulces();
        });
    }
}

function crearDulces() {
    for (var col = 0; col < 7; ++col) {
        if ($('.col-' + (col + 1)).children().length < 7) {
            var numeroDulces = 7 - $('.col-' + (col + 1)).children().length;

            for (var i = 1; i <= numeroDulces; ++i) {
                var nuevoDulce = $('<img>',
                    {"src": "image/" + (1 + Math.floor(Math.random() * 4)) + ".png", "class": "elemento"});
                $('.col-' + (col + 1)).prepend(nuevoDulce);
            }
        }
    }

    droppableDraggable();
}

function actualizarPuntuacion(masPuntuacion) {
    puntuacion += masPuntuacion;

    $('#score-text').text(puntuacion);
}

function droppableDraggable() {
    $(".elemento").draggable({
        disabled: false,
        cursor: "move",
        containment: ".panel-tablero",
        revert: true,
        revertDuration: 500,
        snap: ".elemento",
        snapMode: "inner",
        snapTolerance: 40,
        stop: function (event, ui) {

            actualiarNumeroMovimientos();
        }
    });
    $(".elemento").droppable({
        drop: function (event, ui) {
            if (aRealizarMovimientos !== 0) {
                var dropped = ui.draggable;
                var droppedOn = this;

                var colDropped = Number($($(dropped).parent()).attr("class").substring(4, 5));
                var colDroppedOn = Number($($(droppedOn).parent()).attr("class").substring(4, 5));

                if ((Math.abs(colDropped - colDroppedOn) === 1) || colDroppedOn === colDropped) {
                    intercambiarElementos(dropped[0], droppedOn);
                    aRealizarMovimientos = setInterval(realizarMovimientos, 1500);
                }
            }
        }
    });
}
