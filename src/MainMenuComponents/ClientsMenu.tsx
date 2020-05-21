import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();
export const ClientMainMenu = () => {
	return (
		<Container>
			<Link to="/createreport">Publicar Reporte</Link>
			<Link to="/myreports">Ver Reportes</Link>
			<Link to="/store">Tienda</Link>
			<Link to=""></Link>
		</Container>
	);
};

const Container = styled.div({
	// display: "flex"
});
