<?php
$conexion = new PDO("mysql:host=localhost;dbname=carrero", "root", "");
$filas = $conexion->query("SELECT * FROM reportes;");
$resultado = [];
$i=0;
$fila;
if($filas) {
    while ($fila = $filas->fetch(PDO::FETCH_ASSOC)) {
        $resultado[$i] = [
            "idReporte"=>$fila['idReporte'],
            "direccion"=>$fila['direccion'],
            "idUsuario"=>$fila['idUsuario'],
            "tipo"=>$fila['tipo'],
            "pendiente"=>$fila['pendiente']
        ];
        $i++;
    }
    header("Access-Control-Allow-Origin:*");
    header("Content-type: application/json");
    echo json_encode($resultado);
    $conexion= null;
}
?>
