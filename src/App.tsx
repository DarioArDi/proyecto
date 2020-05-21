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
import { ShowMyReports } from "./ReportComponents/ShowMyReports";
import { SignUpWho } from "./UserComponents/SingUpWho";
import { ClientMainMenu } from "./MainMenuComponents/ClientsMenu";
import { CompanyMainMenu } from "./MainMenuComponents/CompanyMenu";
import { SeeReports } from "./ReportComponents/SeeReports";
const cookies = new Cookies();
function App() {
	console.log("cookie", cookies.get("user"));

	return (
		<>
			<Router>
				<Dashboard />
				<Route exact path="/">
					{cookies.get("user") ? <Redirect to="/mainmenu" /> : <SignIn />}
				</Route>
				<Route path="/mainmenu">
					{cookies.get("user") && cookies.get("user").type === "cliente" ? (
						<ClientMainMenu />
					) : (
						<CompanyMainMenu />
					)}
				</Route>
				<Route path="/signupwho">
					<SignUpWho />
				</Route>
				<Route path="/signupuser">
					<SignUpUser />
				</Route>
				<Route exact path="/signupcompany">
					<SignUpCompany />
				</Route>
				<Route path="/myreports">
					<ShowMyReports />
				</Route>
				<Route path="/reports">
					<SeeReports />
				</Route>
				<Route path="/createreport">
					<CreateReport />
				</Route>
				<Route path="/createoffer"></Route>
				<Route path="/store"></Route>
				{/* <MostrarDatos datos={db} /> */}
			</Router>
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
