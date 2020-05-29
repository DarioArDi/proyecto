import React, { useState } from "react";
import styled from "styled-components";
import { TablaCompras } from "./TablaCompras";
import { TablaEmpresas } from "./TablaEmpresas";
import { TablaOfertas } from "./TablaOfertas";
import { TablaReportes } from "./TablaReportes";
import { TablaUsuarios } from "./TablaUsuarios";
import Button from "@atlaskit/button";
// import Cookies from "universal-cookie";
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import ModalDialog, { ModalTransition } from "@atlaskit/modal-dialog";
// const cookies = new Cookies();
export const AdminPannel = ({ puntos }: any) => {
	const [compras, setCompras] = useState(false);
	const [empresas, setEmpresas] = useState(false);
	const [ofertas, setOfertas] = useState(false);
	const [reportes, setReportes] = useState(false);
	const [usuarios, setUsuarios] = useState(false);
	const mostrarCompras = () => {
		setCompras(true);
		setEmpresas(false);
		setOfertas(false);
		setReportes(false);
		setUsuarios(false);
	};
	const mostrarEmpresas = () => {
		setCompras(false);
		setEmpresas(true);
		setOfertas(false);
		setReportes(false);
		setUsuarios(false);
	};
	const mostrarOfertas = () => {
		setCompras(false);
		setEmpresas(false);
		setOfertas(true);
		setReportes(false);
		setUsuarios(false);
	};
	const mostrarReportes = () => {
		setCompras(false);
		setEmpresas(false);
		setOfertas(false);
		setReportes(true);
		setUsuarios(false);
	};
	const mostrarUsuarios = () => {
		setCompras(false);
		setEmpresas(false);
		setOfertas(false);
		setReportes(false);
		setUsuarios(true);
	};
	return (
		<>
			<Buttons>
				<Button onClick={() => mostrarCompras()}>Mostrar Compras</Button>
				<Button onClick={() => mostrarEmpresas()}>Mostrar Empresas</Button>
				<Button onClick={() => mostrarOfertas()}>Mostrar Ofertas</Button>
				<Button onClick={() => mostrarReportes()}>Mostrar Reportes</Button>
				<Button onClick={() => mostrarUsuarios()}>Mostrar Usuarios</Button>
			</Buttons>
			<Container>
				{compras ? <TablaCompras /> : <></>}
				{empresas ? <TablaEmpresas /> : <></>}
				{ofertas ? <TablaOfertas /> : <></>}
				{reportes ? <TablaReportes /> : <></>}
				{usuarios ? <TablaUsuarios /> : <></>}
			</Container>
		</>
	);
};
const Buttons = styled.div({
	display: "flex",
	margin: "5px",
	justifyContent: "center",
	button: {
		margin: "5px"
	}
});
const Container = styled.div({
	display: "flex",
	justifyContent: "center"
});
