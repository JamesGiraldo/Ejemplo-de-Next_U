/*

Este archivo permite validar caada campo mientras se va escribiendo o seleccionando las opciones, los mensajes de error se indican y se ocultan modificando la visibilidad

*/



// Valida el correo con una expresión regular mientras se va escribiendo

function validarCorreo(formulario){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(!re.test(formulario.email.value)){
        document.getElementById('errorCorreo').style.visibility='visible';
        formulario.email.focus();
    }else{
        document.getElementById('errorCorreo').style.visibility='hidden';
    }
}

// Se valida la contraseña mientras se va aescribiendo

function validarPass(formulario){
    if (formulario.pass.value.trim().length<8){
        document.getElementById("errorPass").style.visibility='visible';
        formulario.pass.focus();
    }else{
        document.getElementById("errorPass").style.visibility='hidden';
    }
}

// Se valida la confirmación de la contraseña mientras se va escribiendo

function validarConfirmation(formulario){
    if(formulario.pass.value != formulario.confirmation.value){
        document.getElementById('errorConfirmation').style.visibility='visible';
        formulario.confirmation.focus();
    }else{
        document.getElementById('errorConfirmation').style.visibility='hidden';
    }
}

// Indica un error si no se ha seleccionado una opción, una vez elegida la opción se retira el mensaje
function validarSelect(formulario){
    if(formulario.favorite.value == ''){
        document.getElementById('errorSelect').style.visibility='visible';
        formulario.favorite.focus();
    }else{
        document.getElementById('errorSelect').style.visibility='hidden';
    }
}

// Indica un error si no se ha seleccionado una opción y se oculta el mensaje de error una vez seleccionada
function validarAge(formulario){
    if(formulario.age.value == ''){
        document.getElementById('errorAge').style.visibility='visible';
    }else{
        document.getElementById('errorAge').style.visibility='hidden';
    }
}

// Indica un error si no se han aceptado los términos y condiciones, se retira el error una vez aceptado
function validarTerms(formulario){
    if(!formulario.terms.checked){
        document.getElementById('errorTerms').style.visibility='visible';
    }else{
        document.getElementById('errorTerms').style.visibility='hidden';
    }
}