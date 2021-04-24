<?php
$conexion = new PDO("mysql:host=localhost;dbname=carrero", "root", "");
$filas = $conexion->query("SELECT idCompra,u.idUsuario,Usuario,o.idOferta,Oferta FROM compras c,usuarios u,ofertas o WHERE u.idUsuario=c.idUsuario AND o.idOferta = c.idOferta;");
$resultado = [];
$i=0;
$fila;
if($filas) {
    while ($fila = $filas->fetch(PDO::FETCH_ASSOC)) {
        $resultado[$i] = [
            "idOferta"=>$fila['idOferta'],
            "Oferta"=>$fila["Oferta"],
            "idCompra"=>$fila['idCompra'],
            "idUsuario"=>$fila['idUsuario'],
            "Usuario"=>$fila['Usuario']
        ];
        $i++;
    }
    header("Access-Control-Allow-Origin:*");
    header("Content-type: application/json");
    echo json_encode($resultado);
    $conexion= null;
}
?>
