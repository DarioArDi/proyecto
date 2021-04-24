<?php
$conexion = new PDO("mysql:host=localhost;dbname=carrero", "root", "");
$idEmpresa=$_GET["idEmpresa"];
$conexion->query("DELETE FROM empresas WHERE idEmpresa=$idEmpresa;");
?>
