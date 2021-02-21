import React, { Component } from 'react';
import './App.css';

import { Navigation } from './components/Navigation';
import { Home } from './components/Home';
import { Wins } from './components/Statistics/Wins/Wins';
import {Winners} from './components/Statistics/Wins/Winners';
import { WinnersPercent } from './components/Statistics/Wins/WinnersPercent';
import {WinnersUnique} from './components/Statistics/Wins/WinnersUnique';
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
          
          <Route path='/wins/drivers' exact render={(props) => (<Winners {...props} api={"wins/drivers"} pageTitle={"Lenktynininkų laimėjimai"} />)} />
          <Route path='/wins/constructors' exact render={(props) => (<Winners {...props} api={"wins/constructors"} pageTitle={"Komandų laimėjimai"} />)} />
          <Route path='/wins/driverspercent' exact render={(props) => (<WinnersPercent {...props} api={"wins/drivers/percent"} pageTitle={"Lenktynininkų laimėjimų procentas"} />)} />
          <Route path='/wins/constructorspercent' exact render={(props) => (<WinnersPercent {...props} api={"wins/constructors/percent"} pageTitle={"Komandų laimėjimų procentas"} />)} />
          <Route path='/wins/driversunique' exact render={(props) => (<WinnersUnique {...props} api={"wins/drivers/uniqueperseason"} pageTitle={"Skirtingų lenktynininkų, laimėjusių lenktynes, skaičius"} />)} />
          <Route path='/wins/constructorsunique' exact render={(props) => (<WinnersUnique {...props} api={"wins/constructors/uniqueperseason"} pageTitle={"Skirtingų komandų, laimėjusių lenktynes, skaičius"} />)} />
          <Route path='/wins/driversbytrack' component={Wins} exact />

          <Route path="*" component={NotFound} />
        </Switch>
      </BrowserRouter>
    );
  }
}
