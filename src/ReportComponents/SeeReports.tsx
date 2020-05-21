import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import Cookies from "universal-cookie";
import Form, { Field } from "@atlaskit/form";
import TextField from "@atlaskit/textfield";
import { Checkbox } from "@atlaskit/checkbox";
import Button from "@atlaskit/button";
const cookies = new Cookies();

const filtrarDatos = (datos: any, filter: any) => {
	let datosFiltrados: any[] = [];
	datos.map((row: any) => {
		if (row.direction.includes(filter.street)) {
			let pass = true;
			if (filter.sign) {
				if (row.tipo === "sign") {
					pass = false;
				}
			}
			if (filter.road) {
				if (row.tipo === "road") {
					pass = false;
				}
			}
			if (filter.pending) {
				if (row.pending === "1") {
					pass = false;
				}
			}
			if (filter.resolved) {
				if (row.pending === "0") {
					pass = false;
				}
			}
			if (pass) {
				datosFiltrados = [...datosFiltrados, row];
			}
		}
	});
	return datosFiltrados;
};
const MostrarDatos = ({ datos }: any) => {
	console.log("mostrar", datos);
	if (datos.length !== undefined) {
		return (
			<>
				<table>
					{datos.map((row: any) => {
						return (
							<tr key={row.idReporte} id={row.idReporte}>
								<td>{row.direction}</td>
								<td>{row.tipo === "road" ? "Carretera" : "Señal"}</td>
								<td>{row.pending === "1" ? "Pendiente" : "Resuelto"}</td>
							</tr>
						);
					})}
				</table>
			</>
		);
	} else {
		return <div>:(</div>;
	}
};
const filterDefault = {
	street: "",
	sign: false,
	road: false,
	pending: false,
	resolved: false
};
export const SeeReports = () => {
	const [reportes, setReportes] = useState<any[]>([]);
	const [filter, setFilter] = useState(filterDefault);
	const pillarDatos = async () => {
		console.log("datos", cookies.get("user").idEmpresa);
		const respuesta = await fetch(`http://127.0.0.1:80/carrero/verreportes.php`)
			.then((datos) => datos.json())
			.then((datosJson) => {
				console.log("datos", datosJson);
				setReportes(datosJson);
			});
		console.log("resultado", respuesta);
	};
	useEffect(() => {
		pillarDatos();
	}, []);
	const changeFilterCheckbox = (value: string, checked: boolean) => {
		console.log(value, checked);
		switch (value) {
			case "road":
				setFilter({
					...filter,
					road: checked
				});
				break;
			case "sign":
				setFilter({
					...filter,
					sign: checked
				});
				break;
			case "pending":
				setFilter({
					...filter,
					pending: checked
				});
				break;
			case "resolved":
				setFilter({
					...filter,
					resolved: checked
				});
				break;
		}
	};
	console.log(filter);

	// var datos: any[] = [];
	const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFilter({
			...filter,
			street: e.target.value
		});
	};
	return (
		<Container>
			<div>
				<h4>Filtrar datos</h4>
				<TextField name="username" label="Usuario" isRequired onChange={handleOnChange} />
				<Checkbox
					value="sign"
					name="sign"
					label="Quitar señales"
					onChange={(event) => changeFilterCheckbox(event.target.value, event.target.checked)}
				/>
				<Checkbox
					value="road"
					name="road"
					label="Quitar carreteras"
					onChange={(event) => changeFilterCheckbox(event.target.value, event.target.checked)}
				/>
				<Checkbox
					value="pending"
					name="pending"
					label="Quitar pendientes"
					onChange={(event) => changeFilterCheckbox(event.target.value, event.target.checked)}
				/>
				<Checkbox
					value="resolved"
					name="resolved"
					label="Quitar resuetos"
					onChange={(event) => changeFilterCheckbox(event.target.value, event.target.checked)}
				/>
			</div>
			<MostrarDatos datos={filtrarDatos(reportes, filter)} />
		</Container>
	);
};

const Container = styled.div({
	// display: "flex"
});
