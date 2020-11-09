import React from 'react';
import AdjectiveForms from '../../../components/EtymologyCard/PartsOfSpeech/AdjectiveForms';
import {muiTheme} from 'storybook-addon-material-ui';
import theme from '../../../theme';
import amoenus from "../../../test/data/amoenus.json"

export default {
    title: 'AdjectiveForms',
    component: AdjectiveForms,
    decorators: [muiTheme([theme])]
};

const Template = (args) => <AdjectiveForms {...args} />;

export const Amoenus = Template.bind({});
Amoenus.args = {
    forms: amoenus.etymologies[0].forms
};