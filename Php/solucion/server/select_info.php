<?php
  require('./conector.php');

  session_start();

  if (isset($_SESSION['username'])) {
    $con = new ConectorBD('localhost', 'james', 'james');
    if ($con->initConexion('transporte_db')=='OK') {
      $resultado = $con->consultar(['ciudades'], ['nombre']);
      $i=0;
      while ($fila = $resultado->fetch_assoc()) {
        $response['ciudades'][$i] = $fila['nombre'];
        $i++;
      }
      $resultado = $con->consultar(['vehiculos'], ['placa', 'fabricante', 'referencia']);
      $i=0;
      while ($fila = $resultado->fetch_assoc()) {
        $response['vehiculos'][$i] = $fila['placa']." (".$fila['fabricante']." ".$fila['referencia'].")";
        $i++;
      }
      $resultado = $con->consultar(['usuarios'], ['nombre']);
      $i=0;
      while ($fila = $resultado->fetch_assoc()) {
        $response['conductores'][$i] = $fila['nombre'];
        $i++;
      }
      $response['msg']= 'OK';
    }else {
      $response['msg']= 'No se pudo conectar a la base de datos';
    }
  }else {
    $response['msg']= 'No se ha iniciado una sesión';
  }

  echo json_encode($response);


 ?>
