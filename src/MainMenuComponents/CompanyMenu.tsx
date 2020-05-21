import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();
export const CompanyMainMenu = () => {
	return (
		<Container>
			<Link to="/reports">Ver Reportes</Link>
			<Link to="/createoffer">Crear oferta</Link>
			<Link to=""></Link>
		</Container>
	);
};

const Container = styled.div({
	// display: "flex"
});
