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
import CardRow from "./CardRow";
import AddCardRow from "./AddCardRow";
import TableHeadToobarCard from "./TableHeadToolbarCard";

const Alert = forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default class Card extends Component {
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
		this.fetchCards();
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
		this.state.items.forEach((card) => {
			if (card.id !== id) {
				arrCopy.push(card);
			}
		});
		this.setState({
			items: arrCopy,
		});
	}

	addToDom(firstName, lastName, cnp, dob, dor) {
		let arrCopy = this.state.items;
		arrCopy.push({
			id: 0,
			firstName: firstName,
			lastName: lastName,
			cnp: cnp,
			dob: dob,
			dor: dor,
		});
		this.setState({
			items: arrCopy,
		});
	}

	updateDom(id, firstName, lastName, cnp, dob, dor) {
		let arrCopy = this.state.items;
		arrCopy.forEach((card) => {
			if (card.id === id) {
				card.firstName = firstName;
				card.lastName = lastName;
				card.cnp = cnp;
				card.dob = dob;
				card.dor = dor;
			}
		});
		this.setState({
			items: arrCopy,
		});
	}

	handleAdd = async (firstName, lastName, cnp, dob, dor) => {
		fetch("http://127.0.0.1:8080/api/cards/addCard", {
			method: "Post",
			body: JSON.stringify({
				firstName: firstName,
				lastName: lastName,
				cnp: cnp,
				dob: dob,
				dor: dor,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => {
				if (response.status !== 201) {
					this.handleShowNotification(
						"error",
						"Card could not be added, please check your input and try again!"
					);
				} else {
					let res = response.json;
					console.log(res);
					this.addToDom(firstName, lastName, cnp, dob, dor);
					this.handleShowNotification("success", "Card added successfully!");
				}
			})
			.catch((e) => {
				this.handleShowNotification(
					"error",
					"An error occured, please try again!"
				);
			});
	};

	fetchCards = () => {
		fetch("http://127.0.0.1:8080/api/cards/getAll")
			.then((res) => res.json())
			.then(
				(result) => {
					this.setState({
						items: result,
					});
				},
				(error) => {
					console.log("Eroare");
				}
			);
	};

	handleUpdate = (id, firstName, lastName, cnp, dob, dor) => {
		fetch("http://127.0.0.1:8080/api/cards/updateCard", {
			method: "PUT",
			body: JSON.stringify({
				id: id,
				firstName: firstName,
				lastName: lastName,
				cnp: cnp,
				dob: dob,
				dor: dor,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => {
				if (response.status !== 202) {
					this.handleShowNotification(
						"error",
						"Card could not be updated, please try again!"
					);
				} else {
					this.updateDom(id, firstName, lastName, cnp, dob, dor);
					this.handleShowNotification("success", "Card updated successfully!");
				}
			})
			.catch((e) => {
				console.log(e);
			});
	};

	handleDelete = (id) => {
		fetch("http://127.0.0.1:8080/api/cards/delete/" + id, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => {
				if (response.status !== 202) {
					this.handleShowNotification(
						"error",
						`The card with id ${id} could not be deleted, it might be referenced by a transaction!`
					);
				} else {
					this.removeFromDom(id);
					this.handleShowNotification(
						"success",
						`card with id ${id} was deleted!`
					);
				}
			})
			.catch((e) => {
				alert(e);
			});
	};

	handleSearch = async (terms) => {
		if (terms === "") {
			this.fetchCards();
		} else {
			let response = await fetch(
				`http://127.0.0.1:8080/api/cards/search/${terms}`,
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

	handleSortByDiscount = () => {
		fetch("http://127.0.0.1:8080/api/cards/sortByDiscount")
			.then((res) => res.json())
			.then((result) => {
				this.setState({
					items: result,
				});
			})
			.catch((error) => {
				console.log("Eroare");
				this.handleShowNotification(
					"error",
					"An error has occured, plase try again!"
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
					<TableHeadToobarCard
						onSubmit={this.handleSearch}
						onSort={this.handleSortByDiscount}
						onShowNotification={this.handleShowNotification}
					/>
					<TableContainer>
						<Table stickyHeader aria-label="sticky table">
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
										First name
									</TableCell>
									<TableCell
										key="th3"
										align="right"
										style={{ minWidth: "170" }}
									>
										Last name
									</TableCell>
									<TableCell
										key="th4"
										align="right"
										style={{ minWidth: "170" }}
									>
										PID
									</TableCell>
									<TableCell
										key="th5"
										align="right"
										style={{ minWidth: "170" }}
									>
										Date of birth
									</TableCell>
									<TableCell
										key="th6"
										align="right"
										style={{ minWidth: "170" }}
									>
										Date of registration
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
								<AddCardRow
									onSubmit={this.handleAdd}
									onShowNotification={this.handleShowNotification}
								/>
								{this.state.items.map((row) => {
									return (
										<CardRow
											card={row}
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
