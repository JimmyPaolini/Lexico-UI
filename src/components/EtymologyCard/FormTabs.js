import React  from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    tabs: {
        height: "42px",
    },
    paper: {
        borderRadius: 0,
    }
}));

export default function FormTabs({activeTab, tabs, setActiveTab, children}) {
    const classes = useStyles();
    const minWidth = `${100 / tabs.length}%`;

    const changeActiveTab = (e, selectedTab) => {
        setActiveTab(selectedTab);
    }

    return (
        <Paper className={classes.paper} elevation={0}>
            <Tabs
                value={activeTab}
                onChange={changeActiveTab}
                className={classes.tabs}
                textColor="secondary"
                indicatorColor="secondary"
                aria-label="conjugation tabs"
            >
                {tabs.map(tab =>
                    <Tab label={tab === "-" ? "-" : tab} style={{minWidth}} disabled={tab === "-"}/>
                )}
            </Tabs>
            {children}
        </Paper>
    );
}

FormTabs.propTypes = {
    activeTab: PropTypes.number.isRequired,
    tabs: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    setActiveTab: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
};