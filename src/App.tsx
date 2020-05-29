import React, { useState } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
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
import { CreateOffer } from "./ShopComponents/CreateOffer";
import { SeeShop } from "./ShopComponents/seeShop";
import { ShopHistory } from "./ShopComponents/ShopHistory";
import { AdminPannel } from "./AdminCompnents/AdminPannel";
const cookies = new Cookies();
const IsAdmin = () => {
	if (cookies.get("user").usuario === "admin") {
		// eslint-disable-next-line no-restricted-globals
		location.href = "http://localhost:3000/admin";
	} else {
		// eslint-disable-next-line no-restricted-globals
		location.href = "http://localhost:3000/mainmenu";
	}
	return <></>;
};
function App() {
	const [puntos, setPuntos] = useState(cookies.get("user") ? cookies.get("user").puntos : 0);

	console.log("cookie", cookies.get("user"));
	return (
		<Router>
			<Dashboard puntos={puntos} />
			<Route exact path="/">
				{cookies.get("user") ? <IsAdmin /> : <SignIn />}
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
			<Route path="/createoffer">
				<CreateOffer />
			</Route>
			<Route path="/store">
				<SeeShop setPuntos={setPuntos} />
			</Route>
			<Route path="/shophistory">
				<ShopHistory />
			</Route>
			<Route path="/admin">
				<AdminPannel />
			</Route>
		</Router>
	);
}
export default App;
