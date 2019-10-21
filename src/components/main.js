import React, { Fragment } from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import MapContainer from './Map/Map';
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
import { messaging } from './../push-notification';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}

            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles(theme => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: 'black',
        padding: theme.spacing(6),
    },
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];



class main extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            trip: undefined,
            loaded: false,
            showNoDataMessage: false
        }
    }

    componentDidMount() {
        const tripId = this.props.match.params.id
        this.getTripInfo(tripId)
        messaging.requestPermission()
            .then(async function () {
                const token = await messaging.getToken();
                console.log(token)
            })
            .catch(function (err) {
                console.log("Unable to get permission to notify.", err);
            });
        navigator.serviceWorker.addEventListener("message", (message) => console.log(message));
    }


    getTripInfo = (id) => {
        const Token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkYTQ3M2QxNzAwZWI2MzlkYTI2NWY5NyIsImlhdCI6MTU3MTA1ODY0MX0.wu9cu62G9NmQIo1XX8Sd79abohDSjBJGFsukD7RLaJs'
        axios.get(`http://ec2-13-250-126-239.ap-southeast-1.compute.amazonaws.com/trips/trip/5da5ca97ed8ef24af172e8f4`, {
            headers: {
                Authorization: `Bearer ${Token}`
            }
        }).then(d => {
            console.log('trips', d)
            this.setState({ trip: d.data, loaded: true })
        }).catch(e => {
            this.setState({
                showNoDataMessage: true
            })
            console.log(e)
        })
    }

    render() {
        console.log(this.props.match.params.id)
        return (
            <React.Fragment>
                {
                    this.state.showNoDataMessage ?
                        <React.Fragment>
                            <img style={{width : '100%' , height : '100%'}} src={require('./404.png')}/>
                        </React.Fragment> :
                        <React.Fragment>
                            <CssBaseline />
                            <AppBar position="relative">
                                {this.state.loaded ?
                                    <Header data={this.state.trip} /> :
                                    <Fragment />}
                            </AppBar>
                            <main>
                                {this.state.loaded ?
                                    <MapContainer data={this.state.trip} /> : <Fragment />}
                            </main>
                            <Container style={{}}>
                            </Container>
                            <footer style={{
                                position: 'absolute',
                                bottom: 0,
                                width: '100%',
                                height: '60',
                            }} >
                                {this.state.loaded ? <Footer data={this.state.trip} /> : <Fragment />}
                            </footer>
                        </React.Fragment >
                }
            </React.Fragment>
        );
    }
}

export default main;
