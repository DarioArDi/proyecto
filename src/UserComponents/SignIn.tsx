import React from "react";
import Cookies from "universal-cookie";
import styled from "styled-components";
import TextField from "@atlaskit/textfield";
import Form, { Field } from "@atlaskit/form";
import Button from "@atlaskit/button";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// .then((datos) => datos.json())
// 	.then((datosJson) => {
// 		userdata=datosJson;
// 		console.log("datos", datosJson);
// 	})
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
		<Form onSubmit={(data) => login({ data })}>
			{({ formProps }) => (
				<form {...formProps}>
					<Field name="username" label="Usuario" isRequired>
						{({ fieldProps }) => <TextField {...fieldProps} />}
					</Field>
					<Field name="password" label="Constraseña" isRequired>
						{({ fieldProps }) => <TextField {...fieldProps} type="password" />}
					</Field>
					<br />
					<Link to="/signupwho">Crear una cuenta</Link>
					<Button type="submit">Entrar</Button>
				</form>
			)}
		</Form>
	);
};
