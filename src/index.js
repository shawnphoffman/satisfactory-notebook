import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'
import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'

import App from './App'
import reportWebVitals from './reportWebVitals'

const isProduction = process.env.NODE_ENV === 'production'

if (isProduction) {
	Sentry.init({
		dsn: process.env.REACT_APP_SENTRY_DSN,
		autoSessionTracking: true,
		environment: process.env.NODE_ENV,
		integrations: [new Integrations.BrowserTracing()],

		// We recommend adjusting this value in production, or using tracesSampler
		// for finer control
		tracesSampleRate: 1.0,
	})
}

// ReactDOM.render(
// 	<React.StrictMode>
// 		<App />
// 	</React.StrictMode>,
// 	document.getElementById('root')
// )

ReactDOM.unstable_createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(isProduction ? console.log : () => {})
