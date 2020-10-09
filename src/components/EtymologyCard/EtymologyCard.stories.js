import React from 'react';
import EtymologyCard from './EtymologyCard';
import {muiTheme} from 'storybook-addon-material-ui';
import theme from '../theme';
import amoenus from "../test/amoenus.json"
import fero from "../test/fero.json"

export default {
    title: 'EtymologyCard',
    component: EtymologyCard,
    decorators: [muiTheme([theme])]
};

const Template = (args) => <EtymologyCard {...args} />;

export const Amoenus = Template.bind({});
Amoenus.args = {
    etymology: amoenus.etymologies[0],
    searchResults: ["amoena, amoenae"],
    bookmarked: true,
};

export const Fero = Template.bind({});
Fero.args = {
    etymology: fero.etymologies[0],
    searchResults: ["fere", "tuli"],
    bookmarked: false,
};