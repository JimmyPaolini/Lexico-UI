import React from 'react';
import Suggestions from './Suggestions';
import {muiTheme} from 'storybook-addon-material-ui';
import theme from '../theme';
import {BrowserRouter as Router} from "react-router-dom";

export default {
    title: 'Suggestions',
    component: Suggestions,
    decorators: [muiTheme([theme]), (Story) => <Router><Story/></Router>]
};

const Template = (args) => <Suggestions {...args} />;

export const Default = Template.bind({});
Default.args = {};