import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import App from '../containers/App';
import { NotFoundView, Counter, FooView, BarView } from '../components';
import { browserHistory } from 'react-router';

const routing = () => (
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={Counter}/>
      <Route path='foo' component={FooView} />
      <Route path='bar' component={BarView}/>
      <Route path='*' component={NotFoundView} />
    </Route>
  </Router>
)

export default routing;
