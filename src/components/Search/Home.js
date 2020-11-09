import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
// import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';
import logo from '../../logo.png';

export default function Home({announcement}) {
    const classes = useStyles();
    const [fadeIn, setFadeIn] = useState(false);

    return (
        <Fade in={fadeIn} timeout={100}>
            {/* {announcement ? <Paper className={classes.announcement}>
               {/*eslint-disable-next-line jsx-a11y/accessible-emoji*}
               <Typography variant="body1">
                   Announcement, not always present, this day in latin history, roman holiday, link to wikipedia, medieval scientific research, featured content, contains emojis🐋😤💯👀
               </Typography>
            </Paper> : null} */}
            <img src={logo} onLoad={() => setFadeIn(true)} height={500} alt="Logo" />
        </Fade>
    );
}

const useStyles = makeStyles((theme) => ({
    announcement: {
        padding: theme.spacing(1),
        display: "block",
        // position: "absolute",
        // width: "20%",
        // left: "30%",
        // bottom: "70%"
    }
}));