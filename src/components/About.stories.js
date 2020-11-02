import React from 'react';
import About from './About';
import {muiTheme} from 'storybook-addon-material-ui';
import theme from '../theme';
import {BrowserRouter as Router} from "react-router-dom";

export default {
    title: 'About',
    component: About,
    decorators: [muiTheme([theme]), (Story) => <Router><Story/></Router>]
};

const Template = (args) => <About {...args} />;

export const Default = Template.bind({});
Default.args = {};