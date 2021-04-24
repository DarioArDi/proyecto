<?php
$conexion = new PDO("mysql:host=localhost;dbname=carrero", "root", "");
$idOferta = $_GET['idOferta'];
$idUsuario = $_GET['idUsuario'];
$sql = "UPDATE usuarios SET puntos = (SELECT puntos-1000 FROM usuarios WHERE idUsuario = $idUsuario) WHERE idUsuario= $idUsuario;
        UPDATE ofertas SET inventario = (SELECT inventario-1 FROM ofertas WHERE idOferta=$idOferta) WHERE idOferta=$idOferta;
        INSERT INTO compras VALUES('',$idUsuario,$idOferta);
";
$preparado = $conexion->prepare($sql);
$preparado->execute();
$conexion= null;
?>
