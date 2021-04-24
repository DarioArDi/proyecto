<?php 
    $resultado;
    $street = $_GET['street'];
    $type = $_GET['type'];
    $user = $_GET['user'];
    $conexion = new PDO("mysql:host=localhost;dbname=carrero", "root", "");
    $consulta = $conexion->query("INSERT INTO reportes VALUES ('','$street','$type','$user',1)");
    $conexion=null;
?>