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
	idReporte: 0,
	direccion: "a",
	tipo: "a",
	idUsuario: "a",
	pendiente: "a"
};
export const TablaReportes = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [modalInfo, setModalInfo] = useState(defaultRow);
	const [reportes, setReportes] = useState<any[]>([]);
	const pillarDatos = async () => {
		console.log("datos", cookies.get("user").iddireccion);
		fetch(`http://127.0.0.1:80/carrero/admin/verReportes.php`)
			.then((datos) => datos.json())
			.then((datosJson) => {
				console.log("datos", datosJson);
				setReportes(datosJson);
			});
	};
	const eliminarCompra = (idReporte: number) => {
		console.log("datos", idReporte);
		fetch(`http://127.0.0.1/carrero/eliminarReporte.php?idReporte=${idReporte}`);
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
			`http://127.0.0.1:80/carrero/admin/editarreportes.php?idReporte=${modalInfo.idReporte}&direccion=${modalInfo.direccion}&tipo=${modalInfo.tipo}&idUsuario=${modalInfo.idUsuario}&pendiente=${modalInfo.pendiente}`
		);
		pillarDatos();
		setIsOpen(false);
		console.log("info", modalInfo);
	};
	const cambiardireccion = (direccion: any) => {
		setModalInfo({
			...modalInfo,
			direccion: direccion.target.value
		});
	};
	const cambiartipo = (tipo: any) => {
		setModalInfo({
			...modalInfo,
			tipo: tipo.target.value
		});
	};
	const cambiaridUsuario = (idUsuario: any) => {
		setModalInfo({
			...modalInfo,
			idUsuario: idUsuario.target.value
		});
	};
	const cambiarpendiente = (pendiente: any) => {
		setModalInfo({
			...modalInfo,
			pendiente: pendiente.target.value
		});
	};
	return (
		<table>
			<tr>
				<th>idReporte</th>
				<th>direccion</th>
				<th>tipo</th>
				<th>idUsuario</th>
				<th>pendiente</th>
			</tr>
			{reportes.map((row: any, i: number) => {
				return (
					<tr>
						<td>{row.idReporte}</td>
						<td>{row.direccion}</td>
						<td>{row.tipo}</td>
						<td>{row.idUsuario}</td>
						<td>{row.pendiente}</td>
						<PointerTd onClick={() => openModal(row)}>Editar</PointerTd>
						<PointerTd onClick={() => eliminarCompra(row.idReporte)}>Borrar</PointerTd>
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
								<TextLabel>idReporte</TextLabel>
								<TextField
									name="idReporte"
									defaultValue={modalInfo.idReporte}
									type="number"
									isDisabled={true}
								/>
							</div>
							<div>
								<TextLabel>direccion</TextLabel>
								<TextField
									name="direccion"
									defaultValue={modalInfo.direccion}
									onChange={(event) => cambiardireccion(event)}
								/>
							</div>
							<div>
								<TextLabel>tipo</TextLabel>
								<TextField
									name="tipo"
									defaultValue={modalInfo.tipo}
									onChange={(event) => cambiartipo(event)}
								/>
							</div>
							<div>
								<TextLabel>idUsuario</TextLabel>
								<TextField
									name="idUsuario"
									defaultValue={modalInfo.idUsuario}
									onChange={(event) => cambiaridUsuario(event)}
								/>
							</div>

							<div>
								<TextLabel>pendiente</TextLabel>
								<TextField
									name="pendiente"
									defaultValue={modalInfo.pendiente}
									onChange={(event) => cambiarpendiente(event)}
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
