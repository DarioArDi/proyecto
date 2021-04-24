<?php
$conexion = new PDO("mysql:host=localhost;dbname=carrero", "root", "");
$idReporte=$_GET["idReporte"];
$conexion->query("DELETE FROM reportes WHERE idReporte=$idReporte;");
?>
