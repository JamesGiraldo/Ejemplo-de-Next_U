$(function(){
  $('#logout').click(function(){
    logoutRequest();
  })

  getInitData();
  $('.modal').modal();

})



function getInitData(){
  $.get('server/welcome.php', function(data){
    if (data.msg == 'OK') {
      $('div.primera').find('h1').append(data.nombre);
      $.each(data.infoViajes, function(key, value){
        $('#table-body').append(`
          <tr>
            <td>${value['ciudad_origen']}</td>
            <td>${value['ciudad_destino']}</td>
            <td>${value['placa']}</td>
            <td>${value['fabricante']} ${value['referencia']}</td>
            <td>${value['fecha_salida']}</td>
            <td>${value['fecha_llegada']}</td>
            <td>${value['hora_salida']}</td>
            <td>${value['hora_llegada']}</td>
          </tr>
          `)
      })
    }else {
      alert(data.msg);
      window.location.href = "index.html";
    }

  }, 'json')
  .fail(function() {
    alert( "Se presentó un error" );
  })

}

function logoutRequest(){
  $.ajax({
    url: 'server/logout.php',
    dataType: "text",
    cache: false,
    processData: false,
    contentType: false,
    type: 'GET',
    success: function(php_response){
      window.location.href = 'index.html';
    },
    error: function(){
      alert("error en la comunicación con el servidor");
    }
  })
}

//function addViaje()
