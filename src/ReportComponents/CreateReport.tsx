import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Checkbox } from "@atlaskit/checkbox";
import TextField from "@atlaskit/textfield";
import Form, { Field } from "@atlaskit/form";
import Button from "@atlaskit/button";
import { RadioGroup } from "@atlaskit/radio";
import { OptionsPropType } from "@atlaskit/radio/types";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const CreateTheReport = (data: any, tipo: string) => {
	console.log(data.street, tipo, cookies.get("user").idusuario);
	fetch(
		`http://127.0.0.1:80/carrero/newReport.php?street=${data.street}&type=${tipo}&user=${
			cookies.get("user").idusuario
		}`
		// eslint-disable-next-line no-restricted-globals
	).then(() => (location.href = "http://localhost:3000/createreport"));
};

const options: OptionsPropType = [
	{ name: "tipo", value: "sign", label: "Señal" },
	{ name: "tipo", value: "road", label: "Carretera" }
];
export const CreateReport = () => {
	const [selectedOption, setSelectedOption] = useState("");
	return (
		<Container>
			<h1>Publicar reportes</h1>
			<Form onSubmit={(data) => CreateTheReport(data, selectedOption)}>
				{({ formProps }) => (
					<Formulario {...formProps}>
						<Field name="street" label="Calle/Carretera" isRequired>
							{({ fieldProps }) => <TextField {...fieldProps} />}
						</Field>
						<Field name="type" label="Tipo de falla">
							{({ fieldProps: { onChange, ...rest } }) => (
								<RadioGroup
									{...rest}
									options={options}
									onChange={(e) => {
										// keep Form and our own state up-to-date
										setSelectedOption(e.target.value);
									}}
								/>
							)}
						</Field>
						{/* <input type="file" name="imagen">
							Sube una foto de la falla
						</input> */}
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
