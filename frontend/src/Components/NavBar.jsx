import { Component } from "react";
import { AppBar, CssBaseline, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";
export default class NavBar extends Component {
	render() {
		return (
			<>
				<AppBar
					position="static"
					style={{
						backgroundColor: "limegreen",
						boxShadow: "rgba(0, 0, 0, 0.56) 0px 5px 5px 0px",
					}}
				>
					<CssBaseline />
					<Toolbar>
						<Link
							to="/"
							style={{
								textDecoration: "none",
								color: "white",
								margin: "auto",
								padding: "0.5rem 1rem",
								display: "inline-flex",
								position: "absolute",
								left: "30px",
							}}
						>
							Farmacy
						</Link>
						<div
							style={{
								display: "inline-flex",
								position: "absolute",
								right: "30px",
							}}
						>
							<Link
								to="/cards"
								style={{
									textDecoration: "none",
									color: "white",
									margin: "auto",
									display: "block",
									padding: "0.5rem 1rem",
								}}
							>
								Cards
							</Link>
							<Link
								to="/meds"
								style={{
									textDecoration: "none",
									color: "white",
									margin: "auto",
									display: "block",
									padding: "0.5rem 1rem",
								}}
							>
								Meds
							</Link>
							<Link
								to="/transactions"
								style={{
									textDecoration: "none",
									color: "white",
									margin: "auto",
									display: "block",
									padding: "0.5rem 1rem",
								}}
							>
								Transactions
							</Link>
						</div>
					</Toolbar>
				</AppBar>
			</>
		);
	}
}
