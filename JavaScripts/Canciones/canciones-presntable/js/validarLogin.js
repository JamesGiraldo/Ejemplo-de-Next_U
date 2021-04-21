/* 

Este archivo permite validar el formulario de inicio de sesión cuando se presiona el botón submit o se presiona enter
Despliega un mensaje cuando todos los campos han sido ingresados correctamente

*/

function validar(formulario){
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

    alert('!Ingresó correctamente!');
    return true;
}
