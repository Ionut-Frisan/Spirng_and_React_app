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

export default class TableHeadToobarMed extends Component {
	constructor(props) {
		super(props);
		this.state = {
			displayFilters: true,
			terms: "",
			percentage: 0,
			increasePricesLowerThan: 0,
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
				<div style={{ display: "block", alignItems: "center" }}>
					<Input type="text" name="terms" onChange={this.handleChange}></Input>
					<IconButton onClick={() => this.props.onSubmit(this.state.terms)}>
						<Search />
					</IconButton>
				</div>
				<div style={{ display: "block", alignItems: "center" }}>
					<Button onClick={this.props.onSort}> Sort by sales </Button>
				</div>
				<div style={{ display: "flex", alignItems: "center" }}>
					<TextField
						type="number"
						name="percentage"
						label="increase by percentage"
						onChange={this.handleChange}
					></TextField>
					<TextField
						type="number"
						name="increasePricesLowerThan"
						label="price < x"
						onChange={this.handleChange}
						style={{ margin: "0 5px" }}
					></TextField>
					<Tooltip title="Increase the price by given percentage for the meds with current price lower than given value">
						<Button
							onClick={() =>
								this.props.onChangePrices(
									this.state.percentage,
									this.state.increasePricesLowerThan
								)
							}
						>
							Increase Prices
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
