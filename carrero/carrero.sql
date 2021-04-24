CREATE DATABASE carrero;
USE carrero;
CREATE TABLE usuarios (
  idUsuario int(10) NOT NULL AUTO_INCREMENT,
  usuario varchar(25) NOT NULL,
  contrasena text NOT NULL,
  correo varchar(30) NOT NULL UNIQUE,
  edad int(3) NOT NULL,
  puntos int(120) NOT NULL,
  PRIMARY KEY (idUsuario)
);
CREATE TABLE empresas (
  idEmpresa int(10) AUTO_INCREMENT,
  usuario varchar(25) NOT NULL,
  contrasena text NOT NULL,
  correo varchar(30) NOT NULL UNIQUE,
  cif varchar(9) NOT NULL,
  PRIMARY KEY (idEmpresa)
);
CREATE TABLE reportes (
  idReporte int(10) NOT NULL AUTO_INCREMENT,
  direccion varchar(30) NOT NULL,
  tipo varchar(10) NOT NULL,
  idUsuario int(10) NOT NULL,
  pendiente boolean,
  PRIMARY KEY (idReporte),
  FOREIGN KEY (idUsuario) REFERENCES usuarios(idUsuario) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE ofertas (
  idOferta int(10) NOT NULL AUTO_INCREMENT,
  oferta varchar(40) NOT NULL,
  precio int(10) NOT NULL,
  inventario int(10) NOT NULL,
  idEmpresa int(10) NOT NULL,
  PRIMARY KEY (idOferta),
  FOREIGN KEY (idEmpresa) REFERENCES empresas(idEmpresa) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE compras (
  idCompra int(10) NOT NULL AUTO_INCREMENT,
  idUsuario int(10) NOT NULL,
  idOferta int(10) NOT NULL,
  PRIMARY KEY (idCompra),
  FOREIGN KEY (idUsuario) REFERENCES usuarios(idUsuario) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (idOferta) REFERENCES ofertas(idOferta) ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO usuarios VALUES
(1,'admin', '1234', 'admin@admin.com', 18,-1),
(2,'Dario', '1234', '1234@3334.com', 18,6000),
(3,'Simone', '1478', 'saimon@dario.com', 19,4500),
(4,'Marconehu','4157','neju.elbravo@gmail.com',19,0);

INSERT INTO reportes VALUES
(1,'Alcazar de toledo','sign',1,1),
(2,'Alvarado','road',2,0),
(3,'Calle de los ciegos','road',3,1),
(4,'Pasaje de Lodares','sign',2,0),
(5,'Calleja de las Flores','road',1,0),
(6,'Paseo del Borne','sign',2,0),
(7,'Paseo de los tristes','road',2,0),
(8,'Rua do Franco','sign',3,1),
(9,'Gran Via','road',1,1),
(10,'Binibeca','sign',2,1),
(11,'Paseo de Gracia','road',1,1),
(12,'Calle del Angel','sign',3,1);

INSERT INTO empresas VALUES
(1,'Endesa', '1234', 'endesa@endesa.com', '65231587F'),
(2,'Taller Paco','1478','taller.paco@gmail.com','54218796D'),
(3,'Taller de Mecanica Dayman','5418','taller.dayman@gmail.com','19475248Y');

INSERT INTO ofertas VALUES
(1,'Gasolina',10,15,1),
(2,'Revision',20,5,2),
(3,'Ruedas',25,3,3),
(4,'Revision',30,16,2);

INSERT INTO compras VALUES
(1,2,1),
(2,2,2);

select idcompra,u.idusuario,usuario,o.idoferta,oferta from compras c,usuarios u,ofertas o where u.idusuario=c.idusuario and o.idoferta = c.idoferta;