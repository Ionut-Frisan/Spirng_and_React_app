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
		this.setTransactions();
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
		this.setState(
			{
				items: arrCopy,
			},
			() => {
				window.localStorage.setItem(
					"transactions",
					JSON.stringify(this.state.items)
				);
			}
		);
	}

	removeFromDomByInterval(fromDate, toDate) {
		let fDate = new Date(fromDate).getTime();
		let tDate = new Date(toDate).getTime();

		let arrCopy = this.state.items;
		arrCopy = arrCopy.filter((transaction) => {
			let trDate = new Date(transaction.date).getTime();
			console.log(trDate < fDate || trDate > tDate);
			return trDate < fDate || trDate > tDate;
		});

		window.localStorage.setItem("transactions", JSON.parse(arrCopy));
	}

	addToDom(id, med, card, noOfPieces, date, time) {
		let cd = this.getCardByID(card);
		let md = this.getMedById(med);

		let arrCopy = this.state.items;
		arrCopy.push({
			id: id,
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
			() => {
				window.localStorage.setItem(
					"transactions",
					JSON.stringify(this.state.items)
				);
			}
		);
	}

	getCardByID(id) {
		let cards = JSON.parse(window.localStorage.getItem("cards"));
		let card = cards.filter((cd) => cd.id === id)[0];
		return card;
	}

	getMedById(id) {
		let meds = JSON.parse(window.localStorage.getItem("meds"));
		let med = meds.filter((md) => md.id === id)[0];
		return med;
	}

	updateDom(id, id_med, id_card, noOfPieces, date, time) {
		let arrCopy = this.state.items;

		let card = this.getCardByID(id_card);
		let med = this.getMedById(id_med);

		arrCopy.forEach((tr) => {
			if (tr.id === id) {
				tr.medicament = med;
				tr.card = card;
				tr.noOfPieces = noOfPieces;
				tr.date = date;
				tr.time = time;
			}
		});
		this.setState(
			{
				items: arrCopy,
			},
			() => {
				window.localStorage.setItem(
					"transactions",
					JSON.stringify(this.state.items)
				);
			}
		);
	}

	setTransactions = () => {
		let transactions = JSON.parse(window.localStorage.getItem("transactions"));
		if (transactions !== null) {
			this.setState({
				items: transactions,
			});
		} else {
			this.fetchTransactions();
		}
	};

	handleAdd = (med, card, noOfPieces, date, time) => {
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
					response.text().then((data) => {
						this.addToDom(data, med, card, noOfPieces, date, time);
					});

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
					window.localStorage.setItem("transactions", JSON.stringify(result));
				},
				(error) => {
					console.log(error);
				}
			)
			.catch((err) =>
				this.handleShowNotification("error", "Something went wrong")
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
		console.log(this.state.items);
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
				this.removeFromDomByInterval(fromDate, toDate);
				this.handleShowNotification(
					"success",
					`Transactions were deleted successfully!`
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
						onFilterReset={this.setTransactions}
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
										key="th6"
										align="right"
										style={{ minWidth: "100" }}
									>
										Time
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
