import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import Form, { Field } from "@atlaskit/form";
import TextField from "@atlaskit/textfield";
import { Checkbox } from "@atlaskit/checkbox";
import Button from "@atlaskit/button";
import Cookies from "universal-cookie";
let cookies = new Cookies();
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
export const ShopHistory = () => {
	const [shop, setShop] = useState<any[]>([]);
	const [sinPuntos, setSinPuntos] = useState(false);
	const pillarDatos = async () => {
		fetch(`http://127.0.0.1:80/carrero/vertienda.php`)
			.then((datos) => datos.json())
			.then((datosJson) => {
				setShop(datosJson);
			});
	};
	useEffect(() => {
		pillarDatos();
	}, []);
	return (
		<Container>
			{/* <MostrarDatos datos={filtrarDatos(reportes, filter)} /> */}
			<table>
				<tbody>
					{shop.map((row: any) => {
						if (row.inventario > 0) {
							return (
								<tr key={row.idOferta} id={row.idOferta}>
									<td>{row.oferta}</td>
									<td>{row.inventario}</td>
								</tr>
							);
						}
					})}
				</tbody>
			</table>
			{sinPuntos ? <div>No tienes puntos suficientes</div> : <></>}
		</Container>
	);
};

const Container = styled.div({
	// display: "flex"
});
