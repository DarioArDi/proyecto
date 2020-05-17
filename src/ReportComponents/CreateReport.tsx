import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Checkbox } from "@atlaskit/checkbox";
import TextField from "@atlaskit/textfield";
import Form, { Field } from "@atlaskit/form";
import Button from "@atlaskit/button";
import { RadioGroup } from "@atlaskit/radio";
import { OptionsPropType } from "@atlaskit/radio/types";

const CreateTheReport = () => {};

const options: OptionsPropType = [
	{ name: "tipo", value: "sign", label: "Señal" },
	{ name: "tipo", value: "road", label: "Carretera" }
];
let formData = new FormData();
export const CreateReport = () => {
	const [selectedOption, setSelectedOption] = useState("");
	return (
		<>
			<h1>Crear reportes</h1>
			<Form onSubmit={(data) => console.log("form data", data, selectedOption)}>
				{({ formProps }) => (
					<form {...formProps}>
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
					</form>
				)}
			</Form>
		</>
	);
};
