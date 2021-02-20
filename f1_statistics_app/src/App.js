import React, { Component } from 'react';
import './App.css';

import { Navigation } from './components/Navigation';
import { Home } from './components/Home';
import { Wins } from './components/Statistics/Wins/Wins';
import { NotFound } from './components/NotFound';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

export default class App extends Component {

  render() {

    return (
      <BrowserRouter>
        <div className="container" style={{marginBottom:"50px"}}>
          <Navigation />
        </div>
        <Switch>
          <Route path='/' component={Home} exact />

          <Route path='/wins' component={Wins} exact />
          <Route path='/wins/drivers' component={Wins} exact />
          <Route path='/wins/constructors' component={Wins} exact />
          <Route path='/wins/driverspercent' component={Wins} exact />
          <Route path='/wins/constructorspercent' component={Wins} exact />
          <Route path='/wins/driversunique' component={Wins} exact />
          <Route path='/wins/constructorsunique' component={Wins} exact />
          <Route path='/wins/driversbytrack' component={Wins} exact />

          <Route path="*" component={NotFound} />
        </Switch>
      </BrowserRouter>
    );
  }
}
