// Hemos omitido los acentos en los comentarios por compatibilidad

$(document).ready(function () {

  //Esta es la instruccion para tomar el id del URL detalle.html?id=<identificador>
  const urlParams = new URLSearchParams(window.location.search);
  const idEvento = urlParams.get('id');

  //Carga los datos que estan en el JSON (info.json) usando AJAX
  $.ajax({
    type: "get",
    url: "http://127.0.0.1:5500/info.json",
  }).done(function (data, statusText, xHr) {
    //Guarda el resultado en una variable 
    var eventos = data.eventos;

    //Busca el elemento en el arreglo
    var eventosF = eventos.filter((evento) => {
      return evento.id == idEvento;
    });

    //Crea un string que contenga el HTML que describe el detalle del evento
    var eventoHTML = `
         <div class="col-12 mb-3 p-3 rounded bg-white evento">
         <h2>${eventosF[0].nombre}</h2>
         <p class="text-secondary">${eventosF[0].fecha} - ${eventosF[0].lugar}</p>
         <p>${eventosF[0].descripcion}</p>
         <p class="text-info">Precio: ${eventosF[0].precio}</p>
         <p class="text-warning">Invitados: ${eventosF[0].invitados}</p>
         </div>
         `;
    //Modifica el DOM agregando el html generado dentro del div con id=evento
    $("#evento").addClass("align-items-center");
    $("#evento").html(eventoHTML);

  }).fail(function (jQXhr, statusText, error) {

    var mensajeError = `
    <div class="col rounded p-3 bg-white evento">
    <h2 class="text-danger">Error</h2>  
    <p>No se pudieron cargar los eventos</p>
    <p>${Date()}</p>
    </div>
    `;

    $("#evento").html(mensajeError);

    console.log(statusText + " Codigo del error: " + jQXhr.status);

  });
});
