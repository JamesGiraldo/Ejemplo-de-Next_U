<!-- <?php
//----------------Tomando Datos del Formulario
$ciudad = (isset($_POST['ciudad'])) ? $_POST['ciudad'] : "";
$tipo = (isset($_POST['tipo'])) ? $_POST['tipo'] : "";
$precio = (isset($_POST['precio'])) ? $_POST['precio'] : "";

//---------------Filtrando Informacion Personalizada
$Min = substr($precio, 0, strpos($precio,";"));
$Max = substr($precio,strpos($precio,";")+1,20);
// echo "You ordered ".  substr($precio, 0, strpos($precio,";")) . ".<br />";
// echo "You ordered ".  substr($precio,strpos($precio,";")+1,20) . ".<br />";
 ?>

<script>
 function MostrarFiltro(ciudad,tipo){
   $.ajax({
     type: "GET",
     url: 'data-1.json',
     dataType: "json",
     success: function(data){

     $(".item").html("");
       $.each(data,function(data, registro) {
         if (registro.ciudad == ciudad && registro.Tipo == Tipo) {


             var html = "";
             html +="<div class='col s12 m7'>";
             html +="<div class='card itemMostrado'>";
             html +="<img  src='img/home.jpg'>";
             html +="<div class='card-stacked'>";
             html +="<div class='card-content'>";
             html +="<p><b> Dirección: </b>"+ registro.Direccion +"</p>";
             html +="<p><b> Ciudad: </b>"+ registro.Ciudad +"</p>";
             html +="<p><b> Teléfono: </b>"+ registro.Telefono +"</p>";
             html +="<p><b> Codigo Postal: </b>"+ registro.Codigo_Postal +"</p>";
             html +="<p><b> Tipo: </b>"+ registro.Tipo +"</p>";
             html +="<p><b> Precio : </b><label class='precioTexto'>"+ registro.Precio+"</p>";
             html +="</div>";
             html +="<div class='card-action'>";
             html +="<a href=''#''>VER MAS</a>";
             html +="</div>";
             html +="</div>";
             html +="</div>";
             html +="</div>";


           $(".item").append(html);
                    }
       });
     },
     error: function(data) {
       alert('error');
     }
   });
 }
 </script> -->
