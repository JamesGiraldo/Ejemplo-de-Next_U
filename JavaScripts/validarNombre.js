
// Selectores de campos + el valor que tiene el input
var inptNombres = document.getElementById("nombres").value;
// selector del span
var lblErrorNombres = document.getElementById("errornombres");
// variable que contiene errores
var contE = 0;
// funcion como tal
function sicontieneNumeros(campo, mensaje) {
  var regExp = new RegExp(/^([^0-9]*)$/);
  if (!regExp.test(campo)) {
    mensaje.innerText = "¡El nombre no debe contener números!";
    contE++;
  }
}
// llamar la función junto con los parametros que son las variables de los inputs y span
sicontieneNumeros(inptNombres, lblErrorNombres);
// oo

var expresion= [/0-9/];
if(expresion.test(formulario.nombre.value)){
document.getElementById("errorNombre").innerText= "No puedo poner numeros en su nombre";
formulario.nombre.focus()
return false;
}
