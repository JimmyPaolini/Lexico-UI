import React from 'react';
import AdjectiveCard from './AdjectiveCard';
import {muiTheme} from 'storybook-addon-material-ui';
import theme from '../theme';
import amoenus from "../test/amoenus.json"

export default {
    title: 'AdjectiveCard',
    component: AdjectiveCard,
    decorators: [muiTheme([theme])]
};

const Template = (args) => <AdjectiveCard {...args} />;

export const Amoenus = Template.bind({});
Amoenus.args = {
    forms: amoenus.etymologies[0].forms
};