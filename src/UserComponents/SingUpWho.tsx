import React from "react";
import Cookies from "universal-cookie";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
export const SignUpWho = () => {
	return (
		<>
			<div>Crear cuenta como:</div>
			<Link to="/signupuser">Usuario</Link>
			<Link to="/signupcompany">Empresa</Link>
		</>
	);
};
