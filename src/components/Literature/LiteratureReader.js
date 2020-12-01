/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Fade from '@material-ui/core/Fade';
import LiteratureCard from "./LiteratureCardRoot";
import SearchBar from "../Search/SearchBar";
import CardDeck from "../CardDeck";

export default function LiteratureReader() {
    const classes = useStyles();

    return (

        <Paper>

        </Paper>
    );
}


const useStyles = makeStyles((theme) => ({
}));