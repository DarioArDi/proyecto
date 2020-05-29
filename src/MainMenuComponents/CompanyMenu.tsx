import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import Cookies from "universal-cookie";
import { Container, Opcion } from "../Styles/commonStyles";
import listareportes from "../img/verReportes.png";
import crearOferta from "../img/crearOferta.png";
const cookies = new Cookies();
export const CompanyMainMenu = () => {
	return (
		<Container>
			<Opcion to="/reports">
				<div>Ver Reportes</div>
				<img src={listareportes} alt="img" />
			</Opcion>
			<Opcion to="/createoffer">
				<div>Crear oferta</div>
				<img src={crearOferta} alt="img" />
			</Opcion>
		</Container>
	);
};
