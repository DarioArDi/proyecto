<?php
$conexion = new PDO("mysql:host=localhost;dbname=carrero", "root", "");
$idCompra=$_GET["idCompra"];
$conexion->query("DELETE FROM Compras WHERE idCompra=$idCompra;");
?>
