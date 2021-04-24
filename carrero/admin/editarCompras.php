<?php
$conexion = new PDO("mysql:host=localhost;dbname=carrero", "root", "");
$idCompra = $_GET['idCompra'];
$idOferta = $_GET['idOferta'];
$idUsuario = $_GET['idUsuario'];
$sql = "UPDATE compras SET idUsuario=$idUsuario, idOferta=$idOferta WHERE idCompra= $idCompra;";
$preparado = $conexion->prepare($sql);
$preparado->execute();
$conexion= null;
?>
