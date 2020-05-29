import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import reportar from "../img/reporte.jpg";
import listareportes from "../img/verReportes.png";
import tienda from "../img/tienda.png";
import { Container, Opcion } from "../Styles/commonStyles";

export const ClientMainMenu = () => {
	return (
		<Container>
			<Opcion to="/createreport">
				<div>Publicar Reporte</div>
				<img src={reportar} alt="img" />
			</Opcion>
			<Opcion to="/myreports">
				<div>Ver Reportes</div>
				<img src={listareportes} alt="img" />
			</Opcion>
			<Opcion to="/store">
				<div>Tienda</div>
				<img src={tienda} alt="img" />
			</Opcion>
		</Container>
	);
};
