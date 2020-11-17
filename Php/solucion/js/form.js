$(function(){
  $('select').material_select();
  $('.datepicker').pickadate({
    selectMonths: true,
    selectYears: 50,
    format: 'yyyy-mm-dd'
  });


  $('#formulario').submit(function(event){
    event.preventDefault();
    checkContrasena();
  })
})

function checkContrasena(){
  var contrasena = $('#contrasena').val();
  var repContrasena = $('#contrasenaRepetida').val();

  if (contrasena===repContrasena) {
    getDatos();

  }else {
    alert('Las contraseñas no coinciden')
  }
}

function getDatos(){
  var form_data = new FormData();
  form_data.append('nombre', $('#nombre').val());
  form_data.append('fechaNacimiento', $('#fechaNacimiento').val());
  form_data.append('sexo', $('input[name="sexo"]').val());
  form_data.append('automovil', document.getElementById('check1').checked);
  form_data.append('bus', document.getElementById('check2').checked);
  form_data.append('email', $('#email').val());
  form_data.append('fueraCiudad', document.getElementById('fueraCiudad').checked);
  form_data.append('experiencia', $('#experiencia').val());
  form_data.append('contrasena', $('#contrasena').val());
  sendForm(form_data);
}

function sendForm(formData){
  $.ajax({
    url: 'server/create_user.php',
    dataType: "json",
    cache: false,
    processData: false,
    contentType: false,
    data: formData,
    type: 'POST',
    success: function(php_response){
      if (php_response.msg == "exito en la inserción") {
        window.location.href = 'welcome.html';
      }else {
        alert(php_response.msg);
      }
    },
    error: function(){
      alert("error en la comunicación con el servidor");
    }
  })
}
