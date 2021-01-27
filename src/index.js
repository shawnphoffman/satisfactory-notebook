/** @jsxImportSource @welldone-software/why-did-you-render */
import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'
import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'

import App from './App'
import reportWebVitals from './reportWebVitals'

if (process.env.NODE_ENV === 'development') {
	const whyDidYouRender = require('@welldone-software/why-did-you-render')
	whyDidYouRender(React, {
		logOnDifferentValues: true,
		trackAllPureComponents: true,
		trackHooks: true,
	})
}

Sentry.init({
	dsn: process.env.REACT_APP_SENTRY_DSN,
	autoSessionTracking: true,
	environment: process.env.NODE_ENV,
	integrations: [new Integrations.BrowserTracing()],

	// We recommend adjusting this value in production, or using tracesSampler
	// for finer control
	tracesSampleRate: 1.0,
})

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log)
