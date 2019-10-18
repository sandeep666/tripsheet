import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import Star from '@material-ui/icons/Star';
import ShareIcon from '@material-ui/icons/Share';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import CallIcon from '@material-ui/icons/Call';
import MoreIcon from '@material-ui/icons/MoreVert';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
    grow: {
        flexGrow: 1,

    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    bigAvatar: {
        margin: 10,
        width: 50,
        height: 50,
    },
}));

export default function Footer(props) {
    console.log('Footer', props)
    const driverName = props.data.driver.name;
    const driverNumber = props.data.driver.mobileNo
    const vehicleType = 'vehicle' in props.data ? props.data.vehicle.vehicleType : ''
    const vehicleNumber = 'vehicle' in props.data ? props.data.vehicle.regNumber : ''
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    function handleProfileMenuOpen(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleMobileMenuClose() {
        setMobileMoreAnchorEl(null);
    }

    function handleMenuClose() {
        setAnchorEl(null);
        handleMobileMenuClose();
    }

    function handleMobileMenuOpen(event) {
        setMobileMoreAnchorEl(event.currentTarget);
    }

    function _openShare() {
        console.log('test', navigator.share)
        if (navigator.share) {
            navigator.share({
                title: 'Web Fundamentals',
                text: 'Check out Web Fundamentals — it rocks!',
                url: 'https://developers.google.com/web',
            })
                .then(() => console.log('Successful share'))
                .catch((error) => console.log('Error sharing', error));
        }
    }

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >

            <MenuItem>
                <IconButton aria-label="show 11 new notifications" color="inherit">
                    <Badge badgeContent={11} color="secondary">
                        <CallIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );



    return (
        <div className={classes.grow}>
            <AppBar style={{ backgroundColor: '#fff' }} position="static">
                <Toolbar>
                    <Avatar className={classes.bigAvatar} alt="Profile Picture" src={'http://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=identicon'} />
                    <div>
                        <Grid container
                            justify="center"
                            direction="column"
                            alignItems="flex-start">
                            <Typography style={{ fontSize: 14, fontWeight: 'bold', color: '#000' }} >
                                {driverName} 
                            </Typography>
                            <Typography style={{ fontSize: 10, color: '#000' }} >
                                {vehicleType} - {vehicleNumber}
                            </Typography>
                        </Grid>
                    </div>
                    {/* <div style={{ marginLeft: 12 }}>
                        <Grid>
                            <Paper>
                                <Typography style={{ fontSize: 12, margin :12 }} >
                                    AP02AT0990
                            </Typography>
                            </Paper>
                        </Grid>
                    </div> */}
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        <IconButton aria-label="show 17 new notifications" color="#000">
                            <CallIcon />
                        </IconButton>
                        <IconButton onClick={_openShare} aria-label="show 4 new mails" color="inherit">
                            <ShareIcon />
                        </IconButton>
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton
                            style={{ color: '#000' }}
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            href={`tel:${driverNumber}`}
                            color="inherit"
                        >
                            <CallIcon style={{ fontSize: 18, }} />
                        </IconButton>
                        <IconButton
                            style={{ color: '#000' }}
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={_openShare}
                            color="inherit"
                        >
                            <ShareIcon style={{ fontSize: 18, }} />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </div>
    );
}
