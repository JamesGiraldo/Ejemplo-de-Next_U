function limpiarErrores() {
    var errores = $(".error");
    for (var i = 0; i < errores.length; i++) {
        errores[i].innerHTML = "";
    }
}

function validar() {
    var correo = $("#inputEmail").val().trim();
    var clave = $("#inputPassword").val().trim();
    var clave1 = $("#confirmaPassword").val().trim();
    var genero = $("#genero").val();
    limpiarErrores();

    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test($('#inputEmail').val().trim())) {
    }else {
        $("#errorEmail").append("Correo incorrecto");
        $("#inputEmail").focus();
        return false;
    }

    if (correo.length == 0) {
        $("#errorEmail").append("Campo obligatorio");
        $("#inputEmail").focus();
        return false;
    }

    if (clave.length == 0) {
        $("#errorPassword").append("Campo obligatorio");
        $("#inputPassword").focus();
        return false;
    }

    if (clave.length < 8) {
        $("#errorPassword").append("Campo inválido (Mínimo 8 caracteres)");
        $("#inputPassword").focus();
        return false;
    }

    if (clave != clave1) {
        $("#errorconfirmaPassword").append("Confirmación no coincide");
        $("#confirmaPassword").focus();
        return false;
    }

    if (genero == "" || genero == "Seleccione...") {
        $("#errorGenero").append("Campo obligatorio");
        return false;
    }

    if ($('input[name="exampleRadios"]').is(':checked')) {
    } else {
        $("#errorEdad").append("Campo obligatorio");
        return false;
    }

    if ($('input[name="terminos"]').is(':checked')) {
    } else {
        $("#errorTerminos").append("Debe aceptar los términos y condiciones");
        return false;
    }

    alert("Datos enviados");

    return true;
}

$(document).ready(function () {
    //$("#button").click(function (event) {
    $("#enviar").click(function () {
        validar();
    });
});
