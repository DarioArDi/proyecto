<?php
$resultado= [];
$nombre = $_GET['name'];
$passw = $_GET['pass'];
$conexion = new mysqli('localhost', 'root', '','carrero');
// $conexion = conectar();
//$consulta = $conexion->query("SELECT idUsuario,usuario,contrasena FROM usuarios WHERE usuario = '$nombre' AND contrasena = '$contrasena'");
$consulta = $conexion->stmt_init();
$consulta->prepare("SELECT  idUsuario,usuario,contrasena,puntos FROM usuarios WHERE usuario = ? AND contrasena = ?");
$consulta->bind_param("ss",$nombre,$passw);
$consulta->execute();
$consulta->bind_result($iclient,$clientUser,$pass,$puntos);
$consulta->fetch();
// $respuesta = $consulta->fetch(PDO::FETCH_ASSOC);
if ($nombre == $clientUser) {
    $resultado=[
        "idusuario"=>$iclient,
        "usuario"=>$clientUser,
        "type"=>"cliente",
        "puntos"=>$puntos,
    ];
} else {
    $consulta = $conexion->stmt_init();
    $consulta->prepare("SELECT idEmpresa,usuario,contrasena FROM empresas WHERE usuario = ? AND contrasena = ?");
    echo $consulta->error;
    $consulta->bind_param("ss",$nombre,$passw);
    echo $consulta->error;
    $consulta->execute();
    $consulta->bind_result($idEmpresa,$empresaUser,$pass);
    $consulta->fetch();
    if ($nombre == $empresaUser) {
        $resultado=[
                "idEmpresa"=>$idEmpresa,
                "usuario"=>$empresaUser,
                "type"=>"empresa",
            ];
        } else {
            $resultado=0;
        }
    }
// $consultaCliente->close();   
$consulta->close();
$conexion=null;
echo json_encode($resultado);
?>