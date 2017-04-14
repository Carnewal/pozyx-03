import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './containers/App'
import NotFoundPage from './containers/NotFoundPage.js'
import FormPage from './containers/FormPage'
import TablePage from './containers/TablePage'
import Dashboard from './containers/DashboardPage'
import Tag from './containers/tag'
import TagEdit from './containers/tag/Edit'
import Anchor from './containers/anchor'

export default (
  <Route>
    <Route path='/' component={App}>
      <IndexRoute component={Dashboard}/>
      <Route path='dashboard' component={Dashboard}/>
      <Route path='tag' component={Tag} />
      <Route path='tag/:id' component={TagEdit} />
      <Route path='anchor' component={Anchor} />
      <Route path='form' component={FormPage}/>
      <Route path='table' component={TablePage}/>
      <Route path='*' component={NotFoundPage}/>
    </Route>
  </Route>
)
