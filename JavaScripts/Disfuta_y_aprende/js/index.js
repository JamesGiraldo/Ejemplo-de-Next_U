// Hemos omitido los acentos en los comentarios por compatibilidad

//Define las variables que necesites
var eventos = [];
var fechaActual;
var eventosPasados = [];
var eventosFuturos = [];
var dosEventosPasados = [];
var dosEventosFuturos = [];

$(document).ready(function () {

  //Carga los datos que estan en el JSON (info.json) usando AJAX
  $.ajax({
    type: "get",
    url: "http://127.0.0.1:5500/info.json",
  }).done(function (data, statusText, xHr) {

    //Guarda el resultado en variables 
    fechaActual = data.fechaActual;
    eventos = data.eventos;

    //Clasifica los eventos segun la fecha actual del JSON
    for (const evento of eventos) {
      if ((Date.parse(evento.fecha) > Date.parse(fechaActual))) {
        eventosFuturos.push(evento);
      } else {
        eventosPasados.push(evento);
      }
    }

    //Ordena los eventos segun la fecha (los mas cercanos primero)
    eventosFuturos.sort((a, b) => {
      if ((Date.parse(a.fecha)) > (Date.parse(b.fecha))) {
        return 1;
      } else if ((Date.parse(a.fecha)) < (Date.parse(b.fecha))) {
        return -1;
      }
      return 0;
    });

    //Extrae solo dos eventos

    for (let index = 0; index < 2; index++) {
      dosEventosFuturos.push(eventosFuturos[index]);
    }

    //Ordena los eventos segun la fecha (los mas cercanos primero)
    eventosPasados.sort((a, b) => {
      if ((Date.parse(a.fecha)) > (Date.parse(b.fecha))) {
        return -1;
      } else if ((Date.parse(a.fecha)) < (Date.parse(b.fecha))) {
        return 1;
      }
      return 0;
    });

    //Extrae solo dos eventos
    for (let index = 0; index < 2; index++) {
      dosEventosPasados.push(eventosPasados[index]);
    }

    //Crea un string que contenga el HTML que describe el detalle del evento
    var htmlEventosFuturos = ``;

    //Recorre el arreglo y concatena el HTML para cada evento
    for (const evento of dosEventosFuturos) {
      htmlEventosFuturos = htmlEventosFuturos + `
    <div class="col-5 mb-3 p-3 rounded bg-white evento">
    <a class="dos-eventos link" href="http://127.0.0.1:5500/detalle.html?id=${evento.id}">
    <h2>${evento.nombre}</h2>
    <a/>
    <p class="text-secondary">${evento.fecha}</p>
    <p>${evento.descripcion}</p>
    </div>
    `;
    }

    //Modifica el DOM agregando el html generado
    $("#proximos").addClass("justify-content-around");
    $("#proximos").html(htmlEventosFuturos);


    //Crea un string que contenga el HTML que describe el detalle del evento
    var htmlEventosPasados = ``;

    //Recorre el arreglo y concatena el HTML para cada evento
    for (const evento of dosEventosPasados) {
      htmlEventosPasados = htmlEventosPasados + `
    <div class="col-5 rounded mb-3 p-3 bg-white evento">
    <a class="dos-eventos link" href="http://127.0.0.1:5500/detalle.html?id=${evento.id}">
    <h2>${evento.nombre}</h2>
    <a/>
    <p class="text-secondary">${evento.fecha}</p>
    <p>${evento.descripcion}</p>
    </div>
    `;
    }

    //Modifica el DOM agregando el html generado
    $("#pasados").addClass("justify-content-around");
    $("#pasados").html(htmlEventosPasados);

  }).fail(function (jQXhr, statusText, error) {

    var mensajeError = `
    <div class="col rounded mb-3 p-3 bg-white evento">
    <a class="dos-eventos link" href="http://127.0.0.1:5500/#">
    <h2>Error</h2>
    <a/>
    <p>No se pudieron cargar los eventos</p>
    <p>${Date()}</p>
    </div>
    `;

    $("#proximos, #pasados").html(mensajeError);

    console.log(statusText + " Codigo del error: " + jQXhr.status);

  });
});
