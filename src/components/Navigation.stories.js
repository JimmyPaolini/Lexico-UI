import React from 'react';
import Navigation from './Navigation';
import {muiTheme} from 'storybook-addon-material-ui';
import theme from '../theme';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

export default {
    title: 'Navigation',
    component: Navigation,
    decorators: [muiTheme([theme]), (Story) => <Router><Story/></Router>]
};

const Template = (args) => <Navigation {...args} />;

export const Default = Template.bind({});
Default.args = {};