import React  from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

export default function FormTabs({activeTab, tabs, setActiveTab, children}) {
    const classes = useStyles();
    const minWidth = `${100 / tabs.length}%`;

    const changeActiveTab = (e, selectedTab) => {
        setActiveTab(selectedTab);
    }

    return (
        <Box>
            <Tabs
                value={activeTab}
                onChange={changeActiveTab}
                className={classes.tabs}
                textColor="secondary"
                indicatorColor="secondary"
                aria-label="conjugation tabs"
            >
                {tabs.map((tab, i) =>
                    <Tab label={tab} style={{minWidth}} disabled={tab === "-"} aria-label={tab} key={i}/>
                )}
            </Tabs>
            {children}
        </Box>
    );
}

const useStyles = makeStyles(theme => ({
    tabs: {
        height: 42,
        background: theme.palette.background.paper,
    },
}));