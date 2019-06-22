import React from 'react'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import Landing from '../components/main/Landing'
import Login from '../components/main/Login'
import Register from '../components/main/Register'
import Main from '../components/user/Main'
import AddFood from '../components/user/AddFood'
import CheckIn from '../components/user/CheckIn'
import Goal from '../components/user/Goal'
import Workouts from '../components/user/Workouts';
import Recipies from '../components/user/Recipies';

const Routes = () => (
    <Router>
        <>
          <Route exact path="/" component={Landing}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/register" component={Register}/>
          <Route exact path="/home" component={Main}/>
          <Route exact path="/addfood" component={AddFood}/>
          <Route exact path="/checkin" component={CheckIn}/>
          <Route exact path="/goal" component={Goal}/>
          <Route exact path="/workouts" component={Workouts}/>
          <Route exact path="/recipes" component={Recipies}/>
        </> 
    </Router>
)

export default Routes;