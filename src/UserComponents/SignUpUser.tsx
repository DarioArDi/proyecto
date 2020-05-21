import React, { useState } from "react";
// import styled from "styled-components";
import Cookies from "universal-cookie";
import Form, { Field, HelperMessage, ErrorMessage } from "@atlaskit/form";
import TextField from "@atlaskit/textfield";
import Button from "@atlaskit/button";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
type userErrorType = {
	username: string;
	mail: string;
	pass: string;
};
const validarUsuario = (value: any) => {
	if (!value) return;
	if (value.length < 2) return "CORTO";
};
const validarEdad = (value: any) => {
	if (!value) return;
	if (value < 14) return "MU_JOVEN";
	if (value > 130) return "MU_VIEJO";
};
const deffault: userErrorType = {
	username: "bien",
	mail: "bien",
	pass: "bien"
};
export const SignUpUser = () => {
	const [userErrors, setUserErrors] = useState(deffault);
	const crearUsuario = async (data: any) => {
		console.log("datoess", data);
		const errores: userErrorType = {
			username: ["jsmith", "mchan"].includes(data.username)
				? "Username already taken, try another one"
				: "bien",
			mail: !data.mail.includes("@") ? "Tu E-Mail no es válido, inténtalo de nuevo" : "bien",
			pass: data.pass1 !== data.pass2 ? "Las contraseñas tiene que coincidir" : "bien"
		};
		if (errores.username === "bien" && errores.mail === "bien" && errores.pass === "bien") {
			console.log("hola buenas que tal", data);
			fetch(
				`http://127.0.0.1:80/carrero/newUser.php?name=${data.username}&pass=${data.pass1}&mail=${data.mail}&age=${data.age}`
			);
			console.log("resultado");
			// eslint-disable-next-line no-restricted-globals
			location.href = "http://localhost:3000";
		}
		console.log("errores", userErrors);
		setUserErrors(errores);
	};
	return (
		<Form onSubmit={crearUsuario}>
			{({ formProps }) => (
				<form {...formProps}>
					<Field
						name="username"
						label="Nombre de usuario"
						isRequired
						validate={(value) => validarUsuario(value)}
					>
						{({ fieldProps, error }) => (
							<>
								<TextField {...fieldProps} />
								{error === "CORTO" && (
									<ErrorMessage>
										Usuario invalido, tiene que tener al menos 2 caracteres
									</ErrorMessage>
								)}
							</>
						)}
					</Field>
					<Field name="pass1" label="Contraseña" isRequired>
						{({ fieldProps }) => <TextField {...fieldProps} />}
					</Field>
					<Field name="pass2" label="Repetir contraseña" isRequired>
						{({ fieldProps }) => (
							<>
								<TextField {...fieldProps} />
								{userErrors.pass !== "bien" && <ErrorMessage>{userErrors.pass}</ErrorMessage>}
							</>
						)}
					</Field>
					<Field name="mail" label="E-Mail" isRequired>
						{({ fieldProps }) => (
							<>
								<TextField {...fieldProps} />
								{userErrors.mail === "bien" && (
									<HelperMessage>Debe contener un simbolo @</HelperMessage>
								)}
								{userErrors.mail !== "bien" && <ErrorMessage>{userErrors.mail}</ErrorMessage>}
							</>
						)}
					</Field>
					<Field name="age" label="Edad" validate={validarEdad} isRequired>
						{({ fieldProps, error }) => (
							<>
								<TextField type="number" {...fieldProps} />
								{error === "MU_JOVEN" && (
									<ErrorMessage>
										No estás autorizado para usar esta aplicación por este momento
									</ErrorMessage>
								)}
								{error === "MU_VIEJO" && <ErrorMessage>Elige una edad posible</ErrorMessage>}
							</>
						)}
					</Field>
					<Button type="submit">Registrarse</Button>
				</form>
			)}
		</Form>
	);
};
