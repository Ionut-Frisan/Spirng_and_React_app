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
import TransactionRow from "./TransactionRow";
import AddTrasanctionRow from "./AddTransactionRow";
import TableHeadToobarTransaction from "./TableHeadToolbarTransaction";

const Alert = forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default class Transaction extends Component {
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
		this.fetchTransactions();
		this.fetchCards();
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

	addToDom(med, card, noOfPieces, date, time) {
		let cards = JSON.parse(window.localStorage.getItem("cards"));
		let cd = cards.filter((cd) => cd.id === card)[0];

		let meds = JSON.parse(window.localStorage.getItem("meds"));
		let md = meds.filter((md) => md.id === med)[0];

		let arrCopy = this.state.items;
		arrCopy.push({
			id: 0,
			medicament: md,
			card: cd,
			noOfPieces: noOfPieces,
			date: date,
			time: time,
		});
		this.setState(
			{
				items: arrCopy,
			},
			console.log(this.state)
		);
	}

	updateDom(id, id_med, id_card, noOfPieces, date, time) {
		let arrCopy = this.state.items;
		arrCopy.forEach((tr) => {
			if (tr.id === id) {
				tr.medicament = id_med;
				tr.card = id_card;
				tr.noOfPieces = noOfPieces;
				tr.date = date;
				tr.time = time;
			}
		});
		this.setState({
			items: arrCopy,
		});
	}

	handleAdd = (med, card, noOfPieces, date, time) => {
		console.log(med, card, noOfPieces, date, time);
		fetch("http://127.0.0.1:8080/api/transactions/addTransaction", {
			method: "POST",
			body: JSON.stringify({
				id_med: med,
				id_card: card,
				noOfPieces: noOfPieces,
				date: date,
				time: time,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => {
				if (response.status !== 201) {
					this.handleShowNotification(
						"error",
						"Transaction could not be added, please check your input and try again!"
					);
				} else {
					this.addToDom(med, card, noOfPieces, date, time);
					this.handleShowNotification(
						"success",
						"Transaction added successfully!"
					);
				}
			})
			.catch((e) => {
				this.handleShowNotification(
					"error",
					"An error occured, please try again!"
				);
			});
	};

	fetchTransactions = () => {
		fetch("http://127.0.0.1:8080/api/transactions/getAll")
			.then((res) => res.json())
			.then(
				(result) => {
					this.setState({
						items: result,
					});
				},
				(error) => {}
			);
	};

	fetchMeds = async () => {
		let response = await fetch("http://127.0.0.1:8080/api/meds/getAll");
		response.json().then((data) => {
			window.localStorage.setItem("meds", JSON.stringify(data));
		});
	};

	fetchCards = async () => {
		let response = await fetch("http://127.0.0.1:8080/api/cards/getAll");
		response.json().then((data) => {
			window.localStorage.setItem("cards", JSON.stringify(data));
		});
	};

	handleUpdate = (id, id_med, id_card, noOfPieces, date, time) => {
		fetch("http://127.0.0.1:8080/api/transactions/update", {
			method: "PUT",
			body: JSON.stringify({
				id: id,
				id_med: id_med,
				id_card: id_card,
				noOfPieces: noOfPieces,
				date: date,
				time: time,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => {
				if (response.status !== 200) {
					this.handleShowNotification(
						"error",
						"Transaction could not be updated, please try again!"
					);
				} else {
					this.updateDom(id, id_med, id_card, noOfPieces, date, time);
					this.handleShowNotification(
						"success",
						"Transaction updated successfully!"
					);
				}
			})
			.catch((e) => {
				console.log(e);
			});
	};

	handleDelete = (id) => {
		fetch("http://127.0.0.1:8080/api/transactions/delete/" + id, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => {
				if (response.status !== 200) {
					this.handleShowNotification(
						"error",
						`The Transaction with id ${id} could not be deleted!`
					);
				} else {
					this.removeFromDom(id);
					this.handleShowNotification(
						"success",
						`Transaction with id ${id} was deleted!`
					);
				}
			})
			.catch((e) => {
				alert(e);
			});
	};

	handleFilterByInterval = async (fromDate, toDate) => {
		let response = await fetch(
			`http://127.0.0.1:8080/api/transactions/getByInterval/${fromDate}to${toDate}`,
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
				this.handleShowNotification("success", "Filters were applied!");
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
	};

	handleDeleteByInterval = async (fromDate, toDate) => {
		console.log(fromDate, toDate);
		let response = await fetch(
			`http://127.0.0.1:8080/api/transactions/deleteByInterval/${fromDate}to${toDate}`,
			{
				method: "DELETE",
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
					"Transactions were deleted successfully!"
				);
			}
		} catch (err) {
			this.handleShowNotification(
				"error",
				"Something went wrong, please try again!"
			);
		}
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
					<TableHeadToobarTransaction
						onFilterByInterval={this.handleFilterByInterval}
						onDeleteByInterval={this.handleDeleteByInterval}
						onShowNotification={this.handleShowNotification}
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
										Med
									</TableCell>
									<TableCell
										key="th3"
										align="right"
										style={{ minWidth: "170" }}
									>
										Card
									</TableCell>

									<TableCell
										key="th4"
										align="right"
										style={{ minWidth: "170" }}
									>
										Units sold
									</TableCell>
									<TableCell
										key="th5"
										align="right"
										style={{ minWidth: "170" }}
									>
										Date
									</TableCell>
									<TableCell
										key="th7"
										align="right"
										style={{ minWidth: "100" }}
									>
										Time
									</TableCell>
									<TableCell
										key="th8"
										align="right"
										style={{ minWidth: "100" }}
									>
										Actions
									</TableCell>
								</TableRow>
							</TableHead>

							<TableBody>
								<AddTrasanctionRow
									onSubmit={this.handleAdd}
									onShowNotification={this.handleShowNotification}
								/>
								{this.state.items.map((row) => {
									return (
										<TransactionRow
											key={row.id}
											transaction={row}
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
