import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

const gratiasMaximasAd = [
    "wiktionary.com for providing the dictionary content",
    "thelatinlibrary.com for providing the literature content",
    "Magistri sodalesque Latinorum"
];

const upcomingFeatures = [
    "Voice translation, so that you can vocally ask for translations",
    "English-to-Latin translation",
    "More Literature texts (Suggest one in the Comment Box!)",
    // "Support for Ελληνικά translation and literature!",
    "Possible collaboration with other Latinists/Classics Organizations (Email me through the Suggestions page!)"
];

const dataCollection = [
    "On Client - all searches, Literature downloads & scroll positions",
    "On Server - universal word search frequency (untraceable to user)"
];

export default function About() {
    const classes = useStyles();
    return (
        <Paper className={classes.paper}>
            <Typography variant="h4" className={classes.body}>
                About
            </Typography>
            <Divider className={classes.divider}/>
            <Typography variant="body1" className={classes.body}>
                I love reading and writing Latin, so I built Lexico to ease some of the more arduous aspects of it and help others enjoy Latin as I do. As with all things it is a work in progress, and so long as people  use it I’ll be striving to improve it.
            </Typography>
            <Divider className={classes.divider}/>
            <Typography variant="subtitle1">
                Gratias Maximas Ad:
            </Typography>
            <List dense>
                {gratiasMaximasAd.map((text, i) => (
                    <ListItem key={i} style={{padding: 0}}>
                        <ListItemIcon>
                            <FiberManualRecordIcon fontSize="small"/>
                        </ListItemIcon>
                        <ListItemText>
                            <Typography variant="body2" className={classes.bullet}>
                                {text}
                            </Typography>
                        </ListItemText>
                    </ListItem>
                ))}
            </List>
            <Typography variant="subtitle1">
                Upcoming Features:
            </Typography>
            <List dense className={classes.list}>
                {upcomingFeatures.map((text, i) => (
                    <ListItem key={i} style={{padding: 0}}>
                        <ListItemIcon>
                            <FiberManualRecordIcon fontSize="small"/>
                        </ListItemIcon>
                        <ListItemText>
                            <Typography variant="body2" className={classes.bullet}>
                                {text}
                            </Typography>
                        </ListItemText>
                    </ListItem>
                ))}
            </List>
            <Typography variant="subtitle1">
                Data collection:
            </Typography>
            <List dense className={classes.list}>
                {dataCollection.map((text, i) => (
                    <ListItem key={i} style={{padding: 0}}>
                        <ListItemIcon>
                            <FiberManualRecordIcon fontSize="small"/>
                        </ListItemIcon>
                        <ListItemText>
                            <Typography variant="body2" className={classes.bullet}>
                                {text}
                            </Typography>
                        </ListItemText>
                    </ListItem>
                ))}
            </List>
            <Divider className={classes.divider}/>
            <Box display="flex" justifyContent="center">
                <Typography variant="h6">
                    Omnia mūtantur, nihil īnterit
                </Typography>
            </Box>
        </Paper>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(1),
        marginTop: theme.spacing(2),
        width: "42%"
    },
    body: {
        padding: theme.spacing(1),
    },
    divider: {
        margin: theme.spacing(1),
    },
    list: {
        listStyleType: "circle",
        listStylePosition: "inside"
    },
    bullet: {
        position: "relative",
        right: 20
    }
}));