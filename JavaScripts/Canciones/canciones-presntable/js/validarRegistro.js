/*

Este archivo permite validar el formulario de registro cuando se presiona el botón submit o si se presiona enter.

*/

function validarRegistro(formulario){
    const reg_exp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(!reg_exp.test(formulario.email.value)){
        document.getElementById('errorCorreo').style.visibility='visible';
        formulario.email.focus();
        return false;
    }

    if(formulario.pass.value.trim().length<8){
        document.getElementById("errorPass").style.visibility='visible';
        formulario.pass.focus();
        return false;
    }

    if(formulario.pass.value != formulario.confirmation.value){
        document.getElementById('errorConfirmation').style.visibility='visible';
        formulario.confirmation.focus();
        return false;
    }

    if(formulario.favorite.value == ''){
        document.getElementById('errorSelect').style.visibility='visible';
        formulario.favorite.focus();
        return false;
    }

    if(formulario.age.value == ''){
        document.getElementById('errorAge').style.visibility='visible';
        return false;
    }

    if(!formulario.terms.checked){
        document.getElementById('errorTerms').style.visibility='visible';
        return false;
    }

    alert('!Registro exitoso!');
    return true;
}