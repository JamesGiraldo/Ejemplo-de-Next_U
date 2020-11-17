<?php
	require('conector.php');
	$con = new conectorBD();

	$response['conexion'] = $con->initConexion($con->database);
	if ($response['conexion'] == 'OK'){
		$conexion = $con->getConexion();
		$insert = $conexion->prepare('INSERT INTO usuarios (email, nombre, password , fecha_nacimiento) VALUES (?,?,?,?)');
		$insert->bind_param("ssss", $email, $nombre, $password, $fecha_nacimiento);

		$d_password = "1234";
		$email = "prueba1@mail.com";
		$nombre = "prueba1";
		$password = password_hash($d_password, PASSWORD_DEFAULT);
		$fecha_nacimiento = "1998-12-08";

		$insert->execute();

		$email = 'prueba2@mail.com';
		$nombre = 'prueba2';
		$password = password_hash($d_password, PASSWORD_DEFAULT);
		$fecha_nacimiento = '1997-12-03';

		$insert->execute();

		$email = 'usuario@mail.com';
		$nombre = 'usuario';
		$password = password_hash($d_password, PASSWORD_DEFAULT);
		$fecha_nacimiento = '1997-12-03';

		$insert->execute();
		$response['resultado'] = "1";
		$response['msg']= 'Informacio de inicio:';
		$getUsers = $con->consultar(['usuarios'],['*'],$condicion = "");
		while ($fila= $getUsers->fetch_assoc()) {
			$response['msg'].=$fila['email'];
		}
		$response['msg'].= 'contraenia: '.$d_password;
		}else{
			$response['resultado'] == "0";
			$response['msg'] = 'No se pudo conectar a la base de datos';
		}

		echo json_encode($response);

 ?>
