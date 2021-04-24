<?php
$conexion = new PDO("mysql:host=localhost;dbname=carrero", "root", "");
$idEmpresa = $_GET['idEmpresa'];
$usuario = $_GET['usuario'];
$contrasena = $_GET['contrasena'];
$correo = $_GET['correo'];
$cif = $_GET['cif'];
$sql = "UPDATE empresas SET usuario='$usuario',contrasena='$contrasena',correo='$correo',cif='$cif' WHERE idEmpresa=$idEmpresa;";
$preparado = $conexion->prepare($sql);
$preparado->execute();
$conexion= null;
?>
