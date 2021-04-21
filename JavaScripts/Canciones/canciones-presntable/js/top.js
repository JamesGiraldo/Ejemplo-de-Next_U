/*

Este documento permite mostrar en la página de inicio las 3 canciones con más reproducciones. Si se realiza un cambio en el número de reproducciones desde el archivo .JSON se actualiza en la página después de 5 minutos sin necesidad de recargarla (Probado en un servidor local usando MAMP)

*/

// Esta función me permite cargar las canciones del top 3 cuando se abra la página

$(document).ready(function(){
    cancionesTop();
});

// Esta función permite obtener las canciones con más reproducciones y mostrarlas en la página

function cancionesTop(){
    // Se cargan los datos
    $.ajax({
        url: './datos.json',
        complete: function(){
            // Me permite actualizar las canciones en el top 3 cada 5 minutos sin recargar la página
            setTimeout(cancionesTop, 60 * 1000 * 5);
        }
    }).done(function(resultado){
        // Se eliminan las canciones anteriores en cada actualziación de datos
        $('.mostrar').remove();

        // Se guardan las canciones del JSON en un array

        canciones = resultado.canciones;

        // Se ordena el arreglo de canciones de mayor a menor

        canciones.sort(function(a, b){
            if(a.reproducciones > b.reproducciones){
                return -1;
            }
            if(a.reproducciones < b.reproducciones){
                return 1;
            }
            return 0;
        })

        // se eligen las tres canciones con mayor número de reproducciones y se añade al documento html
        for(let top = 0; top < 3; top++){
           cancion = `
           <tr class = 'mostrar'>
              <td class="d-none d-md-table-cell">${canciones[top].nombre}</td>
              <td><audio src="./canciones/${canciones[top].ruta}" controls class="w-100"></audio></td>
            </tr>
            `
            $('#top3').append(cancion); 
        }
    })
}
