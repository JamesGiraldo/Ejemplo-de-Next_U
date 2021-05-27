// Hemos omitido los acentos en los comentarios por compatibilidad

function validar(formulario) {

  //Validar Nulos
  try {
    //Campos
    var inptNombres = document.getElementById("nombres").value;
    var inptEmail = document.getElementById("email").value;
    var inptContrasena = document.getElementById("contrasena").value;
    var inptConfirmacion = document.getElementById("confirmacion").value;
    var slctTipo = document.getElementById("tipo").value;
    var chkAcepto = document.getElementById("acepto");

    //Mensajes de Error
    var lblErrorNombres = document.getElementById("errornombres");
    var lblErrorEmail = document.getElementById("errorEmail");
    var lblErrorContrasena = document.getElementById("errorContrasena");
    var lblErrorConfirmacion = document.getElementById("errorConfirmacion");
    var lblErrorTipo = document.getElementById("errorTipo");
    var lblErrorAcepto = document.getElementById("errorAcepto");

    //Contador de errores
    var contE = 0;
    borrarMensajes();

    //Funciones de validacion de campos
    function esVacio(campo, mensaje) {
      if (campo == "") {
        mensaje.innerText = "¡El campo no puede estar vacío!";
        contE++;
      }
    }

    function esCorto(campo, logitud, mensaje) {
      if (campo.length < logitud) {
        mensaje.innerText = "¡La longitud del campo debe ser de " + logitud + " o más caracteres!";
        contE++;
      }
    }

    function contieneNumeros(campo, mensaje) {
      var regExp = new RegExp(/^([^0-9]*)$/);
      if (!regExp.test(campo)) {
        mensaje.innerText = "¡El nombre no debe contener números!";
        contE++;
      }
    }

    function esCorreoInvalido(campo, mensaje) {
      var regExp = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
      if (!regExp.test(campo)) {
        mensaje.innerText = "¡El email ingresado no es valido!";
        contE++;
      }
    }

    function esTipoInvalido(campo, mensaje) {
      if (campo == "-1") {
        mensaje.innerText = "¡Debes seleccionar un tipo de usuario!";
        contE++;
      }
    }

    function esConfirmacionDistinta(contraseña, confirmacion, mensaje) {
      if (contraseña != confirmacion) {
        mensaje.innerText = "¡Las contraseñas deben coincidir!";
        contE++;
      }
    }

    function noAceptoTerminos(campo, mensaje) {
      if (campo.checked == false) {
        mensaje.innerText = "¡Debe aceptar los terminos y condiciones!";
        contE++;
      }
    }

    function borrarMensajes() {
      lblErrorNombres.innerText = "";
      lblErrorEmail.innerText = "";
      lblErrorContrasena.innerText = "";
      lblErrorConfirmacion.innerText = "";
      lblErrorTipo.innerText = "";
      lblErrorAcepto.innerText = "";
    }

    //Validar campos

    //Nombre Lng minima 7
    esVacio(inptNombres, lblErrorNombres);
    esCorto(inptNombres, 7, lblErrorNombres);
    contieneNumeros(inptNombres, lblErrorNombres);

    //Email Lng minima 7
    esVacio(inptEmail, lblErrorEmail);
    esCorto(inptEmail, 7, lblErrorEmail);
    esCorreoInvalido(inptEmail, lblErrorEmail);

    //Contraseña Lng minima 7
    esVacio(inptContrasena, lblErrorContrasena);
    esCorto(inptContrasena, 7, lblErrorContrasena);

    //Confirmación
    esCorto(inptConfirmacion, 7, lblErrorConfirmacion);
    esConfirmacionDistinta(inptContrasena, inptConfirmacion, lblErrorConfirmacion);

    //Tipo
    esTipoInvalido(slctTipo, lblErrorTipo);

    //Checkbox
    noAceptoTerminos(chkAcepto, lblErrorAcepto);

    if (contE > 0) {
      return false;
    } else {
      return true;
    }

  } catch (error) {
    console.log("Uno o más campos del formulario no fueron Refenciados correctamente " + error);
    return false;
  }

  //Expresion regular del correo
  return true;
}
