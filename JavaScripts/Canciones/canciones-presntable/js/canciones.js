/*

Este archivo JS permite obtener lo que se escribe en el buscador para realizar un filtrado de las canciones de forma dinámica. Lee el archivo .JSON y muestra las canciones que coincidan con la búsqueda del usuario.

*/

// Inicializo una varaible que cambiará constantemente
let nombre = ''; 

// Esta función permite obtener el parámetro de búsqueda desde el formulario cada que se presione una tecla

function obtenerValor(formulario){
    nombre = formulario.buscar.value;
    cargarDatos();
}

// Esta función permite cargar las canciones cuando se abra por primera vez la página

$(document).ready(function () {
    cargarDatos();
});

//Esta función permite leer los datos del .JSON y filtrar de acuerdo con el valor de la variable nombre

function cargarDatos(){
    // Se cargan los datos
    $.ajax({
        url: "./datos.json"
        }).done(function (resultado) {
    
        // Se crea una lista de las canciones que contiene el .JSON
        canciones = resultado.canciones;
    
        // Si el valor del nombre es vacío, se muestran todas las canciones disponibles

        if(nombre==''){
            cancion = canciones;
        }else{

            // Caso contrario, se crea una lista en la variable cancion, que contiene las canciones que contienen el valor de nombre
            cancion = canciones.filter(element => element.nombre.includes(nombre));
        }
        
        // Cada que se realice una nueva búsqueda se eliminan los resultados anteriores
        $('.contenido').remove();
        let icon = '';
        let html = '';

        //La variable song contiene cada una de las canciones de la lista cancion que serán mostradas

        for(let song of cancion){
            icon = `icon_${song.icono}` +'.svg';
            // La variable icon se usa para especificar la ruta de la imagen SVG dentro de la carpeta local

            // La variable html crea una tarjeta por cada canción y las añade en la sección #songs del documento html
            html = `
        <div class="col-12 col-md-5 col-lg-4 contenido">
          <div class="card m-3 bg-light">
            <img src="./imagenes/${icon}" class="card-img-top w-50 m-auto" alt="icono cancion">
            <div class="card-body">
                <h4 class="card-title text-dark text-center pb-2">${song.nombre}</h4>
                <audio src="./canciones/${song.ruta}" controls class='w-100'></audio>
            </div>
          </div>
        </div>
        `
        $('#songs').append(html);
        }
        });
}


// Esta parte del código evita que se recargue la página al presionar enter en el campo de búsqueda ya que la búsqueda se realiza mientras se va escribiendo, sin la necesidad de un botón

$(document).ready(function() {
    $("form").keypress(function(e) {
        if (e.which == 13) {
            return false;
        }
    });
});
  
