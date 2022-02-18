import React, { Component } from "react";
import {
	TableCell,
	TableRow,
	Tooltip,
	Select,
	MenuItem,
	TextField,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

export default class TransactionRow extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: 0,
			medicament: "",
			card: "",
			noOfPieces: 0,
			date: "",
			time: "",
			noOfPiecesError: "",
			dateError: "",
			timeError: "",
		};
	}

	componentDidMount() {
		this.setState({
			id: this.props.transaction.id,
			medicament: this.props.transaction.medicament.id,
			card:
				this.props.transaction.card == null
					? 0
					: this.props.transaction.card.id,
			noOfPieces: this.props.transaction.noOfPieces,
			date: this.props.transaction.date,
			time: this.props.transaction.time,
		});
	}

	handleChange = (event) => {
		this.setState({ [event.target.name]: event.target.value }, () =>
			this.validateInput(event.target.name)
		);
	};

	validateInput(field) {
		let valid = true;
		console.log(this.state);
		//validating number of pieces: has to be int > 0
		if (field === "noOfPieces" || field === "all") {
			if (this.state.noOfPieces === "") {
				this.setState({
					noOfPiecesError: "Can't be empty",
				});
				valid = false;
			} else if (
				this.state.noOfPieces !== parseInt(this.state.noOfPieces).toString()
			) {
				this.setState({
					noOfPiecesError: "Should be an integer",
				});
				valid = false;
			} else if (parseInt(this.state.noOfPieces) < 1) {
				this.setState({
					noOfPiecesError: "Can't be lower than 1",
				});
				valid = false;
			} else {
				this.setState({
					noOfPiecesError: "",
				});
			}
		}

		//validating date: can't be in the future
		if (field === "date" || field === "all") {
			if (this.state.date === "") {
				this.setState({
					dateError: "Can't be empty",
				});
				valid = false;
			} else {
				var today = new Date();
				var inputDate = new Date(this.state.date + "T00:00:01");

				if (inputDate.getTime() > today.getTime()) {
					this.setState({
						dateError: "Can't be in the future",
					});
					valid = false;
				} else
					this.setState({
						dateError: "",
					});
			}
		}

		//validating time: can't be in the future
		if (field === "time" || field === "all" || field === "date") {
			if (this.state.price <= 0.1) {
				this.setState({
					timeError: "Can't be empty",
				});
				valid = false;
			} else {
				if (this.state.date !== "") {
					var inputDateTime = new Date(this.state.date + "T" + this.state.time);
					var today = new Date();

					if (inputDateTime.getTime() > today.getTime()) {
						this.setState({
							timeError: "Can't be in the future",
						});
						valid = false;
					} else
						this.setState({
							timeError: "",
						});
				}
			}
		}

		return valid;
	}

	render() {
		return (
			<TableRow>
				<TableCell key={1} align="right" style={{ minWidth: "170" }}>
					{this.props.transaction.id}
				</TableCell>
				<TableCell key={2} align="right" style={{ minWidth: "170" }}>
					<Select
						variant="standard"
						name="medicament"
						onChange={this.handleChange}
						defaultValue={this.props.transaction.medicament.id}
					>
						{JSON.parse(window.localStorage.getItem("meds")).map((med) => {
							return (
								<MenuItem value={med.id} key={`medOption${med.id}`}>
									{`${med.id}: ${med.name}`}{" "}
								</MenuItem>
							);
						})}
					</Select>
				</TableCell>
				<TableCell key={3} align="right" style={{ minWidth: "170" }}>
					<Select
						variant="standard"
						name="card"
						onChange={this.handleChange}
						defaultValue={
							this.props.transaction.card == undefined
								? 0
								: this.props.transaction.card.id
						}
					>
						<MenuItem value={0}> Anonymus </MenuItem>
						{JSON.parse(window.localStorage.getItem("cards")).map((card) => {
							return (
								<MenuItem value={card.id} key={`cardOption${card.id}`}>
									{`${card.cnp}: ${card.firstName} ${card.lastName}`}
								</MenuItem>
							);
						})}
					</Select>
				</TableCell>
				<TableCell key={4} align="right" style={{ minWidth: "170" }}>
					<TextField
						variant="standard"
						required
						key={"noOfPieces" + this.props.transaction.id}
						id="outlined-required"
						name="noOfPieces"
						type="number"
						error={this.state.noOfPiecesError !== ""}
						helperText={this.state.noOfPiecesError}
						defaultValue={this.props.transaction.noOfPieces}
						onChange={this.handleChange}
					></TextField>
				</TableCell>
				<TableCell key={5} align="right" style={{ minWidth: "170" }}>
					<TextField
						variant="standard"
						required
						key={"date" + this.props.transaction.id}
						type="date"
						name="date"
						error={this.state.dateError !== ""}
						helperText={this.state.dateError}
						defaultValue={this.props.transaction.date}
						onChange={this.handleChange}
					></TextField>
				</TableCell>
				<TableCell key={6} align="right" style={{ minWidth: "170" }}>
					<TextField
						variant="standard"
						required
						key={"time" + this.props.transaction.id}
						type="time"
						name="time"
						error={this.state.timeError !== ""}
						helperText={this.state.timeError}
						defaultValue={this.props.transaction.time}
						onChange={this.handleChange}
					></TextField>
				</TableCell>
				<TableCell align="right" key={7}>
					<Tooltip title="Update">
						<Edit
							onClick={() => {
								if (this.validateInput("all"))
									this.props.onUpdate(
										this.state.id,
										this.state.medicament,
										this.state.card,
										this.state.noOfPieces,
										this.state.date,
										this.state.time
									);
								else
									this.props.onShowNotification(
										"error",
										"Please enter valid data!"
									);
							}}
						/>
					</Tooltip>
					<Tooltip title="Remove">
						<Delete onClick={() => this.props.onDelete(this.state.id)} />
					</Tooltip>
				</TableCell>
			</TableRow>
		);
	}
}
