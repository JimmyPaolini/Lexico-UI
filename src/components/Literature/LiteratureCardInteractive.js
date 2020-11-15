import React, { useState } from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Fade from '@material-ui/core/Fade';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';

export default function LiteratureCard({author, work: workOriginal}) {
    const classes = useStyles();
    const [path, setPath] = useState([]);
    const [work, setWork] = useState(workOriginal);

    const openSubworks = (work) => {
        if (!work.subworks) return;
        setPath([...path, work.title]);
        setWork(work);
    }

    const closeSubworks = () => {
        const newPath = path.slice(0, -1);
        const newList = newPath.reduce((newList, item) => 
            newList.find(listItem => listItem.title === item.title)
        , workOriginal);
        setPath(newPath);
        setWork(newList);
    }

    const isRoot = work.subworks && workOriginal.subworks[0].title === work.subworks[0].title;

    return (
        <Card elevation={4} className={classes.literatureCard}>
            <CardActionArea onClick={() => closeSubworks()} disabled={isRoot} disableRipple className={classes.literatureCardHeader}>
                <Fade in={!isRoot} timeout={200}>
                    <Box className={classes.backArrow}>
                        <KeyboardArrowLeftIcon />
                    </Box>
                </Fade>
                <Box className={isRoot ? classes.titleRoot : classes.titleSubwork}>
                    <Typography variant="h6">
                        {work.title}
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                        {author}
                    </Typography>
                </Box>
                <Box className={classes.backArrow}/>
            </CardActionArea>
            <Divider variant="middle" />
            <CardContent className={classes.literatureCardContent}>
                <List className={classes.literatureWorksList}>
                    {work.subworks.map(subwork => (
                        <ListItem button divider onClick={() => openSubworks(subwork)} disableRipple>
                            <Grid container justify="space-between" alignItems="center">
                                <Grid item>
                                    {subwork.title}
                                </Grid>
                                <Grid item>
                                    <KeyboardArrowRightIcon style={{visibility: !!subwork.subworks ? "visible" : "hidden"}}/>
                                </Grid>
                            </Grid>
                        </ListItem>
                    ))}
                </List>
            </CardContent>
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
        padding: theme.spacing(2),
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        whiteSpace: "nowrap",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    titleRoot: {
        display: "inline-block",
        textAlign: "center",
        height: 56,
        width: 382 - 32 - 80, // side padding = 32, button/box widths = 40
        transition: theme.transitions.create('all', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.shorter,
        }),
    },
    titleSubwork: {
        display: "inline-block",
        textAlign: "center",
        height: 56,
        width: 0,
        transition: theme.transitions.create('all', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.shorter,
        }),
    },
    backArrow: {
        display: "inline-block",
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        paddingRight: theme.spacing(2),
    },
    literatureCardContent: {
        paddingTop: theme.spacing(0),
        paddingBottom: theme.spacing(0),
    },
    literatureWorksList: {
        paddingTop: theme.spacing(0),
        paddingBottom: theme.spacing(0),
    },
}));