import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from 'frontend/containers/App'
import NotFoundPage from 'frontend/containers/NotFoundPage.js'
import LoginPage from 'frontend/containers/LoginPage'
import FormPage from 'frontend/containers/FormPage'
import TablePage from 'frontend/containers/TablePage'
import Dashboard from 'frontend/containers/DashboardPage'

export default (
  <Route>
    <Route path='login' component={LoginPage}/>
    <Route path='/' component={App}>
      <IndexRoute component={Dashboard}/>
      <Route path='dashboard' component={Dashboard}/>
      <Route path='form' component={FormPage}/>
      <Route path='table' component={TablePage}/>
      <Route path='*' component={NotFoundPage}/>
    </Route>
  </Route>
)
