<?php
$conexion = new PDO("mysql:host=localhost;dbname=carrero", "root", "");
$filas = $conexion->query("SELECT * FROM empresas;");
$resultado = [];
$i=0;
$fila;
if($filas) {
    while ($fila = $filas->fetch(PDO::FETCH_ASSOC)) {
        $resultado[$i] = [
            "idEmpresa"=>$fila['idEmpresa'],
            "usuario"=>$fila["usuario"],
            "contrasena"=>$fila['contrasena'],
            "correo"=>$fila['correo'],
            "cif"=>$fila['cif']
        ];
        $i++;
    }
    header("Access-Control-Allow-Origin:*");
    header("Content-type: application/json");
    echo json_encode($resultado);
    $conexion= null;
}
?>
