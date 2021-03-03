/** selector de identificadores en el html elemento(id="nombre") */
var nombre = document.getElementById('nombre');
/** selector de identificadores en el html elemento(id="error") */
var error = document.getElementById("error");
/** Expresión regular */
var expresion = /^[A-z]{0,9}$/;

/** Función para Validar form  */
function valido(e){
  /** Variable que contine el error por eso se declara primero vacia para poder usarla en la condición e imprimir texto despues */
  error.innerText = ""
  /** condición */
  if( !expresion.test( nombre.value ) ){
    error.innerText = "información incorrecta";
  }
}
/** selector de id="nombre" se le agrega el evento keypress junto la función valido */
document.getElementById('nombre').addEventListener('keypress', valido);
