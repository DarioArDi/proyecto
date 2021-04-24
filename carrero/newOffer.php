<?php 
    $name = $_GET['name'];
    $discount = $_GET['discount'];
    $inventory = $_GET['inventory'];
    $idEmpresa = $_GET['idEmpresa'];
    $conexion = new PDO("mysql:host=localhost;dbname=carrero", "root", "");
    $consulta = $conexion->query("INSERT INTO ofertas VALUES ('',$name,$discount,$inventory,$idEmpresa)");
    $conexion=null;
?>