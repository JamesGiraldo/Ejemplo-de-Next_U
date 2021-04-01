/** selector de identificadores en el html elemento(id="nombre") */
var palabra = document.getElementById('nombre');
/** selector de identificadores en el html elemento(id="error") */
var error = document.getElementById('errores');
/** Función que se encarga de validar el campo nombre */
function validarNombre() {
    /** Expresión regular */
    var letters = /^[a-zA-Z ]+$/g;
    /** condición */
    if (letters.test(palabra.value) == false && palabra.value.length>0) {
        error.innerHTML = ' Solo debe existir Texto ';
    } else {
        if (palabra.value.length < 3) {
          if(palabra.value.length==0){
             error.innerHTML = ' No debe estar vacio';
            }else{
            error.innerHTML = ' Debe contener mas de dos caracteres';}
        } else {
            error.innerHTML = '';
        }
    }
}
