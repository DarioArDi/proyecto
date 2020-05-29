import React from "react";
import Cookies from "universal-cookie";
import styled from "styled-components";
import TextField from "@atlaskit/textfield";
import Form, { Field } from "@atlaskit/form";
import Button from "@atlaskit/button";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { CommonTitle } from "../Styles/commonStyles";
const login = async ({ data }: any) => {
	console.log("datos", data.username);
	let userdata: any;
	const respuesta = await fetch(
		`http://127.0.0.1:80/carrero/login.php?name=${data.username}&pass=${data.password}`
	)
		.then((datos) => datos.json())
		.then((datosJson) => {
			userdata = datosJson;
			console.log("datos", datosJson);
		});
	// const resultado = await respuesta.json();
	console.log("resultado", respuesta);
	const cookies = new Cookies();
	if (userdata !== 0) {
		cookies.set("user", userdata, { path: "/" });
		// eslint-disable-next-line no-restricted-globals
		location.href = "http://localhost:3000";
	}
};
export const SignIn = () => {
	return (
		<Container>
			<CommonTitle>Iniciar Sesión</CommonTitle>
			<Form onSubmit={(data) => login({ data })}>
				{({ formProps }) => (
					<Formulario {...formProps}>
						<Field name="username" label="Usuario" isRequired>
							{({ fieldProps }) => <TextField {...fieldProps} />}
						</Field>
						<Field name="password" label="Constraseña" isRequired>
							{({ fieldProps }) => <TextField {...fieldProps} type="password" />}
						</Field>
						<br />
						<Button style={{ display: "block" }} type="submit">
							Entrar
						</Button>
						<Enlace to="/signupwho">Crear una cuenta</Enlace>
					</Formulario>
				)}
			</Form>
		</Container>
	);
};
const Container = styled.div({
	margin: "0px auto 0px auto",
	width: "340px",
	display: "flex",
	justifyContent: "center",
	flexDirection: "column"
});
const Formulario = styled.form({
	display: "flex",
	flexDirection: "column"
});
const Enlace = styled(Link)({
	margin: "15px 0 0 0",
	textDecoration: "none",
	textAlign: "center",
	":visited": {
		color: "#90D0F0"
	},
	":link": {
		color: "#9AD3F8"
	}
});
