import React from 'react';
import NounCard from './NounCard';
import {muiTheme} from 'storybook-addon-material-ui';
import theme from '../../theme';
import domus from "../../test/domus.json"
import furcifer from "../../test/furcifer.json"

export default {
    title: 'NounCard',
    component: NounCard,
    decorators: [muiTheme([theme])]
};

const Template = (args) => <NounCard {...args} />;

export const Furcifer = Template.bind({});
Furcifer.args = {
    forms: furcifer.etymologies[0].forms
};

export const Domus = Template.bind({});
Domus.args = {
    forms: domus.etymologies[0].forms
};