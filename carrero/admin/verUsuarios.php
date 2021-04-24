<?php
$conexion = new PDO("mysql:host=localhost;dbname=carrero", "root", "");
$filas = $conexion->query("SELECT * FROM usuarios;");
$resultado = [];
$i=0;
$fila;
$filas->fetch(PDO::FETCH_ASSOC);
if($filas) {
    while ($fila = $filas->fetch(PDO::FETCH_ASSOC)) {
        $resultado[$i] = [
            "idUsuario"=>$fila['idUsuario'],
            "usuario"=>$fila['usuario'],
            "contrasena"=>$fila['contrasena'],
            "correo"=>$fila['correo'],
            "edad"=>$fila['edad'],
            "puntos"=>$fila['puntos']
        ];
        $i++;
    }
    header("Access-Control-Allow-Origin:*");
    header("Content-type: application/json");
    echo json_encode($resultado);
    $conexion= null;
}
?>
