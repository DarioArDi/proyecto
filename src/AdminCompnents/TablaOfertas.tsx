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
	idOferta: 0,
	oferta: "a",
	precio: "a",
	inventario: "a",
	idEmpresa: "a"
};
export const TablaOfertas = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [modalInfo, setModalInfo] = useState(defaultRow);
	const [ofertas, setOfertas] = useState<any[]>([]);
	const pillarDatos = async () => {
		console.log("datos", cookies.get("user").idoferta);
		fetch(`http://127.0.0.1:80/carrero/admin/verOfertas.php`)
			.then((datos) => datos.json())
			.then((datosJson) => {
				console.log("datos", datosJson);
				setOfertas(datosJson);
			});
	};
	const eliminarOferta = (idOferta: number) => {
		console.log("datos", idOferta);
		fetch(`http://127.0.0.1/carrero/admin/borrarOfertas.php?idOferta=${idOferta}`);
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
			`http://127.0.0.1:80/carrero/admin/editarOfertas.php?idOferta=${modalInfo.idOferta}&oferta=${modalInfo.oferta}&precio=${modalInfo.precio}&inventario=${modalInfo.inventario}&idEmpresa=${modalInfo.idEmpresa}`
		);
		pillarDatos();
		setIsOpen(false);
		console.log("info", modalInfo);
	};
	const cambiaroferta = (oferta: any) => {
		setModalInfo({
			...modalInfo,
			oferta: oferta.target.value
		});
	};
	const cambiarprecio = (precio: any) => {
		setModalInfo({
			...modalInfo,
			precio: precio.target.value
		});
	};
	const cambiarinventario = (inventario: any) => {
		setModalInfo({
			...modalInfo,
			inventario: inventario.target.value
		});
	};
	const cambiaridEmpresa = (idEmpresa: any) => {
		setModalInfo({
			...modalInfo,
			idEmpresa: idEmpresa.target.value
		});
	};
	return (
		<table>
			<tr>
				<th>idOferta</th>
				<th>oferta</th>
				<th>precio</th>
				<th>inventario</th>
				<th>idEmpresa</th>
			</tr>
			{ofertas.map((row: any, i: number) => {
				return (
					<tr>
						<td>{row.idOferta}</td>
						<td>{row.oferta}</td>
						<td>{row.precio}</td>
						<td>{row.inventario}</td>
						<td>{row.idEmpresa}</td>
						<PointerTd onClick={() => openModal(row)}>Editar</PointerTd>
						<PointerTd onClick={() => eliminarOferta(row.idOferta)}>Borrar</PointerTd>
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
								<TextLabel>idOferta</TextLabel>
								<TextField
									name="idOferta"
									defaultValue={modalInfo.idOferta}
									type="number"
									isDisabled={true}
								/>
							</div>
							<div>
								<TextLabel>oferta</TextLabel>
								<TextField
									name="oferta"
									defaultValue={modalInfo.oferta}
									onChange={(event) => cambiaroferta(event)}
								/>
							</div>
							<div>
								<TextLabel>precio</TextLabel>
								<TextField
									name="precio"
									defaultValue={modalInfo.precio}
									onChange={(event) => cambiarprecio(event)}
								/>
							</div>
							<div>
								<TextLabel>inventario</TextLabel>
								<TextField
									name="inventario"
									defaultValue={modalInfo.inventario}
									onChange={(event) => cambiarinventario(event)}
								/>
							</div>

							<div>
								<TextLabel>idEmpresa</TextLabel>
								<TextField
									name="idEmpresa"
									defaultValue={modalInfo.idEmpresa}
									onChange={(event) => cambiaridEmpresa(event)}
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
