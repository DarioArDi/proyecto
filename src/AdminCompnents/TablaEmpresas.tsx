import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Cookies from "universal-cookie";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Button from "@atlaskit/button";
import TextField from "@atlaskit/textfield";
import Form, { Field } from "@atlaskit/form";
import ModalDialog, { ModalTransition } from "@atlaskit/modal-dialog";
import { TextLabel, PointerTd } from "../Styles/commonStyles";
const cookies = new Cookies();
const defaultRow = {
	idEmpresa: 0,
	usuario: "a",
	contrasena: "a",
	correo: "a",
	cif: "a"
};
export const TablaEmpresas = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [modalInfo, setModalInfo] = useState(defaultRow);
	const [empresas, setEmpresas] = useState<any[]>([]);
	const pillarDatos = async () => {
		console.log("datos", cookies.get("user").idusuario);
		fetch(`http://127.0.0.1:80/carrero/admin/verEmpresas.php`)
			.then((datos) => datos.json())
			.then((datosJson) => {
				console.log("datos", datosJson);
				setEmpresas(datosJson);
			});
	};
	const eliminarCompra = (idEmpresa: number) => {
		console.log("datos", idEmpresa);
		fetch(`http://127.0.0.1/carrero/admin/borrarEmpresas.php?idEmpresa=${idEmpresa}`);
		pillarDatos();
	};
	useEffect(() => {
		pillarDatos();
	}, []);
	const openModal = (row: any) => {
		setModalInfo(row);
		setIsOpen(true);
	};
	const editarEmpresa = () => {
		fetch(
			`http://127.0.0.1:80/carrero/admin/editarempresas.php?idEmpresa=${modalInfo.idEmpresa}&usuario=${modalInfo.usuario}&contrasena=${modalInfo.contrasena}&correo=${modalInfo.correo}&cif=${modalInfo.cif}`
		);
		pillarDatos();
		setIsOpen(false);
		console.log("info", modalInfo);
	};
	const cambiarusuario = (usuario: any) => {
		setModalInfo({
			...modalInfo,
			usuario: usuario.target.value
		});
	};
	const cambiarcontrasena = (contrasena: any) => {
		setModalInfo({
			...modalInfo,
			contrasena: contrasena.target.value
		});
	};
	const cambiarcorreo = (correo: any) => {
		setModalInfo({
			...modalInfo,
			correo: correo.target.value
		});
	};
	const cambiarcif = (cif: any) => {
		setModalInfo({
			...modalInfo,
			cif: cif.target.value
		});
	};
	return (
		<table>
			<tr>
				<th>idEmpresa</th>
				<th>usuario</th>
				<th>contrasena</th>
				<th>correo</th>
				<th>cif</th>
			</tr>
			{empresas.map((row: any, i: number) => {
				return (
					<tr>
						<td>{row.idEmpresa}</td>
						<td>{row.usuario}</td>
						<td>{row.contrasena}</td>
						<td>{row.correo}</td>
						<td>{row.cif}</td>
						<PointerTd onClick={() => openModal(row)}>Editar</PointerTd>
						<PointerTd onClick={() => eliminarCompra(row.idEmpresa)}>Borrar</PointerTd>
					</tr>
				);
			})}
			<ModalTransition>
				{isOpen && (
					<ModalDialog
						onClose={() => {
							setIsOpen(false);
						}}
						width="500px"
						height="800px"
					>
						<div>
							<h1 style={{ textAlign: "center" }}>Editar registro</h1>
							<div>
								<TextLabel>idEmpresa</TextLabel>
								<TextField
									name="idEmpresa"
									defaultValue={modalInfo.idEmpresa}
									type="number"
									isDisabled={true}
								/>
							</div>
							<div>
								<TextLabel>usuario</TextLabel>
								<TextField
									name="usuario"
									defaultValue={modalInfo.usuario}
									onChange={(event) => cambiarusuario(event)}
								/>
							</div>
							<div>
								<TextLabel>contrasena</TextLabel>
								<TextField
									name="contrasena"
									defaultValue={modalInfo.contrasena}
									onChange={(event) => cambiarcontrasena(event)}
								/>
							</div>
							<div>
								<TextLabel>correo</TextLabel>
								<TextField
									name="correo"
									defaultValue={modalInfo.correo}
									onChange={(event) => cambiarcorreo(event)}
								/>
							</div>

							<div>
								<TextLabel>cif</TextLabel>
								<TextField
									name="cif"
									defaultValue={modalInfo.cif}
									onChange={(event) => cambiarcif(event)}
								/>
							</div>
							<Button
								style={{ display: "block", marginTop: "10px" }}
								type="submit"
								onClick={() => editarEmpresa()}
							>
								Editar
							</Button>
						</div>
					</ModalDialog>
				)}
			</ModalTransition>
		</table>
	);
};
