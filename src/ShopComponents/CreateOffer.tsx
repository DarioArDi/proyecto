import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Checkbox } from "@atlaskit/checkbox";
import TextField from "@atlaskit/textfield";
import Form, { Field } from "@atlaskit/form";
import Button from "@atlaskit/button";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const CreateTheReport = (data: any) => {
	console.log("datos", data, cookies.get("user").idEmpresa);
	fetch(
		`http://127.0.0.1:80/carrero/newOffer.php?name=${data.offer}&discount=${
			data.discount
		}&inventory=${data.inventory}&idEmpresa=${cookies.get("user").idEmpresa}`
	);
};

export const CreateOffer = () => {
	return (
		<Container>
			<h1>Crear reportes</h1>
			<Form onSubmit={(data) => CreateTheReport(data)}>
				{({ formProps }) => (
					<Formulario {...formProps}>
						<Field name="offer" label="Oferta" isRequired>
							{({ fieldProps }) => <TextField {...fieldProps} />}
						</Field>
						<Field name="discount" label="Descuento en %" isRequired>
							{({ fieldProps }) => <TextField type="number" {...fieldProps} />}
						</Field>
						<Field name="inventory" label="Cantidad" isRequired>
							{({ fieldProps }) => <TextField type="number" {...fieldProps} />}
						</Field>
						<br />
						<Button type="submit">Reportar</Button>
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
