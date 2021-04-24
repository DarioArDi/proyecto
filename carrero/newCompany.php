<?php 
    $resultado;
    $name = $_GET['name'];
    $pass = $_GET['pass'];
    $mail = $_GET['mail'];
    $cif = $_GET['cif'];
    $conexion = new PDO("mysql:host=localhost;dbname=carrero", "root", "");
    $consulta = $conexion->query("INSERT INTO empresas VALUES ('','$name','$pass','$mail','$cif')");
    $conexion=null;
?>