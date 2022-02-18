import React, { Component } from "react";
import { FilterList, Search } from "@mui/icons-material";
import { Toolbar, Tooltip, IconButton, Input, Button } from "@mui/material";

export default class TableHeadToobarCard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			displayFilters: true,
			terms: "",
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
				}}
			>
				<div style={{ display: "block", alignItems: "center" }}>
					<Input type="text" name="terms" onChange={this.handleChange}></Input>
					<IconButton onClick={() => this.props.onSubmit(this.state.terms)}>
						<Search />
					</IconButton>
				</div>
				<div style={{ display: "block", alignItems: "center" }}>
					<Button onClick={this.props.onSort}>
						{" "}
						Sort by discounts obtained{" "}
					</Button>
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
