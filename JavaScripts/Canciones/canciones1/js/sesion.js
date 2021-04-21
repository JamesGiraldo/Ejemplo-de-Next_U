function limpiarErrores() {
    var errores = $(".error");
    for (var i = 0; i < errores.length; i++) {
        errores[i].innerHTML = "";
    }
}

function validar() {
    var correo = $("#inputEmail").val().trim();
    var clave = $("#inputPassword").val().trim();
    limpiarErrores();

    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test($('#inputEmail').val().trim())) {} else {
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
}

$(document).ready(function () {
    $("#enviar").click(function () {
        validar();
    });
});
