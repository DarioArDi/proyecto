<?php
$conexion = new PDO("mysql:host=localhost;dbname=carrero", "root", "");
$idReporte = $_GET['idReporte'];
$direccion = $_GET['direccion'];
$tipo = $_GET['tipo'];
$idUsuario = $_GET['idUsuario'];
$idUsuario = $_GET['idUsuario'];
$sql = "UPDATE reportes SET direccion='$direccion',tipo='$tipo',idUsuario='$idUsuario',idUsuario='$idUsuario' WHERE idReporte=$idReporte;";
$preparado = $conexion->prepare($sql);
$preparado->execute();
$conexion= null;
?>
