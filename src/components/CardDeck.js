/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';
import Grow from '@material-ui/core/Grow';

export default function CardDeck({ cards }) {
    const classes = useStyles();

    let numCols = 1;
    if (useMediaQuery(theme => theme.breakpoints.up('md'))) numCols = 2;
    if (useMediaQuery(theme => theme.breakpoints.up('lg'))) numCols = 3;
    if (useMediaQuery(theme => theme.breakpoints.up('xl'))) numCols = 4;

    const [columns, setColumns] = useState([[]]);

    useEffect(() => {
        reorganizeCards(cards, numCols, setColumns);
    }, [cards, numCols]);

    if (!cards.every(card => card.key && card.Card)) {
        console.error("Invalid card structure passed into CardDeck");
        return null;
    }
    if (!columns.length || !columns[0].length) return null;
    return columns.map((column, col) => {
        if (!column.length) return null;
        const key = column.map(card => card.key).join("");
        return <Grid item container direction="column" alignItems="center" spacing={4} className={classes.column} key={key}>
            {column.map((card, row) => {
                const timeout = 400 * Math.pow(col + row, 1 / 2);
                return <Grow in key={card.key} {...(row || col ? { timeout } : {})}>
                    <Grid item>
                        <card.Card />
                    </Grid>
                </Grow>
            })}
        </Grid>
    });
}

function reorganizeCards(cards, numCols, setColumns) {
    if (numCols <= 0 || !Array.isArray(cards)) return [[]];
    setColumns([...Array(numCols).keys()].map((_, col) => cards.filter((_, row) => row % numCols === col)));
}

const useStyles = makeStyles((theme) => ({
    column: {
        width: theme.custom.cardWidth + 2 * theme.spacing(4)
    }
}));