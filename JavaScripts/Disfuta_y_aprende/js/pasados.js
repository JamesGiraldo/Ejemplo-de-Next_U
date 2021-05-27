// Hemos omitido los acentos en los comentarios por compatibilidad

//Define las variables que necesites
var eventos = [];
var fechaActual;
var eventosPasados = [];

$(document).ready(function () {

  //Carga los datos que estan en el JSON (info.json) usando AJAX
  $.ajax({
    type: "get",
    url: "http://127.0.0.1:5500/info.json",
  }).done(function (data, statusText, xHr) {

    //Guarda el resultado en variables 
    fechaActual = data.fechaActual;
    eventos = data.eventos;

    //Selecciona los eventos que sean anteriores a la fecha actual del JSON
    eventosPasados = eventos.filter((evento) => {
      return (Date.parse(evento.fecha) < Date.parse(fechaActual));
    });

    //Ordena los eventos segun la fecha (los mas cercanos primero)
    eventosPasados.sort((a, b) => {
      if ((Date.parse(a.fecha)) > (Date.parse(b.fecha))) {
        return -1;
      } else if ((Date.parse(a.fecha)) < (Date.parse(b.fecha))) {
        return 1;
      }
      return 0;
    });

    //Crea un string que contenga el HTML que describe el detalle del evento
    var htmleventosPasados = ``;

    //Recorre el arreglo y concatena el HTML para cada evento
    for (const evento of eventosPasados) {
      htmleventosPasados = htmleventosPasados + `
  <div class="col-12 mb-3 p-3 rounded bg-white evento">
  <a class="dos-eventos link" href="http://127.0.0.1:5500/detalle.html?id=${evento.id}">
  <h2>${evento.nombre}</h2>
  <a/>
  <p class="text-secondary">${evento.fecha} - ${evento.lugar}</p>
  <p>${evento.descripcion}</p>
  <p class="text-info">Invitados: ${evento.invitados}</p>
  </div>
  `;
    }

    //Modifica el DOM agregando el html generado dentro del div con id=evento
    $("#pasados").addClass("align-items-center");
    $("#pasados").html(htmleventosPasados);

  }).fail(function (jQXhr, statusText, error) {

    var mensajeError = `
    <div class="col rounded mb-3 p-3 bg-white evento">
    <a class="link" href="http://127.0.0.1:5500/#">
    <h2>Error</h2>
    <a/>
    <p>No se pudieron cargar los eventos</p>
    <p>${Date()}</p>
    </div>
    `;

    $("#pasados").html(mensajeError);

    console.log(statusText + " Codigo del error: " + jQXhr.status);

  });

});

