import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './containers/App'
import NotFoundPage from './containers/NotFoundPage.js'
import Dashboard from './containers/DashboardPage'
import Tag from './containers/tag'
import TagEdit from './containers/tag/Edit'
import Anchor from './containers/anchor'
import TriggerTable from './containers/trigger/TableContainer'
import TriggerBuilder from './containers/trigger/BuilderContainer'

export default (
  <Route>
    <Route path='/' component={App}>
      <IndexRoute component={Dashboard}/>
      <Route path='dashboard' component={Dashboard}/>

      <Route path='tag' component={Tag} />
      <Route path='tag/:id' component={TagEdit} />

      <Route path='trigger' component={TriggerTable} />
      <Route path='trigger/build' component={TriggerBuilder} />

      <Route path='anchor' component={Anchor} />
      <Route path='*' component={NotFoundPage}/>
    </Route>
  </Route>
)
