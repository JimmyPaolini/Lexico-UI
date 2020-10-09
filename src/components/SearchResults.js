import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import EtymologyCard from "./EtymologyCard/EtymologyCard";
import Grow from '@material-ui/core/Grow';

export default function SearchResults({results: entry}) {
    const classes = useStyles();
    const growIn = true;

    return (
        <>
            {entry.etymologies.map((etymology, i) => (
                <Box className={classes.card}>
                    <Grow in={growIn} {...(growIn ? { timeout: 1000 * i } : {})}>
                        <EtymologyCard etymology={etymology}/>
                    </Grow>
                </Box>

            ))}
        </>
    );
}

const useStyles = makeStyles((theme) => ({
    card: {
        padding: theme.spacing(4),
    }
}));