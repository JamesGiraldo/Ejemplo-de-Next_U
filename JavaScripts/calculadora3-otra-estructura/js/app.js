var teclado = document.getElementsByClassName('teclado')[0];
var display = document.getElementById('display');
var tecla = document.getElementsByClassName('teclado');
console.log(tecla);
teclado.addEventListener('click', tecladoClick);
teclado.addEventListener('mousedown', tecladoMouseDown);
teclado.addEventListener('mouseup', tecladoMouseUp);

function tecladoClick(event){
  var target = event.target;
  var dataset = target.dataset;
  var valor = dataset.value;
  var tipo = dataset.type;
  if(tipo){
    calc.input(tipo, valor);
    if(tipo != 'operator'){
      resultado = calc.display();
      display.innerHTML = resultado;
    }
    if(tipo == 'operator'){
      display.innerHTML = null;
    }
  }
}
function tecladoMouseDown(event){
  var target = event.target;
  var dataset = target.dataset;
  var valor = dataset.value;
  var tipo = dataset.type;
  if(target && tipo){
    if(valor == "+"){
      target.style.height = "88%";
    }
    else {
      target.style.height = '60.20px';
      //target.style.width = '20%';
    }
  }
}
function tecladoMouseUp(event){
  var target = event.target;
  var dataset = target.dataset;
  var valor = dataset.value;
  var tipo = dataset.type;
  if(target && tipo){
    if(valor == "+"){
      target.style.height = '98%';
    }
    else{
      target.style.height = '62.91px';
      //target.style.width = '25%';
   }
  }
}


//Declaracion de constantes de los estados de la calculadora
const ESTADO_OPERANDO_IZQ = 'operando_izquierdo';
const ESTADO_OPERANDO_DER = 'operando_derecho';
const ESTADO_OPERADOR = 'operador';
const ESTADO_RESULTADO = 'resultado';

//Declaracion de cosntantes de las entradas segun la clasificacion de los dataset
const TIPO_NUMERO = 'number';
const TIPO_OPERADOR = 'operator';
const TIPO_ACCION = 'action';

//Declaracion de los operadores basicos de la calculadora
const OPERADOR_SUMA = '+';
const OPERADOR_RESTA = '-';
const OPERADOR_MULTIPLICACION = '*';
const OPERADOR_DIVISION = '/';

//Declaracion de las acciones que realiza la calculadora segun los dataset
const ACTION_RESET = 'C';
const ACTION_RESULTADO = '=';
const ACTION_SIGNO = '+/-';

//generacion de clases de encontradas para una calculadora basica
var punto = 0;
class EstrategiaBase{
  constructor(delegado){
    this.delegado = delegado;
  }
  esNumero(numero){

    if(numero == '.'){
      punto++;
    }
    //console.log("numero de puntos: " + punto);
    if(punto <= 1 || numero != '.'){
      if(this.delegado.acumulador.length<8){
        this.delegado.acumulador.push(numero);
      }
    }
  }
  esOperador(operador){}
  esResultado(){}
  esClear(){
    punto = 0;
    this.delegado.reset();
  }
  esSigno(){
    let local = this.delegado;
    if(local.getAcumulador()!=null && local.getAcumulador()>0){
      local.acumulador.unshift('-')
    }
    else{
      local.acumulador.shift();
    }
  }
}

class EstrategiaOperandoIzq extends EstrategiaBase{
  esOperador(operador){
    let local = this.delegado;
    local.setOperador(operador);
    local.setOperandoIzq(local.getAcumulador());
    local.transicion(ESTADO_OPERADOR);
  }
}
class EstrategiaOperador extends EstrategiaBase{
  esNumero(numero){
    let local = this.delegado;
    local.clearAcumulador();
    punto = 0;
    local.acumulador.push(numero);
    local.transicion(ESTADO_OPERANDO_DER);
  }
  esOperador(operador){
    this.delegado.setOperador(operador);
  }
  esResultado(){
    let local = this.delegado;
    local.setOperandoDer(local.getAcumulador());
    local.setAcumulador(local.operacion());
  }
}
class EstrategiaOperandoDer extends EstrategiaBase{
  esOperador(operador){
    let local = this.delegado;
    let resultado = 0;
    local.setOperandoDer(local.getAcumulador());
    resultado = local.operacion();
    local.setAcumulador(resultado);
    local.setOperandoIzq(resultado);
    local.setOperador(operador);
    local.transicion(ESTADO_OPERADOR);
  }
  esResultado(){
    let local = this.delegado;
    let resultado = 0;
    let operandoDer = 0;
    local.setOperandoDer(local.getAcumulador());
    resultado = local.operacion();
    local.setAcumulador(resultado);
    operandoDer = local.getOperandoDer();
    if(local.getOperador()===OPERADOR_RESTA){
      operandoDer = operandoDer * -1;
      local.setOperador(OPERADOR_SUMA);
    }
    if(local.getOperador()===OPERADOR_DIVISION){
      operandoDer = 1/operandoDer;
      local.setOperador(OPERADOR_MULTIPLICACION);
    }
    local.setOperandoIzq(operandoDer);
    local.transicion(ESTADO_RESULTADO);
  }
}

