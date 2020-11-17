<?php
	require('conector.php');
	//crear conexion con la clase conector
	$con = new conectorBD();
	$response['conexion'] = $con->initConexion($con->database);
	if ($response['conexion'] == 'OK') {
		if ($con->eliminarRegistro('eventos', 'id='.$_POST['id'])) {
			$response['msg'] = 'OK';
		}else{
			$response['msg'] = 'No se elimino el registro';
		}
	}else{
			$response['msg'] = "Sin comunicacion con la base de datos";
		}
	echo json_encode($response)


 ?>
