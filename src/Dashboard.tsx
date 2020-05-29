import React, { useState } from "react";
import styled from "styled-components";
import Cookies from "universal-cookie";
import logo from "./img/logo.png";
import logout from "./img/logout.png";
import puntosIcon from "./img/puntos.png";
const cookies = new Cookies();
const cerrarSesion = () => {
	cookies.remove("user");
	volver();
};
const volver = () => {
	// eslint-disable-next-line no-restricted-globals
	location.href = "http://localhost:3000";
};
export const Dashboard = ({ puntos }: any) => {
	const Puntos = () => {
		if (cookies.get("user").type === "cliente") {
			return (
				<PuntosContainer>
					<img src={puntosIcon} alt="img" />
					<span>{puntos}</span>
				</PuntosContainer>
			);
		} else {
			return <></>;
		}
	};
	return (
		<BarraUsuario>
			<Logo src={logo} alt="logo" onClick={() => volver()} />
			<UserInfo>
				<div>{cookies.get("user") ? cookies.get("user").usuario : ""}</div>
				{cookies.get("user") ? <Puntos /> : <></>}
				{cookies.get("user") ? (
					<Logout>
						<img src={logout} alt="img" onClick={() => cerrarSesion()} />
					</Logout>
				) : (
					<></>
				)}
			</UserInfo>
		</BarraUsuario>
	);
};
const Logout = styled.div({
	display: "flex",
	alignSelft: "flex-end",
	flexDirection: "row-reverse",
	margin: "auto 0px 0px 0px",
	img: {
		width: "20px",
		":hover": {
			cursor: "pointer"
		}
	}
});
const UserInfo = styled.div({
	margin: "0px 10px 0px auto",
	display: "flex",
	flexDirection: "column",
	"> div:first-child": {
		fontSize: "30px"
	}
});
const BarraUsuario = styled.div({
	backgroundColor: "#9AD3F8",
	height: "90px",
	display: "flex"
});
const Logo = styled.img({
	display: "flex",
	height: "80px",
	margin: "5px 0px 0px 5px",
	":hover": {
		cursor: "pointer"
	}
});
const PuntosContainer = styled.div({
	img: {
		width: "20px"
	},
	span: {}
});
