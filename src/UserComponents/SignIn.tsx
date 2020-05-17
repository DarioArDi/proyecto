import React from "react";
import styled from "styled-components";
import TextField from "@atlaskit/textfield";
import Form, { Field } from "@atlaskit/form";
import Button from "@atlaskit/button";
const login = async ({ data }: any) => {
	console.log("datos", data.username);

	const respuesta = await fetch(
		`http://127.0.0.1:80/carrero/login.php?name=${data.username}&pass=${data.password}`
	);
	const resultado = await respuesta.json();
	console.log("resultado", resultado);
	if (resultado === 1) {
		// eslint-disable-next-line no-restricted-globals
		location.href = "http://localhost:3000";
	} else if (resultado === 2) {
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
					<Button type="submit">Entrar</Button>
				</form>
			)}
		</Form>
	);
};
