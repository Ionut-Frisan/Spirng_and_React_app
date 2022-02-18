import React, { Component } from "react";
import { TableCell, TableRow, Input, Tooltip, Checkbox } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

export default class MedRow extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: 0,
			name: "",
			producer: "",
			price: "",
			requiresRecepy: false,
			nameError: false,
			producerError: false,
			priceError: false,
		};
	}

	componentDidMount() {
		this.setState({
			id: this.props.med.id,
			name: this.props.med.name,
			producer: this.props.med.producer,
			price: this.props.med.price,
			requiresRecepy: this.props.med.requiresRecepy,
		});
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
				<TableCell key={1} align="right" style={{ minWidth: "170" }}>
					{this.props.med.id}
				</TableCell>
				<TableCell key={2} align="right" style={{ minWidth: "170" }}>
					<Input
						key={"name" + this.props.med.id}
						required
						id="outlined-required"
						label="name"
						name="name"
						error={this.state.nameError}
						defaultValue={this.props.med.name}
						onChange={this.handleChange}
					></Input>
				</TableCell>
				<TableCell key={3} align="right" style={{ minWidth: "170" }}>
					<Input
						required
						key={"producer" + this.props.med.id}
						id="outlined-required"
						label="producer"
						name="producer"
						error={this.state.producerError}
						defaultValue={this.props.med.producer}
						onChange={this.handleChange}
					></Input>
				</TableCell>
				<TableCell key={4} align="right" style={{ minWidth: "170" }}>
					<Input
						required
						key={"price" + this.props.med.id}
						id="outlined-required"
						label="price"
						name="price"
						type="number"
						error={this.state.priceError}
						defaultValue={this.props.med.price}
						onChange={this.handleChange}
					></Input>
				</TableCell>
				<TableCell key={5} align="right" style={{ minWidth: "170" }}>
					<Checkbox
						key={"requiresRecepy" + this.props.med.id}
						name="requiresRecepy"
						id="outlined-required"
						label="requiresRecepy"
						checked={this.props.med.requiresRecepy}
						onChange={this.handleChange}
					></Checkbox>
				</TableCell>
				<TableCell align="right" key={7}>
					<Tooltip title="Update">
						<Edit
							onClick={() => {
								if (this.validateInput("all"))
									this.props.onUpdate(
										this.state.id,
										this.state.name,
										this.state.producer,
										this.state.price,
										this.state.requiresRecepy
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
