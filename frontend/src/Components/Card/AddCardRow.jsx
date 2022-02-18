import React, { Component } from "react";
import { TableCell, TableRow, Input, Tooltip } from "@mui/material";
import { Add } from "@mui/icons-material";

export default class AddCardRow extends Component {
	constructor(props) {
		super(props);
		this.state = {
			firstName: "",
			lastName: "",
			cnp: "",
			dob: "",
			dor: "",
			firstNameError: false,
			lastNameError: false,
			cnpError: false,
			dobError: false,
			dorError: false,
		};
	}

	handleChange = (event) => {
		this.setState({ [event.target.name]: event.target.value }, () =>
			this.validateInput(event.target.name)
		);
	};

	validateInput(field) {
		let valid = true;
		if (field === "firstName" || field === "all") {
			if (this.state.firstName === "") {
				this.setState({
					firstNameError: true,
				});
				valid = false;
			} else
				this.setState({
					firstNameError: false,
				});
		}
		if (field === "lastName" || field === "all") {
			if (this.state.lastName === "") {
				this.setState({
					lastNameError: true,
				});
				valid = false;
			} else
				this.setState({
					lastNameError: false,
				});
		}
		if (field === "cnp" || field === "all") {
			if (this.state.cnp.length !== 13) {
				this.setState({
					cnpError: true,
				});
				valid = false;
			} else
				this.setState({
					cnpError: false,
				});
		}
		if (field === "dob" || field === "all") {
			if (this.state.dob === "") {
				this.setState({
					dobError: true,
				});
				valid = false;
			} else
				this.setState({
					dobError: false,
				});
		}
		if (field === "dor" || field === "all")
			if (this.state.dor === "") {
				this.setState({
					dorError: true,
				});
				valid = false;
			} else
				this.setState({
					dorError: false,
				});

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
					<Input
						required
						id="outlined-required"
						label="firsName"
						name="firstName"
						placeholder="eg. Ionut"
						error={this.state.firstNameError}
						onChange={this.handleChange}
					></Input>
				</TableCell>
				<TableCell key={3} align="right" style={{ minWidth: "170" }}>
					<Input
						required
						id="outlined-required"
						label="lastName"
						name="lastName"
						placeholder="eg. Frisan"
						error={this.state.lastNameError}
						onChange={this.handleChange}
					></Input>
				</TableCell>
				<TableCell key={4} align="right" style={{ minWidth: "170" }}>
					<Input
						required
						id="outlined-required"
						label="cnp"
						name="cnp"
						type="number"
						placeholder="eg. 1000902123123"
						error={this.state.cnpError}
						onChange={this.handleChange}
					></Input>
				</TableCell>
				<TableCell key={5} align="right" style={{ minWidth: "170" }}>
					<Input
						required
						name="dob"
						id="outlined-required"
						label="dob"
						type="date"
						error={this.state.dobError}
						onChange={this.handleChange}
					></Input>
				</TableCell>
				<TableCell key={6} align="right" style={{ minWidth: "170" }}>
					<Input
						name="dor"
						id="outlined-required"
						label="dor"
						type="date"
						error={this.state.dorError}
						onChange={this.handleChange}
					></Input>
				</TableCell>
				<TableCell align="right" key={7}>
					<Tooltip title="Add">
						<Add
							onClick={() => {
								if (this.validateInput("all"))
									this.props.onSubmit(
										this.state.firstName,
										this.state.lastName,
										this.state.cnp,
										this.state.dob,
										this.state.dor
									);
								else
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
