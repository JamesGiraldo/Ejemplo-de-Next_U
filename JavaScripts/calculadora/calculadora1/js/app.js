var calculador = {
  punto: document.getElementById("punto"),
  igual: document.getElementById("igual"),
  mas: document.getElementById("mas"),
  menos: document.getElementById("menos"),
  por : document.getElementById("por"),
  division: document.getElementById("dividido"),
  on: document.getElementById("on"),
  sign: document.getElementById("sign"),
  raiz: document.getElementById("raiz"),

  cero: document.getElementById("0"),
  uno: document.getElementById("1"),
  dos: document.getElementById("2"),
  tres: document.getElementById("3"),
  cuatro: document.getElementById("4"),
  cinco: document.getElementById("5"),
  seis: document.getElementById("6"),
  siete: document.getElementById("7"),
  ocho: document.getElementById("8"),
  nueve: document.getElementById("9"),

  pantalla: document.getElementById("display"),

  valoralmacenado: 0,
  operacion:"",
  operandoA: 0,
  operandoB: 0,

  init: function () {
    this.cero.addEventListener("click", this.ceroEvent);
    this.uno.addEventListener("click", this.unoEvent);
    this.dos.addEventListener("click", this.dosEvent);
    this.tres.addEventListener("click", this.tresEvent);
    this.cuatro.addEventListener("click", this.cuatroEvent);
    this.cinco.addEventListener("click", this.cincoEvent);
    this.seis.addEventListener("click", this.seisEvent);
    this.siete.addEventListener("click", this.sieteEvent);
    this.ocho.addEventListener("click", this.ochoEvent);
    this.nueve.addEventListener("click", this.nueveEvent);

    this.punto.addEventListener("click", this.puntoEvent);
    this.igual.addEventListener("click", this.igualEvent);
    this.on.addEventListener("click", this.onEvent);

    calculador.pantalla.textContent = "0";

    this.clickBotones();


  },

  ceroEvent: function () {
  if (calculador.pantalla.textContent != "0")
    if (calculador.pantalla.textContent.length <= 7)
      calculador.pantalla.textContent += "0";
},

  unoEvent: function () {
  if (calculador.pantalla.textContent.length <= 7)
    if (calculador.pantalla.textContent == "0")
       calculador.pantalla.textContent = "1";
    else
    calculador.pantalla.textContent += "1";
},

  dosEvent: function () {
  if (calculador.pantalla.textContent.length <= 7)
    if (calculador.pantalla.textContent == "0")
      calculador.pantalla.textContent = "2";
    else
    calculador.pantalla.textContent += "2";

  },

  tresEvent: function () {
    if (calculador.pantalla.textContent.length<=7) {
      if (calculador.pantalla.textContent=="0") {
        calculador.pantalla.textContent="3";
      }
      else {
        calculador.pantalla.textContent +="3";
      }
    }

  },

  cuatroEvent: function () {
    if (calculador.pantalla.textContent.length<=7) {
      if (calculador.pantalla.textContent=="0") {
        calculador.pantalla.textContent="4";
      }
      else {
        calculador.pantalla.textContent +="4";
      }
    }

  },

  cincoEvent: function () {
    if (calculador.pantalla.textContent.length<=7) {
      if (calculador.pantalla.textContent=="0") {
        calculador.pantalla.textContent="5";
      }
      else {
        calculador.pantalla.textContent +="5";
      }
    }

  },

  seisEvent: function () {
    if (calculador.pantalla.textContent.length<=7) {
      if (calculador.pantalla.textContent=="0") {
        calculador.pantalla.textContent="6";
      }
      else {
        calculador.pantalla.textContent +="6";
      }
    }

  },

  sieteEvent: function () {
    if (calculador.pantalla.textContent.length<=7) {
      if (calculador.pantalla.textContent=="0") {
        calculador.pantalla.textContent="7";
      }
      else {
        calculador.pantalla.textContent +="7";
      }
    }

  },

  ochoEvent: function () {
    if (calculador.pantalla.textContent.length<=7) {
      if (calculador.pantalla.textContent=="0") {
        calculador.pantalla.textContent="8";
      }
      else {
        calculador.pantalla.textContent +="8";
      }
    }

  },

  nueveEvent: function () {
    if (calculador.pantalla.textContent.length<=7) {
      if (calculador.pantalla.textContent=="0") {
        calculador.pantalla.textContent="9";
      }
      else {
        calculador.pantalla.textContent +="9";
      }
    }

  },

  puntoEvent: function () {
    if (calculador.pantalla.textContent.indexOf(".")  == -1)
      if (calculador.pantalla.textContent.length <= 7)
        if (calculador.pantalla.textContent == "0")
        calculador.pantalla.textContent = "0.";
    else
    calculador.pantalla.textContent += ".";

  },

  onEvent: function () {
    calculador.pantalla.innerHTML = "0"
  },

  clickBotones: function () {
    const listID = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "punto", "igual", "mas", "menos", "por", "dividido", "on", "sign", "raiz"]

    for (const item of listID) {
    setTimeout(function () {
      var doc = document.getElementById(item);

      doc.addEventListener('mousedown', function () {
        doc.setAttribute("style", "transform:scale(0.95,0.95)");
      })

      doc.addEventListener('mouseup', function () {
      doc.setAttribute("style", "transform:scale(1,1)");
      })
    }, 200)
    }
  },

  suma: function () {
    this.operacion="+";
    this.operandoA=this.pantalla.innerHTML;
    this.pantalla.textContent=" ";
  },

  resta: function () {
    this.operacion="-";
    this.operandoA=this.pantalla.innerHTML;
    this.pantalla.textContent=" ";
  },

  multiplica:function () {
    this.operacion="*";
    this.operandoA=this.pantalla.innerHTML;
    this.pantalla.textContent=" ";
  },

  divide: function () {
    this.operacion="/";
    this.operandoA=this.pantalla.innerHTML;
    this.pantalla.textContent=" ";
  },

  oIgual: function () {
    this.operandoB= this.pantalla.innerHTML;
    var resultado= 0;
    switch (this.operacion) {
      case "+":
        resultado =parseFloat(this.operandoA)  + parseFloat(this.operandoB);
        break;

      case "-":
        resultado =parseFloat(this.operandoA)  - parseFloat(this.operandoB);
        break;

      case "*":
        resultado =parseFloat(this.operandoA)  * parseFloat(this.operandoB);
        break;

      default:
        resultado =parseFloat(this.operandoA)  / parseFloat(this.operandoB);
        break;
    }
    this.pantalla.innerHTML = resultado.toString().substring(0, 8);
    console.log(this.operacion);
  },

  realesNumeros: function () {
    this.pantalla.innerHTML=this.pantalla.innerHTML*-1;

  }


}

calculador.init();
