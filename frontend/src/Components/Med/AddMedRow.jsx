import React, { Component } from "react";
import { TableCell, TableRow, Input, Tooltip, Checkbox } from "@mui/material";
import { Add } from "@mui/icons-material";

export default class AddMedRow extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			producer: "",
			price: "",
			requiresRecepy: false,
			nameError: false,
			producerError: false,
			priceError: false,
		};
	}

	handleChange = (event) => {
		if (event.target.name === "requiresRecepy")
			this.setState({
				requiresRecepy: event.target.checked,
			});
		else
			this.setState({ [event.target.name]: event.target.value }, () =>
				this.validateInput(event.target.name)
			);
	};

	validateInput(field) {
		let valid = true;
		if (field === "name" || field === "all") {
			if (this.state.name === "") {
				this.setState({
					nameError: true,
				});
				valid = false;
			} else
				this.setState({
					nameError: false,
				});
		}
		if (field === "producer" || field === "all") {
			if (this.state.producer === "") {
				this.setState({
					producerError: true,
				});
				valid = false;
			} else
				this.setState({
					producerError: false,
				});
		}
		if (field === "price" || field === "all") {
			if (this.state.price <= 0.1) {
				this.setState({
					priceError: true,
				});
				valid = false;
			} else
				this.setState({
					priceError: false,
				});
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
					<Input
						required
						id="outlined-required"
						label="name"
						name="name"
						placeholder="eg. Algocalmin"
						error={this.state.nameError}
						onChange={this.handleChange}
					></Input>
				</TableCell>
				<TableCell key={3} align="right" style={{ minWidth: "170" }}>
					<Input
						required
						id="outlined-required"
						label="producer"
						name="producer"
						placeholder="eg. Farmec SRL"
						error={this.state.producerError}
						onChange={this.handleChange}
					></Input>
				</TableCell>
				<TableCell key={4} align="right" style={{ minWidth: "170" }}>
					<Input
						required
						id="outlined-required"
						label="price"
						name="price"
						type="number"
						placeholder="eg. 3.1415"
						error={this.state.priceError}
						onChange={this.handleChange}
					></Input>
				</TableCell>
				<TableCell key={5} align="right" style={{ minWidth: "170" }}>
					<Checkbox
						name="requiresRecepy"
						id="outlined-required"
						label="requiresRecepy"
						onChange={this.handleChange}
					></Checkbox>
				</TableCell>
				<TableCell align="right" key={7}>
					<Tooltip title="Add">
						<Add
							onClick={() => {
								if (this.validateInput("all")) {
									console.log(this.state);
									this.props.onSubmit(
										this.state.name,
										this.state.producer,
										this.state.price,
										this.state.requiresRecepy
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
