import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import LiteratureCardBranch from "./LiteratureCardBranch";

export default function LiteratureCardRoot({author}) {
    const classes = useStyles();
    
    return (
        <Card elevation={4} className={classes.literatureCard}>
            <LiteratureCardBranch item={author} level={0}/>
        </Card>
    )
}

const useStyles = makeStyles(theme => ({
    literatureCard: {
        display: "inline-block",
        width: theme.custom.cardWidth,
        fontFamily: theme.typography.fontFamily,
        padding: 0,
    },
}));