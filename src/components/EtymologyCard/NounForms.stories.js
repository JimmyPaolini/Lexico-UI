import React from 'react';
import NounForms from './NounForms';
import {muiTheme} from 'storybook-addon-material-ui';
import theme from '../../theme';
import domus from "../../test/domus.json"
import furcifer from "../../test/furcifer.json"

export default {
    title: 'NounForms',
    component: NounForms,
    decorators: [muiTheme([theme])]
};

const Template = (args) => <NounForms {...args} />;

export const Furcifer = Template.bind({});
Furcifer.args = {
    forms: furcifer.etymologies[0].forms
};

export const Domus = Template.bind({});
Domus.args = {
    forms: domus.etymologies[0].forms
};