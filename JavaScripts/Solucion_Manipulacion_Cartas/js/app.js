$( document ).ready(function() {

  //Evento para el botón mas (+)
  $("#mas").click(function(){
    $(".carta:last-of-type").after("<img src='image/back.jpg' class='carta'/>");
  });

  //Evento para el botón menos (-)
  $("#menos").click(function(){
    $(".carta:last-of-type").remove();
  });

  //Evento al hacer click en una carta
  $(document).on("click", "img.carta", function(){
    //Función que carga una imágen aleatoria a la carta
    $(this).attr("src",function(){
      var numero = Math.floor((Math.random() * 52) + 1);
      var ruta = "image/"+numero+".png";
      return ruta;
    });

    //Calculo del número de la carta en la baraja y muestra en pantalla
    var ruta = $(this).attr("src");
    var numeroCarta = ruta.slice(0,-4);
    numeroCarta = numeroCarta.substr(6,2);
    $("#contenido-pantalla").html("La carta es la número: <b>" + numeroCarta + "</b> de la baraja");
  });

  //Evento de hover
  $(document).on({
    //Función al mouse estar sobre la carta
    mouseenter: function(){
      $(this).addClass("carta-seleccionada");
      $(this).css("border","2px solid yellow");
    },

    //Función al mouse dejar la carta
    mouseleave: function(){
      $(this).removeClass("carta-seleccionada");
      $(this).addClass("carta");
      $(this).css("border","0px");
    }
  }, "img.carta");


});
