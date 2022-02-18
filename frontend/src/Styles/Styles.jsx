import { styled } from "@mui/system";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";

export const MyLink = styled(Link)({
	textDecoration: "none",
	color: "white",
	margin: "auto",
	display: "block",
	textAlign: "center",
});

export const MyCard = styled(Card)({
	maxWidth: 345,
	borderRadius: "30px",
	marginBottom: "10px",
	boxShadow: "5px 10px 5px 5px rgb(186, 186, 186)",
});
