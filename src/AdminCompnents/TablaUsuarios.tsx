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
	idUsuario: 0,
	usuario: "a",
	contrasena: "a",
	correo: "a",
	edad: 0,
	puntos: 0
};
export const TablaUsuarios = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [modalInfo, setModalInfo] = useState(defaultRow);
	const [usuarios, setUsuarios] = useState<any[]>([]);
	const pillarDatos = async () => {
		console.log("datos", cookies.get("user").idusuario);
		fetch(`http://127.0.0.1:80/carrero/admin/verUsuarios.php`)
			.then((datos) => datos.json())
			.then((datosJson) => {
				console.log("datos", datosJson);
				setUsuarios(datosJson);
			});
	};
	const eliminarCompra = (idUsuario: number) => {
		console.log("datos", idUsuario);
		fetch(`http://127.0.0.1/carrero/admin/borrarUsuarios.php?idUsuario=${idUsuario}`);
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
			`http://127.0.0.1:80/carrero/admin/editarUsuarios.php?idUsuario=${modalInfo.idUsuario}&usuario=${modalInfo.usuario}&contrasena=${modalInfo.contrasena}&correo=${modalInfo.correo}&edad=${modalInfo.edad}&puntos=${modalInfo.puntos}`
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
	const cambiaredad = (edad: any) => {
		setModalInfo({
			...modalInfo,
			edad: edad.target.value
		});
	};
	const cambiarpuntos = (puntos: any) => {
		setModalInfo({
			...modalInfo,
			puntos: puntos.target.value
		});
	};
	return (
		<table>
			<tr>
				<th>idUsuario</th>
				<th>usuario</th>
				<th>contrasena</th>
				<th>correo</th>
				<th>edad</th>
				<th>puntos</th>
			</tr>
			{usuarios.map((row: any, i: number) => {
				return (
					<tr>
						<td>{row.idUsuario}</td>
						<td>{row.usuario}</td>
						<td>{row.contrasena}</td>
						<td>{row.correo}</td>
						<td>{row.edad}</td>
						<td>{row.puntos}</td>
						<PointerTd onClick={() => openModal(row)}>Editar</PointerTd>
						<PointerTd onClick={() => eliminarCompra(row.idUsuario)}>Borrar</PointerTd>
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
								<TextLabel>idUsuario</TextLabel>
								<TextField
									name="idUsuario"
									defaultValue={modalInfo.idUsuario}
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
								<TextLabel>edad</TextLabel>
								<TextField
									name="edad"
									defaultValue={modalInfo.edad}
									onChange={(event) => cambiaredad(event)}
								/>
							</div>
							<div>
								<TextLabel>puntos</TextLabel>
								<TextField
									name="puntos"
									defaultValue={modalInfo.puntos}
									onChange={(event) => cambiarpuntos(event)}
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
