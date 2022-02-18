import React, { Component } from "react";
import {
	TableCell,
	TableRow,
	Tooltip,
	Select,
	MenuItem,
	TextField,
} from "@mui/material";
import { Add } from "@mui/icons-material";

export default class AddTrasanctionRow extends Component {
	constructor(props) {
		super(props);
		this.state = {
			card: "",
			medicament: -1,
			noOfPieces: "",
			date: "",
			time: "",
			medError: "",
			noOfPiecesError: "",
			dateError: "",
			timeError: "",
		};
	}

	handleChange = (event) => {
		this.setState({ [event.target.name]: event.target.value }, () => {
			this.validateInput(event.target.name);
		});
	};

	validateInput(field) {
		let valid = true;

		//checking if med was selected
		if (field === "all")
			if (this.state.medicament === -1)
				this.setState({
					medError: "Please select a med",
				});
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
			if (this.state.time === "") {
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
				<TableCell
					key={1}
					align="right"
					style={{ minWidth: "170" }}
				></TableCell>
				<TableCell key={2} align="right" style={{ minWidth: "170" }}>
					<Select
						variant="standard"
						name="medicament"
						onChange={this.handleChange}
						required
						error={this.state.medError !== ""}
						defaultValue={-1}
					>
						{" "}
						<MenuItem value={-1}> Select med </MenuItem>
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
						required
						defaultValue={0}
					>
						<MenuItem value={0}> Anonymus </MenuItem>
						{JSON.parse(window.localStorage.getItem("cards")).map((card) => {
							return (
								<MenuItem value={card.id} key={`cardoption${card.id}`}>
									{`${card.cnp}: ${card.firstName}`}{" "}
								</MenuItem>
							);
						})}
					</Select>
				</TableCell>
				<TableCell key={4} align="right" style={{ minWidth: "170" }}>
					<TextField
						required
						variant="standard"
						id="outlined-required"
						name="noOfPieces"
						type="number"
						placeholder="eg. 4"
						error={this.state.noOfPiecesError !== ""}
						helperText={this.state.noOfPiecesError}
						onChange={this.handleChange}
					></TextField>
				</TableCell>
				<TableCell key={5} align="right" style={{ minWidth: "170" }}>
					<TextField
						variant="standard"
						type="date"
						name="date"
						id="outlined-required"
						error={this.state.dateError !== ""}
						helperText={this.state.dateError}
						onChange={this.handleChange}
					></TextField>
				</TableCell>
				<TableCell key={6} align="right" style={{ minWidth: "170" }}>
					<TextField
						variant="standard"
						type="time"
						name="time"
						id="outlined-required"
						defaultValue={"00:00:01"}
						error={this.state.timeError !== ""}
						helperText={this.state.timeError}
						onChange={this.handleChange}
					></TextField>
				</TableCell>
				<TableCell align="right" key={7}>
					<Tooltip title="Add">
						<Add
							onClick={() => {
								if (this.validateInput("all")) {
									console.log(this.state);
									this.props.onSubmit(
										this.state.medicament,
										this.state.card,
										this.state.noOfPieces,
										this.state.date,
										this.state.time
									);
								} else
									this.props.onShowNotification(
										"error",
										"Please make sure you enter valid data and try again!"
									);
							}}
						/>
					</Tooltip>
				</TableCell>
			</TableRow>
		);
	}
}
