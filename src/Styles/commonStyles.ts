import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
export const CommonContainer = styled.div({
	margin: "0px auto 0px auto",
	width: "340px",
	display: "flex",
	justifyContent: "center",
	flexDirection: "column"
});
export const TextLabel = styled.label({
	fontSize: "0.8571428571428571em",
	fontStyle: "inherit",
	lineHeight: "1.3",
	display: "inline-block",
	marginBottom: "4px",
	marginTop: "0px"
});
export const CommonTitle = styled.h1({
	textAlign: "center",
	// fontSize: "30px",
	fontFamily: "Didot",
	margin: "30px 0px 0px 0px"
});
export const PointerTd = styled.td({
	":hover": {
		cursor: "pointer"
	}
});
export const Container = styled.div({
	display: "flex",
	"@media": {},
	justifyContent: "center"
});
export const Opcion = styled(Link)({
	margin: "25px 10px 0px 10px",
	textAlign: "center",
	textDecoration: "none",
	img: {
		width: "250px",
		height: "220px",
		marginTop: "10px"
	},
	":visited": {
		color: "#0c59b0"
	},
	":link": {
		color: "#0c59b0"
	}
});
