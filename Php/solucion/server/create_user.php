<?php

  include('conector.php');

  $data['nombre'] = "'".$_POST['nombre']."'";
  $data['fecha_nacimiento'] = "'".$_POST['fechaNacimiento']."'";
  $data['sexo'] = "'".$_POST['sexo']."'";
  $data['email'] = "'".$_POST['email']."'";
  $data['experiencia'] = "'".$_POST['experiencia']."'";
  $data['psw'] = "'".password_hash($_POST['contrasena'], PASSWORD_DEFAULT)."'";

  if ($_POST['automovil'] == true && $_POST['bus'] == true) {
    $data['tipo_vehiculo']= "'".'automovil y bus'."'";
  }
  if ($_POST['automovil'] == true && $_POST['bus'] == false) {
    $data['tipo_vehiculo']= "'".'automovil'."'";
  }
  if ($_POST['automovil'] == false && $_POST['bus'] == true) {
    $data['tipo_vehiculo']= "'".'bus'."'";
  }
  if ($_POST['fueraCiudad']== true) {
    $data['fuera_ciudad']=1;
  }else {
    $data['fuera_ciudad']=0;
  }


  $con = new ConectorBD('localhost','james','james');
  $response['conexion'] = $con->initConexion('transporte_db');

  if ($response['conexion']=='OK') {
    if($con->insertData('usuarios', $data)){
      $response['msg']="exito en la inserción";
    }else {
      $response['msg']= "Hubo un error y los datos no han sido cargados";
    }
  }else {
    $response['msg']= "No se pudo conectar a la base de datos";
  }

  echo json_encode($response);


 ?>
