import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'
import * as Panelbear from '@panelbear/panelbear-js'
import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'

import App from './App'
import reportWebVitals from './reportWebVitals'

const isProduction = process.env.NODE_ENV === 'production'

// Sentry
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

// Analytics
Panelbear.load(process.env.REACT_APP_PANELBEAR_SITE_ID)
Panelbear.trackPageview()
Panelbear.track('PageLoad')

ReactDOM.unstable_createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(isProduction ? console.log : () => {})
