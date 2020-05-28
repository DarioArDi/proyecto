import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import Cookies from "universal-cookie";
import reportar from "../img/reporte.jpg";
import listareportes from "../img/verReportes.png";
import tienda from "../img/tienda.png";

const cookies = new Cookies();
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

const Container = styled.div({
	display: "flex",
	"@media": {},
	justifyContent: "center"
});
const Opcion = styled(Link)({
	margin: "25px 10px 0px 10px",
	textAlign: "center",
	textDecoration: "none",
	img: {
		width: "250px",
		height: "220px",
		marginTop: "10px"
	},
	":visited": {
		color: "#0c59b0"
	},
	":link": {
		color: "#0c59b0"
	}
});
