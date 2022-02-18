import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import Navbar from "./Components/NavBar";
import Card from "./Components/Card/Card";
import Med from "./Components/Med/Med";
import Transaction from "./Components/Transaction/Transaction";
ReactDOM.render(
	<React.StrictMode>
		<Router>
			<Navbar />
			<Routes>
				<Route path="/" element={<App />} />
				<Route path="/cards" element={<Card />} />
				<Route path="/meds" element={<Med />} />
				<Route path="/transactions" element={<Transaction />} />
			</Routes>
		</Router>
	</React.StrictMode>,
	document.getElementById("root")
);

reportWebVitals();
