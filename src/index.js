import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import FormApp from './components/fe/App'

import './main.scss'
import './bootstrap.css'
import './tailwind.css'
import './calendar.css'
import 'react-notifications/lib/notifications.css'


import { Provider } from 'react-redux'
import store from './store'

const root = document.getElementById('root-admin')
const booking = document.getElementById('wpcb-fe-booking')

if (root) {
	ReactDOM.render(
		<Provider store={store}>
			<App />
		</Provider>, 
		root
	)
}

if (booking) {
	ReactDOM.render(
		<Provider store={store}>
			<FormApp />
		</Provider>, 
		booking
	)
}