class EstrategiaResultado extends EstrategiaBase{
  esOperador(operador){
    let local = this.delegado;
    local.setOperador(operador);
    local.setOperandoIzq(local.getAcumulador());
    local.transicion(ESTADO_OPERADOR);
  }
  esResultado(){
    let local = this.delegado;
    local.setOperandoDer(local.getAcumulador());
    local.setAcumulador(local.operacion());
  }
}

// Clase calculadora que contendra los metodos de una calculadora basica
class Calculadora{
  constructor(){
    this.init();
  }
  init(){
    this.acumulador = [];
    this.operador = null;
    this.operandoIzq = 0;
    this.operandoDer = 0;
    this.estado = null;
    this.estrategia = null;
    this.transicion(ESTADO_OPERANDO_IZQ);
  }
  transicion(estado){
    this.estado = estado;
    switch (estado) {
      case ESTADO_OPERANDO_IZQ:
        this.estrategia = new EstrategiaOperandoIzq(this);
      break;
      case ESTADO_OPERANDO_DER:
        this.estrategia = new EstrategiaOperandoDer(this);
      break;
      case ESTADO_OPERADOR:
        this.estrategia = new EstrategiaOperador(this);
      break;
      case ESTADO_RESULTADO:
        this.estrategia = new EstrategiaResultado(this);
      break;
      default:break;
    }
  }
  input(tipo, valor){
    switch (tipo) {
      case TIPO_NUMERO:
          this.estrategia.esNumero(valor);
      break;
      case TIPO_OPERADOR:
          this.estrategia.esOperador(valor);
      break;
      case TIPO_ACCION:
          if(valor === ACTION_RESET){
            this.estrategia.esClear();
          }
          if(valor === ACTION_RESULTADO){
            this.estrategia.esResultado();
          }
         if(valor === ACTION_SIGNO){
            this.estrategia.esSigno();
          }
      break;
    }
    this.logger();//llamamos al metodo para imprimir en consola cada etapa,estado de la calculadora
  }
  operacion(){
    let operador = this.operador;
    let resultado = 0;
    switch (operador) {
      case OPERADOR_DIVISION:
        resultado = this.operandoIzq / this.operandoDer;
      break;
      case OPERADOR_MULTIPLICACION:
        resultado = this.operandoIzq * this.operandoDer;
      break;
      case OPERADOR_RESTA:
        resultado = this.operandoIzq - this.operandoDer;
      break;
      case OPERADOR_SUMA:
        resultado = this.operandoIzq + this.operandoDer;
      break;
      default:break;
    }
    console.log("El resultado es: "+resultado);
    return resultado;

  }

  //implementacion de los setter y getters
  setOperandoIzq(valor){
    this.operandoIzq = valor;
  }
  getOperandoIzq(){
    return this.operandoIzq;
  }

  setOperandoDer(valor){
    this.operandoDer = valor;
  }
  getOperandoDer(){
    return this.operandoDer;
  }

  setOperador(valor){
    this.operador = valor;
  }
  getOperador(){
    return this.operador;
  }

  setAcumulador(valor){
      this.acumulador = Array.from(String(valor));
  }
  getAcumulador(){
    if(this.acumulador.length <= 8){
      return parseFloat(this.acumulador.join(''));
    }
    else if(this.acumulador.length > 8){
      this.acumulador.slice(0,8);
      return parseFloat(this.acumulador.join(''));
    }
  }
  clearAcumulador(){
    this.acumulador = [];
  }

  reset(){
    this.init();
  }
  logger(){
    console.log({
      acumulador : this.acumulador,
      operandoIzq : this.operandoIzq,
      operador : this.operador,
      operandoDer : this.operandoDer,
      estado : this.estado
    });
  }

  display(){
    let resultado = 0;
    let punto = 0;
    if(this.acumulador.length>0){
        if(this.acumulador[0]==0 && this.acumulador[1]==0){
          this.clearAcumulador();
          resultado = 0;
          return resultado;
        }
        if(this.acumulador[0]==0 && this.acumulador[1]!='.'){
          this.clearAcumulador();
          resultado = 0;
          return resultado;
        }
        if(this.acumulador.length < 8){
          resultado = this.acumulador.join('');
        }
        else if(this.acumulador.length >= 8){
          resultado = this.acumulador.slice(0,8);
          resultado = resultado.join('');
          return resultado;
        }

    }
    return resultado;
  }
}

var calc = new Calculadora();