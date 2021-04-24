<?php
$conexion = new PDO("mysql:host=localhost;dbname=carrero", "root", "");
$idUsuario = $_GET['idUsuario'];
$usuario = $_GET['usuario'];
$contrasena = $_GET['contrasena'];
$correo = $_GET['correo'];
$edad = $_GET['edad'];
$puntos = $_GET['puntos'];
$sql = "UPDATE Usuarios SET usuario='$usuario',contrasena='$contrasena',correo='$correo',edad='$edad',puntos='$puntos' WHERE idUsuario=$idUsuario;";
$preparado = $conexion->prepare($sql);
$preparado->execute();
$conexion= null;
?>
