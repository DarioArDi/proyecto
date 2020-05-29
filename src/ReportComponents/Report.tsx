import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Cookies from "universal-cookie";
import Form, { Field } from "@atlaskit/form";
import TextField from "@atlaskit/textfield";
import { Checkbox } from "@atlaskit/checkbox";
import Button from "@atlaskit/button";
import road from "../img/road.jpg";
import sign from "../img/sign.jpg";
import papelera from "../img/trash.png";

export const ReportRow = (props: any) => {
	console.log(props);
	return (
		<Container>
			{props.row.tipo === "road" ? <img src={road} alt="img" /> : <img src={sign} alt="img" />}
			<div style={{ backgroundColor: "#61cffa" }}>
				<div>
					<span>Calle:</span>
					<div>{props.row.direction}</div>
				</div>
				<div>
					<span>Estado:</span>
					<div>{props.row.pending === "1" ? "Pendiente" : "Resuelto"}</div>
				</div>
				<Papelera>
					<img
						src={papelera}
						alt="img"
						onClick={() => {
							props.eliminarReporte(props.row.idReporte);
						}}
					/>
				</Papelera>
			</div>
		</Container>
	);
};
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
const Papelera = styled.div({
	display: "flex",
	justifyContent: "flex-end",
	img: {
		width: "20px",
		margin: "0px 2px 2px 0px",
		":hover": {
			cursor: "pointer"
		}
	}
});
