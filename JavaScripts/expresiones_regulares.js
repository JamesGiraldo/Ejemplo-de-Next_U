//VALIDAR NUMEROS CON GUIONES
var numero = "123-1212-123"
var expresionRegular = /^[0-9,-]+$/;
console.log(expresionRegular.test(numero));


//VALIDAR FECHAS
var fecha = "12-01-1999"
var expresionRegular = /^([0-2][0-9]|3[0-1])(\/|-)(0[1-9]|1[0-2])\2(\d{4})$/
console.log(expresionRegular.test(fecha))


//VALIDAR 3 DIGITOS
var codigo = "123"
var expresionRegular = /^\D*\d{3}$/
console.log(expresionRegular.test(codigo))


function validarTelefono(){
    var numero = "123-1212-123";
    var expresionRegular = /^[0-9,-]+[0-9,-]+[0-9]$/;

    if(expresionRegular.test(numero)){
        return console.log("correcta");
    }else {
        return console.log("incorerrecta");
    }
}

validarTelefono();
function validarFecha(){
    var fecha= "ab12-12-2014";
    var expresionFecha = /^[0-9]{2}\-[0-9]{2}\-[0-9]{4}$/;

    if(expresionFecha.test(fecha)){
        return console.log("Fecha correcta");

    }else{
        return console.log("Fecha incorrecta");
    }
}

validarFecha();

function tamanoString(){
    var string = "1234";
    var expresionvalida = /^\d{3}$/;
    if(expresionvalida.test(string)){
        console.log("correcta");
    }
    else{
        console.log("incorrecta");
    }
}

tamanoString();
