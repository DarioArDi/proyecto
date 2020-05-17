import React, { useEffect, useState } from "react";
import styled from "styled-components";
// import { Checkbox } from "@atlaskit/checkbox";
// import TextField from "@atlaskit/textfield";
// import Form, { Field } from "@atlaskit/form";
// import Button from "@atlaskit/button";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import logo from "./img/logo.png";
export const Dashboard = (user: any) => {
	return (
		<>
			<BarraUsuario>
				<Logo>
					<img src={logo} alt="logo" />
				</Logo>
				<Link to="/signupuser">hola</Link>
			</BarraUsuario>
		</>
	);
};
const BarraUsuario = styled.div({
	backgroundColor: "#1a5276",
	height: "60px",
	display: "flex"
});
const Logo = styled.div({
	borderRadius: "60%",
	backgroundColor: "white",
	width: "55px",
	height: "55px",
	display: "flex",
	alignItems: "flex-end",
	justifyContent: "center",
	img: {
		height: "40px"
	}
});
