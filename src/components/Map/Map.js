import React, { Component } from 'react'
import { Map, GoogleApiWrapper, Marker, Polyline } from 'google-maps-react';
import Error from '@material-ui/icons/Error';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import HelpIcon from '@material-ui/icons/Help';
import DirectionsIcon from '@material-ui/icons/Info';
import Assignment from '@material-ui/icons/Assignment';
import ClickNHold from 'react-click-n-hold';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
    },
    input: {
        display: 'none',
    },

}));

class MapContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tripStatus: 'Trip Status - NOT STARTED',
            dialogOpen: false,
            openNoteDialog: false
        }
    }
    classes = () => makeStyles(theme => ({
        button: {
            margin: theme.spacing(1),
        },
        input: {
            display: 'none',
        },
        paper: {
            padding: theme.spacing(1),
            textAlign: 'center',
            color: theme.palette.text.secondary,
            whiteSpace: 'nowrap',
        },
        root: {
            padding: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            width: 400,
        },
        input: {
            marginLeft: theme.spacing(1),
            flex: 1,
        },
        iconButton: {
            padding: 10,
        },
        divider: {
            height: 28,
            margin: 4
        }
    }));
    onInfoWindowClose = () => {
        console.log('test')
    }
    start = (e) => {
        console.log('START');
        this.setState({
            tripStatus: 'Hold for 3 seconds to initiate panic mode'
        })
    }

    end = (e, enough) => {
        console.log(enough);
        console.log(enough ? 'Click released after enough time' : 'Click released too soon');
        if (enough) {
            /* this.setState({
                tripStatus: 'Trip Status - NOT STARTED'
            })
            alert('Panic mode is initiated') */
        }
        else {
            this.setState({
                tripStatus: 'Trip Status - NOT STARTED'
            })
        }
    }

    clickNHold = (e) => {
        console.log(e)
        this.setState({
            tripStatus: 'Trip Status - NOT STARTED'
        })
        alert('Panic mode is initiated')
    }


    handleClose = () => {
        this.setState(prev => ({
            dialogOpen: !prev.dialogOpen
        }))
    }

    handleNoteDialog = () => {
        this.setState(prev => ({
            openNoteDialog: !prev.openNoteDialog
        }))
    }


    render() {
        //
        const notes = 'notes' in this.props.data ? this.props.data.notes : ''
        const source = 'source' in this.props.data ? this.props.data.source.location : ''
        const destination = 'destination' in this.props.data ? this.props.data.destination.location : ''
        const supportWhatsapp = "+91" + this.props.data.transporter.support.whatsApp
        const supportEmail = 'transporter' in this.props.data ? this.props.data.transporter.support.email : ''
        const supportNumber = 'transporter' in this.props.data ? this.props.data.transporter.support.contactNumber : ''
        const placeId = 'transporter' in this.props.data ? this.props.data.transporter.placeId : ''
        var points = [
            { lat: source.lat, lng: source.long },
            { lat: destination.lat, lng: destination.long },
        ]
        var bounds = new this.props.google.maps.LatLngBounds();
        for (var i = 0; i < points.length; i++) {
            bounds.extend(points[i]);
        }
        console.log(bounds)
        return (
            <Grid container>
                <Map
                    zoomControl={false}
                    mapTypeControl={false}
                    scaleControl={false}
                    streetViewControl={false}
                    rotateControl={false}
                    fullscreenControl={false}
                    google={this.props.google}
                    zoom={10}
                    style={mapStyles}
                    initialCenter={{ lat: destination.lat, lng: destination.long }}
                    bounds
                >
                    <Polyline
                        path={points}
                        strokeColor="#0000FF"
                        strokeOpacity={0.8}
                        strokeWeight={2} />
                    <Marker position={{ lat: source.lat, lng: source.long }} />
                    <Marker position={{ lat: destination.lat, lng: destination.long }} />
                    {/* <div style={{ marginTop: 100, position: 'absolute' }}>
                        <IconButton aria-label="panic">
                            <Error style={{ fontSize: 40, color: 'black' }} />
                        </IconButton>
                    </div>
                    <div style={{ marginTop: 200, position: 'absolute', }}>
                        <img style={{ width: 100, height: 40 }} src={require('../review.png')} />
                    </div> */}
                    <div style={{ marginTop: 200, position: 'absolute', marginLeft: 12 }}>
                        <a target="_" href={`https://search.google.com/local/writereview?placeid=${placeId}`}><img style={{ width: 100, height: 40 }} src={require('../review.png')} /></a>
                    </div>
                </Map>
                {/* <div style={{ marginTop: 100, position: 'absolute' }}>
                    <IconButton aria-label="panic">
                        <Error style={{ fontSize: 40, color: 'black' }} />
                    </IconButton>
                </div> */}
                <Grid item xs={12} sm container style={{ position: 'absolute', justifyContent: 'center', marginTop: 12, }}>
                    <Paper style={{
                        padding: '2px 4px',
                        display: 'flex',
                        alignItems: 'center',
                        width: window.width * 0.8,
                    }}>
                        <Typography style={{ fontSize: 10, margin: 12 }} >
                            {this.state.tripStatus}
                        </Typography>
                        {/* <Typography style={{ fontSize: 10, margin: 12 }} >
                            OTP - 0000
                            </Typography> */}
                        <IconButton onClick={this.handleClose} color="primary" style={{ padding: 10 }} aria-label="Help">
                            <HelpIcon />
                        </IconButton>
                        <Divider style={{
                            height: 28,
                            margin: 4
                        }} orientation="vertical" />
                        <ClickNHold
                        //time={3} // Time to keep pressing. Default is 2
                        //onStart={this.start} // Start callback
                        //onClickNHold={this.clickNHold} //Timeout callback
                        //onEnd={this.end}
                        >
                            <IconButton onClick={this.handleNoteDialog} color="primary" aria-label="directions">
                                <Assignment />
                            </IconButton>
                        </ClickNHold>
                    </Paper>
                </Grid>
                <Dialog
                    open={this.state.dialogOpen}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Support"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Whatsapp : <a href={`https://api.whatsapp.com/send?phone=${supportWhatsapp}`}> {supportWhatsapp}</a><br /><br />
                            Mobile :<a href={`tel:${supportNumber}`} > {supportNumber} </a> <br /><br />
                            Email : <a href={`mailto:${supportEmail}`}> {supportEmail}</a>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary" autoFocus>
                            OK
          </Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    fullWidth={true}
                    maxWidth={true}
                    open={this.state.openNoteDialog}
                    onClose={this.handleNoteDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Note"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {notes}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleNoteDialog} color="primary" autoFocus>
                            OK
          </Button>
                    </DialogActions>
                </Dialog>
                {/* <Grid item xs={12} sm container style={{ position: 'absolute', justifyContent: 'flex-end', marginTop: 12, }}>
                    <div style={{ gridColumnEnd: 'span 12', width: window.innerWidth * 0.9, justifyContent: 'center' }}>
                        <Paper className={this.classes.paper}>trip</Paper>
                    </div>
                </Grid> */}

            </Grid >
        );
    }
}

const mapStyles = {
    width: '100%',
    height: '100%',
};

export default GoogleApiWrapper({
    apiKey: 'AIzaSyD1csc0XOaHwLmhCoSNgq-xb6NgZke7NBM'
})(MapContainer);