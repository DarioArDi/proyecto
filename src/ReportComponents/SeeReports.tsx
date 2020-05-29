import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import Form, { Field } from "@atlaskit/form";
import TextField from "@atlaskit/textfield";
import { Checkbox } from "@atlaskit/checkbox";
import Button from "@atlaskit/button";
import Cookies from "universal-cookie";
import road from "../img/road.jpg";
import sign from "../img/sign.jpg";
import { CommonContainer } from "../Styles/commonStyles";
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
export const SeeReports = () => {
	const [filter, setFilter] = useState(filterDefault);
	const [reportes, setReportes] = useState<any[]>([]);
	const pillarDatos = async () => {
		fetch(`http://127.0.0.1:80/carrero/verreportes.php`)
			.then((datos) => datos.json())
			.then((datosJson) => {
				setReportes(datosJson);
			});
	};
	useEffect(() => {
		pillarDatos();
	}, []);
	const cambiarReporte = (idReporte: Number, estado: String, idUsuario: Number) => {
		console.log("datos1", idReporte, estado);
		if (estado === "1") {
			estado = "0";
		} else {
			estado = "1";
		}
		console.log("datos2", idReporte, estado);
		fetch(
			`http://127.0.0.1:80/carrero/cambiarEstadoReporte.php?idReporte=${idReporte}&estado=${estado}&idUsuario=${idUsuario}`
		).then(() => pillarDatos());
	};
	const changeFilterCheckbox = (value: string, checked: boolean) => {
		// console.log(value, checked);
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
	// console.log(filter);

	// var datos: any[] = [];
	const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFilter({
			...filter,
			street: e.target.value
		});
	};
	return (
		<CostomContainer>
			<FilterTitleContainer>
				<h4>Filtrar datos</h4>
				<div>
					<label>Filtrar por nombre</label>
					<TextField name="filter" onChange={handleOnChange} />
				</div>
				<CheckboxContainer>
					<TypeCheckboxes>
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
					</TypeCheckboxes>
					<StatusCheckboxes>
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
					</StatusCheckboxes>
				</CheckboxContainer>
			</FilterTitleContainer>
			{/* <MostrarDatos datos={filtrarDatos(reportes, filter)} /> */}
			<ReportsContainer>
				{filtrarDatos(reportes, filter).map((row: any) => {
					return (
						<Container key={row.idReporte} id={row.idReporte}>
							{row.tipo === "road" ? <img src={road} alt="img" /> : <img src={sign} alt="img" />}
							<div style={{ backgroundColor: "#61cffa" }}>
								<div>
									<span>Calle:</span>
									<div>{row.direction}</div>
								</div>
								<div>
									<span>Estado:</span>
									<div>{row.pending === "1" ? "Pendiente" : "Resuelto"}</div>
								</div>
								<Estado onClick={() => cambiarReporte(row.idReporte, row.pending, row.idUsuario)}>
									<div>Cambiar estado</div>
								</Estado>
							</div>
						</Container>
					);
				})}
			</ReportsContainer>
		</CostomContainer>
	);
};
const CostomContainer = styled(CommonContainer)({
	width: "890px",
	"@media (max-width: 900px)": {
		width: "500px"
	}
});
const CheckboxContainer = styled.div({
	display: "flex"
});
const TypeCheckboxes = styled.div({
	flex: 1
});
const StatusCheckboxes = styled.div({
	flex: 1
});
const ReportsContainer = styled.div({
	display: "flex",
	flexWrap: "wrap",
	justifyContent: "center"
});
const FilterTitleContainer = styled.div({
	width: "370px",
	margin: "0px auto"
});
const Container = styled.div({
	margin: "10px",
	width: "200px",
	height: "240px",
	border: "1px solid",
	borderRadius: "5px",
	display: "flex",
	flexDirection: "column",
	">img": {
		borderRadius: "5px 5px 0px 0px",
		width: "190px",
		height: "120px",
		margin: "5px"
	},
	">div": {
		margin: "0px 5px 5px 5px",
		borderRadius: "0px 0px 5px 5px"
	}
});
const Estado = styled.div({
	display: "flex",
	justifyContent: "flex-end",
	div: {
		margin: "0px 2px 2px 0px",
		":hover": {
			cursor: "pointer"
		}
	}
});
