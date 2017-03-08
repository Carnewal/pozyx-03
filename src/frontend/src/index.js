import React from 'react'
import { render } from 'react-dom'
import { Router, browserHistory } from 'react-router'
import routes from './routes'
import injectTapEventPlugin from 'react-tap-event-plugin'
import './styles.scss'
import 'font-awesome/css/font-awesome.css'
import 'flexboxgrid/css/flexboxgrid.css'

/**
 *  Copyright Notices:
 *
 *  © react-material-admin-template by rafaelhz (MIT)
 *  https://github.com/rafaelhz/react-material-admin-template
 *
 *
 */



injectTapEventPlugin()

render(
    <Router routes={routes} history={browserHistory} />, document.getElementById('root')
)
