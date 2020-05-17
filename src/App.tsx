import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import cookie from "react-cookies";
import Cookies from "universal-cookie";

import { SignIn } from "./UserComponents/SignIn";
import { SignUpUser } from "./UserComponents/SignUpUser";
import { Dashboard } from "./Dashboard";
import { CreateReport } from "./ReportComponents/CreateReport";
import { SignUpCompany } from "./UserComponents/SignUpCompany";
const cookies = new Cookies();
function App() {
	const [db, setDb] = useState([]);
	const [user, setUser] = useState(cookies.get("user"));
	const [isLogged, setIsLogged] = useState(Boolean);

	console.log(cookies.get("user"));
	useEffect(() => {
		const pillarDatos = async () => {
			fetch("http://127.0.0.1:80/carrero/prueba.php")
				.then((datos) => datos.json())
				.then((datosJson) => {
					setDb(datosJson);
					console.log("datos", datosJson);
				});
		};
		pillarDatos();
		const itIsLogged = () => {
			fetch("http://127.0.0.1:80/carrero/islogged.php")
				.then((data) => data.json())
				.then((dataJson) => {
					setDb(dataJson);
					// setIsLogged(dataJson);
					console.log("buenas", dataJson);
				});
		};
		itIsLogged();
	}, []);

	return (
		<>
			<Router>
				<Dashboard user={user} />
				<Route exact path="/">
					{isLogged ? <Redirect to="/signupcompany" /> : <SignIn />}
				</Route>
				<Route path="/mainmenu"></Route>
				<Route path="/signupuser">
					<SignUpUser />
				</Route>
				<Route exact path="/signupcompany">
					<SignUpCompany />
				</Route>
				<Route path="/myreports"></Route>
				<Route path="/reports"></Route>
				<Route path="/createreport">
					<CreateReport />
				</Route>
				<Route path="/createoffer"></Route>
				<Route path="/store"></Route>
			</Router>
			{/* <MostrarDatos datos={db} /> */}
		</>
	);
}
const MostrarDatos = ({ datos }: any) => {
	console.log("mostrar", datos.length);
	if (datos.length !== undefined) {
		return (
			<>
				{datos.map((row: any, index: any) => {
					return (
						<div key={index}>
							<div>{row.idReporte}</div>
							<div>{row.img}</div>
							<div>{row.direciion}</div>
							<div>{row.tipo}</div>
							<div>{row.idUsuario}</div>
						</div>
					);
				})}
			</>
		);
	} else {
		return <div>:(</div>;
	}
};
export default App;
