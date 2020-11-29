import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import SwitchMui from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';


export default function SwitchEnLa({isLatin, setLatin}) {
    const classes = useStyles();

    return (
        <Box className={classes.box}>
            <Switch 
                name="English/Latin"
                color="primary"
                checked={isLatin}
                onClick={() => setLatin(isLatin => !isLatin)}
                className={classes.switch}
                inputProps={{ 'aria-label': 'English/Latin Toggle' }}
                classes={{
                    track: isLatin ? classes.primary : classes.secondary,
                    thumb: isLatin ? classes.primary : classes.secondary,
                }}
            />
            <Typography className={classes.en}>EN</Typography>
            <Typography className={classes.la}>LA</Typography>
        </Box>
    );
}

const Switch = withStyles((theme) => ({
    switchBase: {
        padding: 8,
        "&$checked": {
            transform: "translateX(24px)"
        }
    },
    track: {
        height: 24,
        width: 48,
        borderRadius: 12,
    },
    thumb: {
        height: 24,
        width: 24,
        boxShadow: "none",
        position: "relative",
    },
    checked: {},
}))(SwitchMui);

const useStyles = makeStyles((theme) => {
    const label = {
        position: "absolute",
        top: 11,
        color: theme.palette.text.secondary,
        fontSize: 12,
        pointerEvents: "none",
    };

    return {
        box: {
            position: "relative",
            height: 40,
            width: 64,
        },
        switch: {
            height: 40,
            width: 64,
            padding: 8,
        },
        primary: {
            backgroundColor: theme.palette.primary.main,
        },
        secondary: {
            backgroundColor: theme.palette.secondary.main,
        },
        la: {...label,
            left: 37,
        },
        en: {...label,
            left: 12,
        }
    }
});