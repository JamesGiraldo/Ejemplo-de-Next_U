var calculadora = function(){
	var resultado = document.getElementById('display');
	var reset = document.getElementById('on');
	var signo = document.getElementById('sign');
	var raiz = document.getElementById('raiz');
	var dividir = document.getElementById('dividido');
	var multiplicar = document.getElementById('por');
	var restar = document.getElementById('menos');
	var punto = document.getElementById('punto');
	var igual = document.getElementById('igual');
	var sumar = document.getElementById('mas');
	var cero = document.getElementById('0');
	var uno = document.getElementById('1');
	var dos = document.getElementById('2');
	var tres = document.getElementById('3');
	var cuatro = document.getElementById('4');
	var cinco = document.getElementById('5');
	var seis = document.getElementById('6');
	var siete = document.getElementById('7');
	var ocho = document.getElementById('8');
	var nueve = document.getElementById('9');

	var operando1;
	var operando2;
	var operacion;


	var num1 = document.getElementById('display').innerHTML;
		
	function darNumero(numero){
            if(num1==0 && num1 !== '0.'&& num1 !=='0.0'){
                num1 = numero.toString();
            }else{
                num1 += numero;
               
            }
	         refrescar();
        }


         function darPunto(){
            if(num1 == 0) {
                num1 = '0.';
            } else if(num1.indexOf('.') == -1) {
                num1 += '.';
            }
            refrescar();
        }
//eventos teclas
	uno.onclick = function(e){
		numero="1";

		darNumero(numero)
		
	}
	dos.onclick = function(e){
		numero="2";
		darNumero(numero)
		
	}
	tres.onclick = function(e){
		numero="3";
		darNumero(numero)
		
	}
	cuatro.onclick = function(e){
		numero="4";
		darNumero(numero)
		
	}
	cinco.onclick = function(e){
		numero="5";
		darNumero(numero)
		
	}
	seis.onclick = function(e){
		numero="6";
		darNumero(numero)
		
	}
	siete.onclick = function(e){
		numero="7";
		darNumero(numero)
		
	}
	ocho.onclick = function(e){
		numero="8";
		darNumero(numero)
		
	}
	nueve.onclick = function(e){
		numero="9";
		darNumero(numero)
		
	}
	cero.onclick = function(e){
		numero="0";
		darNumero(numero)
		
	}
	punto.onclick = function(e){
		darPunto()
		
	}
	reset.onclick = function(e){
		resultado.innerHTML="0"
		num1="";
		operando1=0;
		operando2=0;
		operacion=""
	}

	signo.onclick =function() { 
		num1 = Number(num1)
		if(num1 == -num1){
			num1 = num1
			num1=string(num1)
		}else{
            num1=Number(num1); //convertir en número
            num1=-num1; //cambiar de signo
            num1=String(num1); //volver a convertir a cadena
            display.innerHTML=num1; //mostrar en pantalla.
          }  }
	 
			function refrescar(){
			document.getElementById("display").innerHTML = num1.toString().substring(0,8);
			}
        	//Se cambia el tamaño  de la tecla en el evento click
		var listId = [
		"0",
		"1", "2", "3",
		"4", "5", "6",
		"7", "8", "9",
		"mas", "menos", "por",
		"dividido", "raiz", "sign",
		"punto", "igual", "on"]

		listId.forEach( function (idKeyboard) {
		addStyleButtons(idKeyboard)
		});

		function addStyleButtons (idKeyboard) {
		var doc = document.getElementById(idKeyboard);
		doc.addEventListener('mousedown',function () {
		doc.setAttribute("style", "transform:scale(0.95,0.95)");
		})
		doc.addEventListener('mouseup', function() {
		doc.setAttribute("style", "transform:scale(1,1)");
		})
		}

		//Operaciones aritmeticas

		sumar.onclick=function(){
			operando1=Number(num1);
			operacion="+";
			limpiar()
		}
		restar.onclick=function(){
			operando1=Number(num1);
			operacion="-";
			limpiar()
		}
		multiplicar.onclick=function(){
			operando1=Number(num1);
			operacion="*";
			limpiar()
		}
		dividir.onclick=function(){
			operando1=Number(num1);
			operacion="/";
			limpiar()
		}
		raiz.onclick=function(){
			operando1=Number(num1)
			operacion="raiz"
			resolver();
		}
		igual.onclick=function(){
			operando2 = Number(num1);
			resolver();
		}


		function limpiar(){
			num1="";
			resultado.innerHTML=""
		}
		function resolver(){
			var res=0;
			switch(operacion){
				case "+":
				res = parseFloat(operando1) + parseFloat(operando2);
				break;
				case "-":
				res = parseFloat(operando1) - parseFloat(operando2);
				break;
				case "*":
				res = parseFloat(operando1) * parseFloat(operando2);
				break;
				case "/":
				res = parseFloat(operando1) / parseFloat(operando2);
				break;
				case "raiz":
				res=Math.sqrt(operando1);
				break
			}
			num1=res;
			resultado.innerHTML=res.toString().substring(0, 8);
		}
}
calculadora()

