import { Component, forwardRef } from "react";
import {
	Table,
	TableCell,
	TableBody,
	TableRow,
	Paper,
	TableContainer,
	TableHead,
} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import AddMedRow from "./AddMedRow";
import MedRow from "./MedRow";
import TableHeadToobarMed from "./TableHeadToolbarMed";

const Alert = forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default class Med extends Component {
	constructor(props) {
		super(props);
		this.state = {
			items: [],
			notificationIsOpen: false,
			responseMessage: "",
			responseType: "",
		};
	}

	componentDidMount() {
		this.fetchMeds();
	}

	handleCloseNotification = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		this.setState({
			notificationIsOpen: false,
		});
	};

	handleShowNotification = (type, message) => {
		this.setState({
			notificationIsOpen: true,
			responseMessage: message,
			responseType: type,
		});
	};

	removeFromDom(id) {
		let arrCopy = [];
		this.state.items.forEach((med) => {
			if (med.id !== id) {
				arrCopy.push(med);
			}
		});
		this.setState({
			items: arrCopy,
		});
	}

	addToDom(name, producer, price, requiresRecepy) {
		let arrCopy = this.state.items;
		arrCopy.push({
			id: 0,
			name: name,
			producer: producer,
			price: price,
			requiresRecepy: requiresRecepy,
		});
		this.setState({
			items: arrCopy,
		});
	}

	updateDom(id, name, producer, price, requiresRecepy) {
		let arrCopy = this.state.items;
		arrCopy.forEach((med) => {
			if (med.id === id) {
				med.name = name;
				med.producer = producer;
				med.price = price;
				med.requiresRecepy = requiresRecepy;
			}
		});
		this.setState({
			items: arrCopy,
		});
	}

	handleAdd = async (name, producer, price, requiresRecepy) => {
		fetch("http://127.0.0.1:8080/api/meds/addMed", {
			method: "POST",
			body: JSON.stringify({
				name: name,
				producer: producer,
				price: price,
				requiresRecepy: requiresRecepy,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => {
				if (response.status !== 201) {
					this.handleShowNotification(
						"error",
						"Med could not be added, please check your input and try again!"
					);
				} else {
					let res = response.json;
					console.log(res);
					this.addToDom(name, producer, price, requiresRecepy);
					this.handleShowNotification("success", "Med added successfully!");
				}
			})
			.catch((e) => {
				this.handleShowNotification(
					"error",
					"An error occured, please try again!"
				);
			});
	};

	fetchMeds = async () => {
		fetch("http://127.0.0.1:8080/api/meds/getAll")
			.then((res) => res.json())
			.then(
				(result) => {
					this.setState({
						items: result,
					});
				},
				(error) => {
					console.log(error);
				}
			);
	};

	handleUpdate = (id, name, producer, price, requiresRecepy) => {
		fetch("http://127.0.0.1:8080/api/meds/updateMed", {
			method: "PUT",
			body: JSON.stringify({
				id: id,
				name: name,
				producer: producer,
				price: price,
				requiresRecepy: requiresRecepy,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => {
				if (response.status !== 202) {
					this.handleShowNotification(
						"error",
						"Med could not be updated, please try again!"
					);
				} else {
					this.updateDom(id, name, producer, price, requiresRecepy);
					this.handleShowNotification("success", "Med updated successfully!");
				}
			})
			.catch((e) => {
				console.log(e);
			});
	};

	handleDelete = (id) => {
		fetch("http://127.0.0.1:8080/api/meds/delete/" + id, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => {
				if (response.status !== 202) {
					this.handleShowNotification(
						"error",
						`The med with id ${id} could not be deleted, it might be referenced by a transaction!`
					);
				} else {
					this.removeFromDom(id);
					this.handleShowNotification(
						"success",
						`Med with id ${id} was deleted!`
					);
				}
			})
			.catch((e) => {
				alert(e);
			});
	};

	handleSearch = async (terms) => {
		if (terms === "") {
			this.fetchMeds();
		} else {
			let response = await fetch(
				`http://127.0.0.1:8080/api/meds/search/${terms}`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			try {
				if (response.status !== 200) {
					this.handleShowNotification(
						"error",
						"Something went wrong, please try again!"
					);
				} else {
					this.handleShowNotification(
						"success",
						"Search was completed successfully!"
					);
					this.setState({
						items: await response.json(),
					});
				}
			} catch (err) {
				this.handleShowNotification(
					"error",
					"Something went wrong, please try again!"
				);
			}
		}
	};

	handleSortBySales = () => {
		fetch("http://127.0.0.1:8080/api/meds/sortBySales")
			.then((res) => res.json())
			.then((result) => {
				this.setState({
					items: result,
				});
			})
			.catch((error) => {
				console.log(error);
				this.handleShowNotification(
					"error",
					"An error has occured, please try again!"
				);
			});
	};

	handleIncreasePrices = (percentage, compareTo) => {
		fetch(
			`http://127.0.0.1:8080/api/meds/increasePriceByPercentage/${percentage}/${compareTo}`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
			}
		)
			.then((response) => {
				if (response.status !== 200) {
					this.handleShowNotification(
						"error",
						"An error has occured, please try Again!"
					);
				} else {
					this.handleShowNotification("success", "Success");
				}
			})
			.catch((e) => {
				this.handleShowNotification(
					"error",
					"An error has occured, please try again!"
				);
			});
	};

	render() {
		return (
			<>
				<Paper
					sx={{
						maxWidth: "95%",
						margin: "20px auto 100px auto",
						paddingBottom: "20px",
					}}
				>
					<TableHeadToobarMed
						onSubmit={this.handleSearch}
						onSort={this.handleSortBySales}
						onShowNotification={this.handleShowNotification}
						onChangePrices={this.handleIncreasePrices}
					/>
					<TableContainer>
						<Table stickyHeader={true} aria-label="sticky table">
							<TableHead>
								<TableRow>
									<TableCell
										key="th1"
										align="right"
										style={{ minWidth: "170" }}
									>
										ID
									</TableCell>
									<TableCell
										key="th2"
										align="right"
										style={{ minWidth: "170" }}
									>
										Name
									</TableCell>
									<TableCell
										key="th3"
										align="right"
										style={{ minWidth: "170" }}
									>
										Producer
									</TableCell>
									<TableCell
										key="th4"
										align="right"
										style={{ minWidth: "170" }}
									>
										Price
									</TableCell>
									<TableCell
										key="th5"
										align="right"
										style={{ minWidth: "170" }}
									>
										Requires recepy
									</TableCell>
									<TableCell
										key="th7"
										align="right"
										style={{ minWidth: "100" }}
									>
										Actions
									</TableCell>
								</TableRow>
							</TableHead>

							<TableBody>
								<AddMedRow
									onSubmit={this.handleAdd}
									onShowNotification={this.handleShowNotification}
								/>
								{this.state.items.map((row) => {
									return (
										<MedRow
											med={row}
											onUpdate={this.handleUpdate}
											onDelete={this.handleDelete}
											onShowNotification={this.handleShowNotification}
										/>
									);
								})}
							</TableBody>
						</Table>
					</TableContainer>
				</Paper>
				<Snackbar
					open={this.state.notificationIsOpen}
					autoHideDuration={6000}
					onClose={this.handleCloseNotification}
				>
					<Alert
						onClose={this.handleCloseNotification}
						severity={this.state.responseType}
						sx={{ width: "100%" }}
					>
						{this.state.responseMessage}
					</Alert>
				</Snackbar>
			</>
		);
	}
}
