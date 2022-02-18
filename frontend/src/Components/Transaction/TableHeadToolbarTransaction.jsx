import React, { Component } from "react";
import { FilterList, Search } from "@mui/icons-material";
import {
	Toolbar,
	Tooltip,
	IconButton,
	Input,
	Button,
	TextField,
} from "@mui/material";

export default class TableHeadToobarTransaction extends Component {
	constructor(props) {
		super(props);
		this.state = {
			displayFilters: true,
			fromDate: "",
			toDate: "",
		};
	}

	handleChange = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	};

	handleDisplayFilters = () => {
		this.setState({
			displayFilters: !this.state.displayFilters,
		});
	};

	validateFields() {
		let valid = true;
		if (this.state.fromDate === "" || this.state.toDate === "") valid = false;
		return valid;
	}

	render() {
		return this.state.displayFilters ? (
			<Toolbar
				sx={{
					pl: { sm: 2 },
					pr: { xs: 1, sm: 1 },
					display: "flex",
					justifyContent: "space-between",
					width: "90%",
					margin: "auto",
					paddingTop: "10px",
				}}
			>
				<div style={{ display: "flex", alignItems: "center" }}>
					from:
					<TextField
						type="date"
						variant="standard"
						name="fromDate"
						onChange={this.handleChange}
						style={{ margin: "0 10px 0 10px" }}
					></TextField>
					to:
					<TextField
						type="date"
						variant="standard"
						name="toDate"
						onChange={this.handleChange}
						style={{ margin: "0 10px" }}
					></TextField>
					<Tooltip title="Show only the transactions that were made during the selected interval">
						<Button
							onClick={() => {
								if (this.validateFields())
									this.props.onFilterByInterval(
										this.state.fromDate,
										this.state.toDate
									);
								else
									this.props.onShowNotification(
										"error",
										"Please select interval"
									);
							}}
						>
							Filter interval
						</Button>
					</Tooltip>
					<Tooltip title="Remove the transactions that were made during the selected interval">
						<Button
							color="error"
							onClick={() => {
								if (this.validateFields()) {
									this.props.onDeleteByInterval(
										this.state.fromDate,
										this.state.toDate
									);
								} else
									this.props.onShowNotification(
										"error",
										"Please select interval"
									);
							}}
						>
							Delete interval
						</Button>
					</Tooltip>
				</div>
				<Tooltip title="Hide filters">
					<IconButton onClick={this.handleDisplayFilters}>
						<FilterList />
					</IconButton>
				</Tooltip>
			</Toolbar>
		) : (
			<Toolbar
				sx={{
					pl: { sm: 2 },
					pr: { xs: 1, sm: 1 },
					display: "flex",
					justifyContent: "space-between",
					width: "90%",
					margin: "auto",
				}}
			>
				<div style={{ visibility: "hidden", alignItems: "center" }}>
					<Input type="text"></Input>
					<IconButton>
						<Search />
					</IconButton>
				</div>
				<Tooltip title="Show filters">
					<IconButton onClick={this.handleDisplayFilters}>
						<FilterList />
					</IconButton>
				</Tooltip>
			</Toolbar>
		);
	}
}
