import React, { Component } from 'react';
import './App.css';

import { Navigation } from './components/Navigation';
import { Home } from './components/Home';
import { Wins } from './components/Statistics/Wins/Wins';
import { Winners } from './components/Statistics/Wins/Winners';
import { WinnersPercent } from './components/Statistics/Wins/WinnersPercent';
import { WinnersUnique } from './components/Statistics/Wins/WinnersUnique';
import { WinnersByTrack } from './components/Statistics/Wins/WinnersByTrack';
import { WinnersFromPole } from './components/Statistics/Wins/WinnersFromPole';
import { WinnersByGrid } from './components/Statistics/Wins/WinnersByGrid';
import { Poles } from './components/Statistics/Poles/Poles';
import { PoleSitters } from './components/Statistics/Poles/PoleSitters';
import { PoleSittersUnique } from './components/Statistics/Poles/PoleSittersUnique';
import { FastestLaps } from './components/Statistics/FastestLaps/FastestLaps';
import { FastestLappers } from './components/Statistics/FastestLaps/FastestLappers';
import { FastestLappersUnique } from './components/Statistics/FastestLaps/FastestLappersUnique';
import { Points } from './components/Statistics/Points/Points';
import { SeasonPoints } from './components/Statistics/Points/SeasonPoints';
import { WinnerPoints } from './components/Statistics/Points/WinnerPoints';
import { Podiums } from './components/Statistics/Podiums/Podiums';
import { PodiumFinishers } from './components/Statistics/Podiums/PodiumFinishers';
import { PodiumThree } from './components/Statistics/Podiums/PodiumThree';
import { Leadings } from './components/Statistics/Leadings/Leadings';
import { Leaders } from './components/Statistics/Leadings/Leaders';
import { NotFound } from './components/NotFound';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

export default class App extends Component {

