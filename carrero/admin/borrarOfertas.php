<?php
$conexion = new PDO("mysql:host=localhost;dbname=carrero", "root", "");
$idOferta=$_GET["idOferta"];
$conexion->query("DELETE FROM ofertas WHERE idOferta=$idOferta;");
?>
