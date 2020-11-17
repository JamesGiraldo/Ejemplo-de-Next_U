/*
  Creación de una función personalizada para jQuery que detecta cuando se detiene el scroll en la página
*/




$.fn.scrollEnd = function(callback, timeout) {
  $(this).scroll(function(){
    var $this = $(this);
    if ($this.data('scrollTimeout')) {
      clearTimeout($this.data('scrollTimeout'));
    }
    $this.data('scrollTimeout', setTimeout(callback,timeout));
  });
};
/*
  Función que inicializa el elemento Slider
*/

function inicializarSlider(){
  $("#rangoPrecio").ionRangeSlider({
    type: "double",
    grid: false,
    min: 0,
    max: 100000,
    from: 200,
    to: 80000,
    prefix: "$"
  });
}
/*
  Función que reproduce el video de fondo al hacer scroll, y deteiene la reproducción al detener el scroll
*/
function playVideoOnScroll(){
  var ultimoScroll = 0,
      intervalRewind;
  var video = document.getElementById('vidFondo');
  $(window)
    .scroll((event)=>{
      var scrollActual = $(window).scrollTop();
      if (scrollActual > ultimoScroll){
       video.play();
     } else {
        //this.rewind(1.0, video, intervalRewind);
        video.play();
     }
     ultimoScroll = scrollActual;
    })
    .scrollEnd(()=>{
      video.pause();
    }, 10)
}

function llenarCiudad(){
  $.ajax({
    type: "GET",
    url: 'data-1.json',
    dataType: "json",
    success: function(data){

    var items = {},
      base, key1;
      $.each(data,function(key, registro) {
        key1 = registro.Ciudad;

        if (!items[key1]) {
          items[key1] = [];
          $("#selectCiudad").append('<option value="'+registro.Ciudad+'">'+registro.Ciudad+'</option>');
          //alert(registro.Ciudad);
        }
        items[key1].push(registro.Ciudad);
      });
    },
    error: function(data) {
      alert('error');
    }
  });

}


function llenarTipo(){
  $.ajax({
    type: "GET",
    url: 'data-1.json',
    dataType: "json",
    success: function(data){

    var items = {},
      base, key1;
      $.each(data,function(key, registro) {
        key1 = registro.Tipo;

        if (!items[key1]) {
          items[key1] = [];
          $("#selectTipo").append('<option value="'+registro.Tipo+'">'+registro.Tipo+'</option>');
        }
        items[key1].push(registro.Tipo);
      });
    },
    error: function(data) {
      alert('error');
    }
  });
}





inicializarSlider();
playVideoOnScroll();
llenarCiudad();
llenarTipo()
