import React, { useState } from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

export default function LiteratureCard({author, work}) {
    const classes = useStyles();

    return (
        <Card elevation={4} className={classes.literatureCard}>
            <CardActionArea onClick={() => null}>
                <CardHeader
                    title={work.title}
                    subheader={author}
                    className={classes.literatureCardHeader}
                />
                <CardContent>
                    <Typography variant="body2" component="p">
                        {work.subworks.map(subwork => subwork.title).join(" - ")}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

const useStyles = makeStyles(theme => ({
    literatureCard: {
        display: "inline-block",
        width: 382,
        fontFamily: theme.typography.fontFamily,
    },
    literatureCardHeader: {
        textAlign: "center",
        paddingBottom: theme.spacing(0),
    },
}));