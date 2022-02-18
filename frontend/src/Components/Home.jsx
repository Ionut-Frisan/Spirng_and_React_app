import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Component } from "react";
import { MyLink, MyCard } from "../Styles/Styles";

export default class Home extends Component {
	constructor(props) {
		super(props);
		this.styled = `textDecoration: "none",
		color: "white",
		margin: "auto",
		display: "block",
		padding: "0.5rem 1rem",`;
	}

	render() {
		return (
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					width: "80%",
					flexWrap: "wrap",
					margin: "auto",
					paddingTop: "150px",
					maxWidth: "1080px",
				}}
			>
				<MyCard>
					<CardActionArea>
						<MyLink to="/cards">
							<CardMedia
								style={{ objectFit: "contain", paddingTop: "5px" }}
								component="img"
								height="140"
								image={require("../Images/Card.png")}
								alt="Cards"
							/>
							<CardContent sx={{ backgroundColor: "rgb(46,125,50)" }}>
								<Typography gutterBottom variant="h5" component="div">
									Cards
								</Typography>
								<Typography variant="body2" color="white">
									See the full list of transactions, add new entries, modify
									existing ones, delete etc.
								</Typography>
							</CardContent>
						</MyLink>
					</CardActionArea>
				</MyCard>
				<MyCard>
					<CardActionArea>
						<MyLink to="/meds">
							<CardMedia
								style={{ objectFit: "contain", paddingTop: "5px" }}
								component="img"
								height="140"
								image={require("../Images/medicines.png")}
								alt="Meds"
							/>
							<CardContent sx={{ backgroundColor: "rgb(46,125,50)" }}>
								<Typography gutterBottom variant="h5" component="div">
									Meds
								</Typography>
								<Typography variant="body2" color="white">
									See the full list of transactions, add new entries, modify
									existing ones, delete etc.
								</Typography>
							</CardContent>
						</MyLink>
					</CardActionArea>
				</MyCard>
				<MyCard>
					<CardActionArea>
						<MyLink to="/transactions">
							<CardMedia
								style={{ objectFit: "contain", padding: "5px 0px" }}
								component="img"
								height="140"
								image={require("../Images/transaction.png")}
								alt="Cards"
							/>
							<CardContent sx={{ backgroundColor: "rgb(46,125,50)" }}>
								<Typography gutterBottom variant="h5" component="div">
									Transactions
								</Typography>
								<Typography variant="body2" color="white">
									See the full list of transactions, add new entries, modify
									existing ones, delete etc.
								</Typography>
							</CardContent>
						</MyLink>
					</CardActionArea>
				</MyCard>
			</div>
		);
	}
}
