<?php
$conexion = new PDO("mysql:host=localhost;dbname=carrero", "root", "");
$idUsuario=$_GET["idUsuario"];
$conexion->query("DELETE FROM usuarios WHERE idUsuario=$idUsuario;");
?>
