import React, { useState } from "react";
import styled from "styled-components";
import Cookies from "universal-cookie";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import logo from "./img/logo.png";
import logoEmpresa from "./img/a.jpg";
import info from "./img/info.png";
import ModalDialog, { ModalTransition } from "@atlaskit/modal-dialog";
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
	const [isOpen, setIsOpen] = useState(false);
	return (
		<>
			<BarraUsuario>
				<Logo src={logo} alt="logo" onClick={() => volver()} />
				<InfoIcon src={info} alt="info" onClick={() => setIsOpen(true)} />
				<UserInfo>
					<div>{cookies.get("user") ? cookies.get("user").usuario : ""}</div>
					<div>{cookies.get("user") ? puntos : ""}</div>
					{cookies.get("user") ? <div onClick={() => cerrarSesion()}>Cerrar sesión</div> : <></>}
				</UserInfo>
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
								<img src={logoEmpresa} alt="img" />
								<div>
									Carrero enterprice es una empresa dedicada a la seguridad vial. Con nuestra
									plataforma pretendemos crear un incentivo directo para mejorar la calidad de las
									vias publicas.
								</div>
								<div>
									Por tanto, gracias a tu esfuerzo y el de muchos otros. Conseguiremos reducir los
									desperfectos que han dejado el tiempo, reduciendo los accidentes con ello.
								</div>
							</div>
						</ModalDialog>
					)}
				</ModalTransition>
			</BarraUsuario>
		</>
	);
};
const InfoIcon = styled.img({
	width: "15px",
	height: "15px",
	margin: "auto 0px 0px 10px",
	":hover": {
		cursor: "pointer"
	}
});
const UserInfo = styled.div({
	marginLeft: "auto"
});
const BarraUsuario = styled.div({
	backgroundColor: "#9AD3F8",
	height: "70px",
	display: "flex"
});
const Logo = styled.img({
	display: "flex",
	height: "60px",
	margin: "5px 0px 0px 5px",
	":hover": {
		cursor: "pointer"
	}
});
