<?php
$conexion = new PDO("mysql:host=localhost;dbname=carrero", "root", "");
$filas = $conexion->query("SELECT * FROM ofertas;");
$resultado = [];
$i=0;
$fila;
if($filas) {
    while ($fila = $filas->fetch(PDO::FETCH_ASSOC)) {
        $resultado[$i] = [
            "idOferta"=>$fila['idOferta'],
            "oferta"=>$fila["oferta"],
            "precio"=>$fila['precio'],
            "inventario"=>$fila['inventario'],
            "idEmpresa"=>$fila['idEmpresa'],
        ];
        $i++;
    }
    header("Access-Control-Allow-Origin:*");
    header("Content-type: application/json");
    echo json_encode($resultado);
    $conexion= null;
}
?>
