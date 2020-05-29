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
	idCompra: 0,
	idUsuario: 0,
	Usuario: "a",
	idOferta: 0,
	Oferta: "a"
};
export const TablaCompras = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [modalInfo, setModalInfo] = useState(defaultRow);
	const [compras, setCompras] = useState<any[]>([]);
	const pillarDatos = async () => {
		console.log("datos", cookies.get("user").idusuario);
		fetch(`http://127.0.0.1:80/carrero/admin/vercompras.php`)
			.then((datos) => datos.json())
			.then((datosJson) => {
				console.log("datos", datosJson);
				setCompras(datosJson);
			});
	};
	const eliminarCompra = (idCompra: number) => {
		console.log("datos", idCompra);
		fetch(`http://127.0.0.1/carrero/admin/borrarCompras.php?idCompra=${idCompra}`);
		pillarDatos();
	};
	useEffect(() => {
		pillarDatos();
	}, []);
	const openModal = (row: any) => {
		setModalInfo(row);
		setIsOpen(true);
	};
	const editarCompra = () => {
		fetch(
			`http://127.0.0.1:80/carrero/admin/editarCompras.php?idCompra=${modalInfo.idCompra}&idUsuario=${modalInfo.idUsuario}&idOferta=${modalInfo.idOferta}`
		);
		pillarDatos();
		setIsOpen(false);
		console.log("info", modalInfo);
	};
	const cambiarIdUsuario = (idUsuario: any) => {
		setModalInfo({
			...modalInfo,
			idUsuario: idUsuario.target.value
		});
	};
	const cambiarIdOferta = (idOferta: any) => {
		setModalInfo({
			...modalInfo,
			idOferta: idOferta.target.value
		});
	};
	return (
		<table>
			<tr>
				<th>idCompra</th>
				<th>idUsuario</th>
				<th>Usuario</th>
				<th>idOferta</th>
				<th>Oferta</th>
			</tr>
			{compras.map((row: any, i: number) => {
				return (
					<tr>
						<td>{row.idCompra}</td>
						<td>{row.idUsuario}</td>
						<td>{row.Usuario}</td>
						<td>{row.idOferta}</td>
						<td>{row.Oferta}</td>
						<PointerTd onClick={() => openModal(row)}>Editar</PointerTd>
						<PointerTd onClick={() => eliminarCompra(row.idCompra)}>Borrar</PointerTd>
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
								<TextLabel>IdCompra</TextLabel>
								<TextField
									name="idCompra"
									defaultValue={modalInfo.idCompra}
									type="number"
									isDisabled={true}
								/>
							</div>
							<div>
								<TextLabel>IdUsuario actual: {modalInfo.Usuario}</TextLabel>
								<TextField
									name="idUsuario"
									defaultValue={modalInfo.idUsuario}
									type="number"
									onChange={(event) => cambiarIdUsuario(event)}
								/>
							</div>
							<div>
								<TextLabel>IdOferta actual: {modalInfo.Oferta}</TextLabel>
								<TextField
									name="idOferta"
									defaultValue={modalInfo.idOferta}
									type="number"
									onChange={(event) => cambiarIdOferta(event)}
								/>
							</div>
							<Button
								style={{ display: "block", marginTop: "10px" }}
								type="submit"
								onClick={() => editarCompra()}
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
