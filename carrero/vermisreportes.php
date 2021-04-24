<?php
$conexion = new PDO("mysql:host=localhost;dbname=carrero", "root", "");
$idusuario=$_GET["iduser"];
$filas = $conexion->query("SELECT * FROM reportes WHERE idUsuario = $idusuario;");
$resultado = [];
$i=0;
$fila;
if($filas) {
    while ($fila = $filas->fetch(PDO::FETCH_ASSOC)) {
        $resultado[$i] = [
            "idReporte"=>$fila['idReporte'],
            "direction"=>$fila['direccion'],
            "tipo"=>$fila['tipo'],
            "pending"=>$fila['pendiente']
        ];
        $i++;
    }
    header("Access-Control-Allow-Origin:*");
    header("Content-type: application/json");
    echo json_encode($resultado);
    $conexion= null;
}
?>
