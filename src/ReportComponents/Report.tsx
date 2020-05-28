import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import Cookies from "universal-cookie";
import Form, { Field } from "@atlaskit/form";
import TextField from "@atlaskit/textfield";
import { Checkbox } from "@atlaskit/checkbox";
import Button from "@atlaskit/button";
import ModalDialog, { ModalTransition } from "@atlaskit/modal-dialog";
import { ModalReport } from "./ModalReport";
import { initialReportState } from "./inicialReducerState";
import { reducer } from "./reportsReducer";
import { ReportsActions } from "./reportsActions";
import Road from "../img/road.jpg";
import Sign from "../img/sign.jpg";

export const ReportRow = ({ row }: any) => {
	return (
		<tr id={row.idReporte}>
			<td>{row.direction}</td>
			<td>{row.tipo === "road" ? "Carretera" : "Señal"}</td>
			<td>{row.pending === "1" ? "Pendiente" : "Resuelto"}</td>
		</tr>
	);
};
