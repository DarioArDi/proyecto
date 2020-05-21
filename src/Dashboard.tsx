import React, { useEffect, useState } from "react";
import styled from "styled-components";
// import { Checkbox } from "@atlaskit/checkbox";
// import TextField from "@atlaskit/textfield";
// import Form, { Field } from "@atlaskit/form";
// import Button from "@atlaskit/button";
import Cookies from "universal-cookie";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import logo from "./img/logo.png";
const cookies = new Cookies();
const cerrarSesion = () => {
	cookies.remove("user");
	volver();
};
const volver = () => {
	// eslint-disable-next-line no-restricted-globals
	location.href = "http://localhost:3000";
};
export const Dashboard = () => {
	return (
		<>
			<BarraUsuario>
				<Logo src={logo} alt="logo" onClick={() => volver()} />
				<div>{cookies.get("user") ? cookies.get("user").usuario : ""}</div>
				{cookies.get("user") ? <div onClick={() => cerrarSesion()}>Cerrar sesión</div> : <></>}
			</BarraUsuario>
		</>
	);
};
const BarraUsuario = styled.div({
	backgroundColor: "#9AD3F8",
	height: "70px",
	display: "flex"
});
const Logo = styled.img({
	display: "flex",
	height: "60px",
	margin: "5px 0px 0px 5px",
	":hover": {
		cursor: "pointer"
	}
});
