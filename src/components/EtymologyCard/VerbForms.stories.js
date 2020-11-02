import React from 'react';
import VerbForms from './VerbForms';
import {muiTheme} from 'storybook-addon-material-ui';
import theme from '../../theme';
import amo from "../../test/amo.json"
import fero from "../../test/fero.json"

export default {
    title: 'VerbForms',
    component: VerbForms,
    decorators: [muiTheme([theme])]
};

const Template = (args) => <VerbForms {...args} />;

export const Amo = Template.bind({});
Amo.args = {
    forms: amo.etymologies[0].forms
};

export const Fero = Template.bind({});
Fero.args = {
    forms: fero.etymologies[0].forms
};