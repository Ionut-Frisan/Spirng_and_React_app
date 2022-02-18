import React, { Component } from "react";
import { TableCell, TableRow, Input, Tooltip } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
export default class CardRow extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: 0,
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

	componentDidMount() {
		this.setState({
			id: this.props.card.id,
			firstName: this.props.card.firstName,
			lastName: this.props.card.lastName,
			cnp: this.props.card.cnp,
			dob: this.props.card.dob,
			dor: this.props.card.dor,
		});
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
				<TableCell key={1} align="right" style={{ minWidth: "170" }}>
					{this.props.card.id}
				</TableCell>
				<TableCell key={2} align="right" style={{ minWidth: "170" }}>
					<Input
						required
						id="outlined-required"
						label="firsName"
						name="firstName"
						error={this.state.firstNameError}
						defaultValue={this.props.card.firstName}
						onChange={this.handleChange}
					></Input>
				</TableCell>
				<TableCell key={3} align="right" style={{ minWidth: "170" }}>
					<Input
						required
						id="outlined-required"
						label="lastName"
						name="lastName"
						error={this.state.lastNameError}
						defaultValue={this.props.card.lastName}
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
						error={this.state.cnpError}
						defaultValue={this.props.card.cnp}
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
						defaultValue={this.props.card.dob}
						onChange={this.handleChange}
					></Input>
				</TableCell>
				<TableCell key={6} align="right" style={{ minWidth: "170" }}>
					<Input
						disabled={true}
						name="dor"
						id="outlined-required"
						label="dor"
						type="date"
						error={this.state.dorError}
						defaultValue={this.props.card.dor}
					></Input>
				</TableCell>
				<TableCell align="right" key={7}>
					<Tooltip title="Update">
						<Edit
							onClick={() => {
								if (this.validateInput("all"))
									this.props.onUpdate(
										this.state.id,
										this.state.firstName,
										this.state.lastName,
										this.state.cnp,
										this.state.dob,
										this.state.dor
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
