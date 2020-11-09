import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Grow from '@material-ui/core/Grow';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import LiteratureCard from "./LiteratureCard";
import caesar from "../../data/Literature/caesar.json";
import virgil from "../../data/Literature/virgil.json";
import ovid from "../../data/Literature/ovid.json";
const authors = [caesar, virgil, ovid];

export default function Literature() {
    const classes = useStyles();
    const numCols = 0 
        + useMediaQuery(theme => theme.breakpoints.up('sm')) 
        + useMediaQuery(theme => theme.breakpoints.up('md'))
        + useMediaQuery(theme => theme.breakpoints.up('lg'));
    
    return (<>
        {authors.map((author, i) => (
            <Grow in={true} {...(i ? {timeout: 800*Math.pow(i,1/8)} : {})}>
                <Grid item className={classes.card}>
                    <LiteratureCard author={author.author} work={author.work}/>
                </Grid>
            </Grow>
        ))}
    </>);
}

const useStyles = makeStyles((theme) => ({
    card: {
        padding: theme.spacing(2),
    }
}));