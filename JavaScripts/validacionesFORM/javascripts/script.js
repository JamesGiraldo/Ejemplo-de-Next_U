function limpiarErrores(){
  var errores = document.getElementsByClassName("error");
  for(var i = 0; i < errores.length; i++){
    errores[i].innerHTML = "";
  }
}

function validar(formulario) {

  limpiarErrores();

  if (formulario.nombre.value.trim().length == 0) {
    document.getElementById("errorNombre").innerText = "Campo obligatorio";
    formulario.nombre.focus();
    return false;
  }

  if (formulario.nombre.value.trim().length < 3) {
    document.getElementById("errorNombre").innerText = "Campo inválido";
    formulario.nombre.focus();
    return false;
  }

  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test(formulario.email.value)) {
    document.getElementById("errorEmail").innerText = "Campo inválido";
    formulario.email.focus();
    return false;
  }

  if (formulario.contrasena.value.trim().length == 0) {
    document.getElementById("errorContrasena").innerText = "Campo obligatorio";
    formulario.contrasena.focus();
    return false;
  }

  if (formulario.contrasena.value.trim().length < 6) {
    document.getElementById("errorContrasena").innerText = "Campo inválido (Mínimo 6 caracteres)";
    formulario.contrasena.focus();
    return false;
  }

  if (formulario.contrasena.value != formulario.confirmacion.value) {
    document.getElementById("errorConfirmacion").innerText = "Confirmación no coincide";
    formulario.confirmacion.focus();
    return false;
  }

  if (formulario.genero.value == "") {
    document.getElementById("errorGenero").innerText = "Campo obligatorio";
    return false;
  }

  if (formulario.pais.value == "") {
    document.getElementById("errorPais").innerText = "Campo obligatorio";
    formulario.pais.focus();
    return false;
  }

  if (!formulario.terminos.checked) {
    document.getElementById("errorTerminos").innerText = "Debe aceptar los términos y condiciones";
    formulario.terminos.focus();
    return false;
  }

  alert("Datos enviados");

  return true;
}
