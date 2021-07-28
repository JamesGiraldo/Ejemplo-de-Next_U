var eventos = [];


function iniciarEventos() {
  for (var i = 1; i < 200; i++) {
    eventos.push({
      nombre: "Evento " + i,
      descripcion: "Esta es la descripción del evento " + i,
    })
  }
}

function llenarEventos() {
  for (var i = 0; i < 5; i++) {
    var nombre = document.createElement("h2");
    var contenidoNombre = document.createTextNode(eventos[i].nombre);
    nombre.appendChild(contenidoNombre);

    var descripcion = document.createElement("p");
    var contenidoDescripcion = document.createTextNode(eventos[i].descripcion);
    descripcion.appendChild(contenidoDescripcion);

    var separador = document.createElement("hr");

    document.getElementById("eventos").appendChild(nombre);
    document.getElementById("eventos").appendChild(descripcion);
    document.getElementById("eventos").appendChild(separador);
  }
}

  var aux=5;
function llenarMas() {
  aux=aux+5;
  
  for (var i = aux-5; i < aux; i++) {
    
    var nombre = document.createElement("h2");
    var contenidoNombre = document.createTextNode(eventos[i].nombre + " (LUEGO DEL Cargarmas)");
    nombre.appendChild(contenidoNombre);

    var descripcion = document.createElement("p");
    var contenidoDescripcion = document.createTextNode(eventos[i].descripcion);
    descripcion.appendChild(contenidoDescripcion);

    var separador = document.createElement("hr");

    document.getElementById("eventos").appendChild(nombre);
    document.getElementById("eventos").appendChild(descripcion);
    document.getElementById("eventos").appendChild(separador);
  }
}



function scrollMas() {
  aux=aux+5;
  
  for (var i = aux-5; i < aux; i++) {
    
    var nombre = document.createElement("h2");
    var contenidoNombre = document.createTextNode(eventos[i].nombre + " (LUEGO DEL SCROLL)");
    nombre.appendChild(contenidoNombre);

    var descripcion = document.createElement("p");
    var contenidoDescripcion = document.createTextNode(eventos[i].descripcion);
    descripcion.appendChild(contenidoDescripcion);

    var separador = document.createElement("hr");

    document.getElementById("eventos").appendChild(nombre);
    document.getElementById("eventos").appendChild(descripcion);
    document.getElementById("eventos").appendChild(separador);
  }
}

document.addEventListener("scroll", function (Evento) {
  if ((window.scrollY / (window.outerHeight - window.innerHeight)) > 0.5) {
    scrollMas();
  }
})

/* Listener Boton */
var boton=document.getElementById('btn');
boton.addEventListener("click", function () {
  
    llenarMas();
  
})


iniciarEventos();
llenarEventos();
scrollMas();




