import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Divider from '@material-ui/core/Divider';
import pages from '../pages';

export default function Navigation() {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const toggleDrawer = () => setOpen(!open);

    const pageName = window.location.pathname.match(/(?<=\/).*(?=\/)?/)[0];
    const [selected, setSelected] = useState(pageName);

    return (
        <Drawer
            variant="permanent"
            className={open ? classes.drawerOpen : classes.drawerClosed}
            classes={{paper: open ? classes.drawerOpen : classes.drawerClosed}}
        >
            <List>
                <ListItem className={classes.toggle}>
                    <IconButton
                        aria-label="toggle navigation drawer"
                        onClick={toggleDrawer}
                        edge={!open ? "start" : false}
                        className={classes.toggleButton}
                    >
                        {open ? <ChevronLeftIcon /> : <MenuIcon />}
                    </IconButton>
                </ListItem>
                <Divider />
                {pages.map(page =>
                    <ListItem button
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
        </Drawer>
    );
}

const drawerWidth = 196;
const useStyles = makeStyles((theme) => ({
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClosed: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(6),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(7),
        },
    },
    toggle: {
        display: "flex",
        justifyContent: "flex-end"
    },
    toggleButton: {
        display: "inline-block",
        position: "relative",
        left: "12px"
    },
}));