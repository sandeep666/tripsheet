import React, { Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import MapContainer from './components/Map/Map';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { messaging } from './push-notification';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import main from '../src/components/main'

class App extends React.Component {


  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/:id" component={main} />
        </Switch>
      </Router>
    );
  }
}

export default App;
