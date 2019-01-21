import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { Drizzle, generateStore } from "drizzle";
import RegisterPatient from "./contracts/RegisterPatient.json";


// let drizzle know what contracts we want
const contracts = { contracts: [RegisterPatient] };

// setup the drizzle store and drizzle
const drizzleStore = generateStore(contracts);
const drizzle = new Drizzle(contracts, drizzleStore);

console.log(drizzleStore);
console.log(drizzle);

ReactDOM.render(
	
	<BrowserRouter>
		<App drizzle={drizzle}/>
	</BrowserRouter>
	,document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
