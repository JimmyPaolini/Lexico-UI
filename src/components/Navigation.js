import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link, useHistory } from "react-router-dom";
import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { Context } from "../App";
import pages from '../pages';

export default function Navigation() {
    const classes = useStyles();
    const {isNavOpen: open, setNavOpen: setOpen} = useContext(Context);
    const toggleDrawer = () => setOpen(!open);

    const pageName = window.location.pathname.match(/(?<=\/).*(?=\/)?/)[0];
    const [selected, setSelected] = useState(pageName || "search");

    const history = useHistory();
    useEffect(() => {
        const navigationKeybind = e => {
            if (document.activeElement.tagName === "INPUT") return;
            const page = pages.find(page => page.keybind === e.key);
            if (page) history.push("/" + page.name);
            if (page) setSelected(page.name);
        }
        window.addEventListener("keypress", navigationKeybind);
        return () => window.removeEventListener("keypress", navigationKeybind);
    });

    return (
        <Drawer
            variant="permanent"
            // className={open ? classes.drawerOpen : classes.drawerClosed}
            classes={{paper: open ? classes.drawerOpen : classes.drawerClosed}}
        >
            <Grid item>
            <List>
                <ListItem className={classes.header}>
                    <Typography variant="h4" className={classes.title}>Lexico</Typography>
                    <IconButton
                        onClick={toggleDrawer}
                        className={classes.expander}
                        aria-label="toggle navigation drawer"
                    >
                        {open ? <ChevronLeftIcon /> : <MenuIcon />}
                    </IconButton>
                </ListItem>
                <Divider />
                {pages.map(page =>
                    <ListItem 
                        button
                        key={page.name}
                        component={Link}
                        to={"/" + page.name}
                        selected={selected === page.name}
                        onClick={() => setSelected(page.name)}
                    >
                        <ListItemIcon>{page.icon}</ListItemIcon>
                        <ListItemText primary={page.Name} />
                    </ListItem>
                )}
            </List>
            </Grid>
        </Drawer>
    );
}

const useStyles = makeStyles((theme) => ({
    drawerOpen: {
        width: theme.spacing(24),
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClosed: {
        width: theme.spacing(7),
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
    },
    title: {
        position: "relative",
        float: "left",
        right: 12,
    },
    header: {
        display: "flex",
        justifyContent: "flex-end"
    },
    expander: {
        display: "inline-block",
        position: "relative",
        left: 12
    },
}));