  render() {

    return (
      <BrowserRouter>
        <div className="container" style={{ marginBottom: "50px" }}>
          <Navigation />
        </div>
        <Switch>
          <Route path='/' component={Home} exact />

          <Route path='/wins' component={Wins} exact />
          <Route path='/wins/drivers' exact render={(props) => (<Winners {...props} api={"wins/drivers"} pageTitle={"Lenktynininkų laimėjimai"} axisName={"Lenktynininkas"} />)} />
          <Route path='/wins/constructors' exact render={(props) => (<Winners {...props} api={"wins/constructors"} pageTitle={"Komandų laimėjimai"} axisName={"Komanda"} />)} />
          <Route path='/wins/driverspercent' exact render={(props) => (<WinnersPercent {...props} api={"wins/drivers/percent"} pageTitle={"Lenktynininkų laimėjimų procentas"} axisName={"Lenktynininkas"} />)} />
          <Route path='/wins/constructorspercent' exact render={(props) => (<WinnersPercent {...props} api={"wins/constructors/percent"} pageTitle={"Komandų laimėjimų procentas"} axisName={"Komanda"} />)} />
          <Route path='/wins/driversunique' exact render={(props) => (<WinnersUnique {...props} api={"wins/drivers/uniqueperseason"} pageTitle={"Skirtingų lenktynininkų, laimėjusių lenktynes, skaičius"} />)} />
          <Route path='/wins/constructorsunique' exact render={(props) => (<WinnersUnique {...props} api={"wins/constructors/uniqueperseason"} pageTitle={"Skirtingų komandų, laimėjusių lenktynes, skaičius"} />)} />
          <Route path='/wins/driversbytrack' exact render={(props) => (<WinnersByTrack {...props} api={"wins/drivers/tracks"} pageTitle={"Lenktynininkų laimėjimai pagal trasą"} />)} />
          <Route path='/wins/frompole' exact render={(props) => (<WinnersFromPole {...props} api={"wins/frompole"} pageTitle={"Lenktynių, kurios buvo laimėtos iš „pole“ pozicijos, skaičius"} />)} />
          <Route path='/wins/bygrid' exact render={(props) => (<WinnersByGrid {...props} api={"wins/bygrid"} pageTitle={"Laimėjimai iš tam tikros starto pozicijos"} />)} />

          <Route path='/poles' component={Poles} exact />
          <Route path='/poles/drivers' exact render={(props) => (<PoleSitters {...props} api={"poles/drivers"} pageTitle={"Lenktynininkų „pole“ pozicijos"} axisName={"Lenktynininkas"} />)} />
          <Route path='/poles/constructors' exact render={(props) => (<PoleSitters {...props} api={"poles/constructors"} pageTitle={"Komandų „pole“ pozicijos"} axisName={"Komanda"} />)} />
          <Route path='/poles/driversunique' exact render={(props) => (<PoleSittersUnique {...props} api={"poles/drivers/uniqueperseason"} pageTitle={"Skirtingų lenktynininkų, laimėjusių „pole“ poziciją, skaičius"} />)} />
          <Route path='/poles/constructorsunique' exact render={(props) => (<PoleSittersUnique {...props} api={"poles/constructors/uniqueperseason"} pageTitle={"Skirtingų komandų, laimėjusių „pole“ poziciją, skaičius"} />)} />

          <Route path='/fastestlaps' component={FastestLaps} exact />
          <Route path='/fastestlaps/drivers' exact render={(props) => (<FastestLappers {...props} api={"fastestlaps/drivers"} pageTitle={"Greičiausiai lenktynių ratą apvažiavę lenktynininkai"} axisName={"Lenktynininkas"} />)} />
          <Route path='/fastestlaps/constructors' exact render={(props) => (<FastestLappers {...props} api={"fastestlaps/constructors"} pageTitle={"Greičiausiai lenktynių ratą apvažiavusios komandos"} axisName={"Komanda"} />)} />
          <Route path='/fastestlaps/driversunique' exact render={(props) => (<FastestLappersUnique {...props} api={"fastestlaps/drivers/uniqueperseason"} pageTitle={"Skirtingų lenktynininkų, greičiausiai apvažiavusių ratą, skaičius"} />)} />
          <Route path='/fastestlaps/constructorsunique' exact render={(props) => (<FastestLappersUnique {...props} api={"fastestlaps/constructors/uniqueperseason"} pageTitle={"Skirtingų komandų, greičiausiai apvažiavusių ratą, skaičius"} />)} />

          <Route path='/points' component={Points} exact />
          <Route path='/points/drivers' exact render={(props) => (<SeasonPoints {...props} api={"points/drivers"} pageTitle={"Lenktynininkų pelnyti taškai"} axisName={"Lenktynininkas"} />)} />
          <Route path='/points/constructors' exact render={(props) => (<SeasonPoints {...props} api={"points/constructors"} pageTitle={"Komandų pelnyti taškai"} axisName={"Komanda"} />)} />
          <Route path='/points/winnerdrivers' exact render={(props) => (<WinnerPoints {...props} api={"points/drivers/winners"} pageTitle={"Čempionatą laimėjusių lenktynininkų taškai"} />)} />
          <Route path='/points/winnerconstructors' exact render={(props) => (<WinnerPoints {...props} api={"points/constructors/winners"} pageTitle={"Čempionatą laimėjusių komandų taškai"} />)} />

          <Route path='/podiums' component={Podiums} exact />
          <Route path='/podiums/drivers' exact render={(props) => (<PodiumFinishers {...props} api={"podiums/drivers"} pageTitle={"Lenktynininkų podiumai"} axisName={"Lenktynininkas"} />)} />
          <Route path='/podiums/constructors' exact render={(props) => (<PodiumFinishers {...props} api={"podiums/constructors"} pageTitle={"Komandų podiumai"} axisName={"Komanda"} />)} />
          <Route path='/podiums/driversthree' exact render={(props) => (<PodiumThree {...props} api={"podiums/drivers/same"} pageTitle={"Lenktynininkų trejetukai"} axisName={"Lenktynininkų trejetukas"} />)} />
          <Route path='/podiums/constructorsthree' exact render={(props) => (<PodiumThree {...props} api={"podiums/constructors/same"} pageTitle={"Komandų trejetukai"} axisName={"Komandų trejetukas"} />)} />

          <Route path='/leadings' component={Leadings} exact />
          <Route path='/leadings/drivers' exact render={(props) => (<Leaders {...props} api={"leadinglaps/drivers"} pageTitle={"Lenktynininkų pirmavimai"} axisName={"Lenktynininkas"} />)} />
          <Route path='/leadings/constructors' exact render={(props) => (<Leaders {...props} api={"leadinglaps/constructors"} pageTitle={"Komandų pirmavimai"} axisName={"Komanda"} />)} />

          <Route path="*" component={NotFound} />
        </Switch>
      </BrowserRouter>
    );
  }
}
