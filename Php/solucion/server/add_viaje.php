<?php
  require('./conector.php');

  session_start();

  if (isset($_SESSION['username'])) {
    $con = new ConectorBD('localhost', 'james', 'james');
    if ($con->initConexion('transporte_db')=='OK') {
      $resultado = $con->consultar(['ciudades'],['id'], "WHERE nombre ='" .$_POST['ciudad_origen']."'");
      $fila = $resultado->fetch_assoc();
      $data['fk_ciudad_origen'] = $fila['id'];
      $resultado = $con->consultar(['ciudades'],['id'], "WHERE nombre ='" .$_POST['ciudad_destino']."'");
      $fila = $resultado->fetch_assoc();
      $data['fk_ciudad_destino'] = $fila['id'];
      $data['fk_vehiculo'] = "'".$_POST['vehiculo']."'";
      $resultado = $con->consultar(['usuarios'],['id'], "WHERE nombre ='" .$_POST['conductor']."'");
      $fila = $resultado->fetch_assoc();
      $data['fk_conductor'] = $fila['id'];
      $data['fecha_salida'] = "'".$_POST['fecha_salida']."'";
      $data['hora_salida'] = "'".$_POST['hora_salida']."'";

      if ($con->insertData('viajes', $data)) {
        $response['msg']= 'OK';
      }else {
        $response['msg']= 'No se pudo realizar la inserción de los datos';
      }
    }else {
      $response['msg']= 'No se pudo conectar a la base de datos';
    }
  }else {
    $response['msg']= 'No se ha iniciado una sesión';
  }

  echo json_encode($response);

 ?>
