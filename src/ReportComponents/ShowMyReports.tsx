import React, { useEffect, useState, useReducer } from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import Cookies from "universal-cookie";
import Form, { Field } from "@atlaskit/form";
import TextField from "@atlaskit/textfield";
import { Checkbox } from "@atlaskit/checkbox";
import Button from "@atlaskit/button";
import { CSSTransition } from "react-transition-group";
import { ModalReport } from "./ModalReport";
import { initialReportState } from "./inicialReducerState";
import { reducer } from "./reportsReducer";
import { ReportsActions } from "./reportsActions";
import { ReportRow } from "./Report";
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
const filterDefault = {
	street: "",
	sign: false,
	road: false,
	pending: false,
	resolved: false
};
export const ShowMyReports = () => {
	const [filter, setFilter] = useState(filterDefault);
	const [reportes, setReportes] = useState<any[]>([]);
	const pillarDatos = async () => {
		console.log("datos", cookies.get("user").idusuario);
		fetch(`http://127.0.0.1:80/carrero/vermisreportes.php?iduser=${cookies.get("user").idusuario}`)
			.then((datos) => datos.json())
			.then((datosJson) => {
				console.log("datos", datosJson);
				setReportes(datosJson);
			});
	};
	useEffect(() => {
		pillarDatos();
	}, []);
	const eliminarReporte = (idReporte: number) => {
		console.log("datos", idReporte);
		fetch(`http://127.0.0.1/carrero/eliminarReporte.php?idReporte=${idReporte}`);
		pillarDatos();
	};
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
			<table>
				{filtrarDatos(reportes, filter).map((row: any, i: number) => {
					return <ReportRow row={row} key={i} />;
				})}
			</table>
		</Container>
	);
};

const Container = styled.div({
	// display: "flex"
});
