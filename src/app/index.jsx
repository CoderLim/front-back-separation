import React from 'react';
import { ServerRouter  as Router, IndexRoute } from 'react-router-dom';
import { Route, Switch } from 'react-router';

import Home from './components/home/index.jsx';
import About from './components/about/index.jsx';

export default class App extends React.Component {
  render () {
    return (
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/about" component={About}/>
      </Switch>
     );
  }
}
