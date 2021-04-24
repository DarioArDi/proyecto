<?php
$conexion = new PDO("mysql:host=localhost;dbname=carrero", "root", "");
$idReporte=$_GET["idReporte"];
$estado=$_GET["estado"];
$idUsuario=$_GET["idUsuario"];
$conexion->query("UPDATE reportes SET pendiente=$estado WHERE idReporte=$idReporte;");
if(estado=="1") {
    $conexion->query("update usuarios SET puntos=(select puntos-500 from usuarios where idusuario=$idUsuario) where idusuario = $idUsuario;");
} else {
    $conexion->query("update usuarios SET puntos=(select puntos+500 from usuarios where idusuario=$idUsuario) where idusuario = $idUsuario;");
}
?>
