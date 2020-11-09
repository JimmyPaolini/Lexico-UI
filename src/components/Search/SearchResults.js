import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Grow from '@material-ui/core/Grow';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import EtymologyCard from "../EtymologyCard/EtymologyCard";

export default function SearchResults({results, searched}) {
    const classes = useStyles();
    const numCols = 0 
        + useMediaQuery(theme => theme.breakpoints.up('sm')) 
        + useMediaQuery(theme => theme.breakpoints.up('md'))
        + useMediaQuery(theme => theme.breakpoints.up('lg'));

    if (!results || results === "not found") return null;
    return (
        <Grid container justify="center">
            {results.map((etymology, i) => (
                <Grow in={true} {...(i ? {timeout: 800*Math.pow(i,1/8)} : {})}>
                    <Grid item className={classes.card}>
                        <EtymologyCard etymology={etymology} searched={searched}/>
                    </Grid>
                </Grow>
            ))}
        </Grid>)
    ;
}

const useStyles = makeStyles((theme) => ({
    card: {
        padding: theme.spacing(2),
    }
}));