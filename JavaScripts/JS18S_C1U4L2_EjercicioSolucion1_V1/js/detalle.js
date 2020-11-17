// Hemos omitido los acentos en los comentarios por compatibilidad

$(document).ready(function() {

    //cargando los datos
    $.ajax({
        url: "info.json"
    }).done(function(resultado) {

        //llenando la variable
        eventos = resultado.eventos;

        //obteniendo el id del url
        var id = location.search.match(/id=(\d)*/)[1]

        evento = eventos.find(function(element) {
                return element.id == id
            })
            //llenando dinamicamente los eventos
        var html = `
                <h2>${evento.nombre}</h2>
                <p>${evento.fecha}</p>
                <p>Lugar: ${evento.lugar}</p
                <p>Descripción: ${evento.descripcion}</p>
                <p>Costo: ${evento.precio}</p>
                <p>Invitados: ${evento.invitados}</p>
                `
        document.getElementById("evento").innerHTML = html
    });

});