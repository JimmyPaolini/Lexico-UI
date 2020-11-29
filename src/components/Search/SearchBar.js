import React, { useContext, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useEventListener from "../../useEventListener";
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import CircularProgress from "@material-ui/core/CircularProgress";
import SwitchEnLa from "./SwitchEnLa";
import { pascalCase } from "../../globals";
import { Context } from "../../App";

export default function SearchBar({search, handleSearchChange, handleSearchExecute, loading, target="", isLatin, setLatin}) {
    const classes = useStyles();
    const {isNavOpen, setNavOpen} = useContext(Context);
    const input = useRef();
    const isMobile = useMediaQuery(theme => theme.breakpoints.down('sm'));

    // useEffect(() => input.current.focus(), []);

    useEventListener("keypress", e => {
        if (e.key === "Escape") return input.current.blur();
        if (e.key !== "Enter") return;
        if (input.current === document.activeElement) input.current.blur();
        else {
            input.current.focus();
            input.current.select();
        }
    });

    return (
        <Paper className={classes.searchBar}>
            {isMobile && <IconButton 
                onClick={() => setNavOpen(!isNavOpen)} 
                className={classes.iconButton} 
                aria-label="menu">
               <MenuIcon/>
            </IconButton>}
            <InputBase
                id="searchBar"
                className={classes.input}
                placeholder={"Search " + pascalCase(target)}
                inputProps={{ 'aria-label': 'search', ref: input }}
                value={search}
                onChange={handleSearchChange}
                onKeyDown={e => { if (e.keyCode === 13) handleSearchExecute(); }}
            />
            <IconButton type="submit" onClick={() => handleSearchExecute()} className={classes.iconButton} aria-label="search">
                {!loading ? <SearchIcon/> : <CircularProgress size={24} thickness={5.4} color="secondary"/>}
            </IconButton>
            {target === "lexico" && <SwitchEnLa {...{isLatin, setLatin}} />}
        </Paper>
    );
}

// function SwitchEnLa({isLatin, setLatin}) {
//     const classes = useStyles();
//     const [checked, setChecked] = useState(isLatin);
//     const handleChange = (e) => {
//         console.log(e);
//         setChecked(checked => !checked);
//         // setLatin(isLatin => !isLatin);
//     }

//     return (
//         <Box className={classes.box}>
//             <Switch 
//                 name="English/Latin"
//                 color="primary"
//                 checked={checked}
//                 onClick={(e) => handleChange(e)}
//                 className={classes.switch}
//                 inputProps={{ 'aria-label': 'English/Latin Toggle' }}
//                 classes={{
//                     track: checked ? classes.trackChecked : classes.trackUnchecked,
//                     thumb: checked ? classes.thumbChecked : classes.thumbUnchecked,
//                 }}
//             />
//             <Typography className={classes.en}>EN</Typography>
//             <Typography className={classes.la}>LA</Typography>
//         </Box>
//     );
// }

// const Switch = withStyles((theme) => ({
//     switchBase: {
//         padding: 8,
//         "&$checked": {
//             transform: "translateX(24px)"
//         }
//     },
//     track: {
//         height: 24,
//         width: 48,
//         borderRadius: 12,
//     },
//     thumb: {
//         height: 24,
//         width: 24,
//         boxShadow: "none",
//         position: "relative",
//     },
//     checked: {},
// }))(SwitchMui);

const useStyles = makeStyles((theme) => {
    const label = {
        position: "absolute",
        top: 11,
        color: theme.palette.text.secondary,
        fontSize: 12,
        pointerEvents: "none",
    };

    const track = {
        // height: 24,
        // width: 48,
        // borderRadius: 12,
    };

    const thumb = {
        // height: 24,
        // width: 24,
        // boxShadow: "none",
        // position: "relative",
    }

    return {
        searchBar: {
            display: 'flex',
            flexDirection: "row",
            alignItems: 'center',
            width: theme.custom.cardWidth,
            height: 46,
            padding: '2px 4px',
            marginTop: theme.spacing(4),
            marginBottom: theme.spacing(8),
        },
        input: {
            marginLeft: theme.spacing(1),
            flex: 1,
            fontSize: 20
        },
        iconButton: {
            padding: theme.spacing(1),
        },
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
        trackChecked: {...track,
            backgroundColor: theme.palette.primary.main,
        },
        trackUnchecked: {...track,
            backgroundColor: theme.palette.secondary.main,
        },
        thumbChecked: {...thumb,
            backgroundColor: theme.palette.primary.main,
        },
        thumbUnchecked: {...thumb,
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