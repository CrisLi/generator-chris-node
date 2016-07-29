import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory, Route } from 'react-router';

const App = () => (<div>Hello React</div>);

const routes = (
  <Route path="/" component={App} />
);

render(
  <Router history={browserHistory} children={routes} />,
  document.getElementById('app')
);