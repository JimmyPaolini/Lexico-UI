import React from 'react';
import VerbCard from './VerbCard';
import {muiTheme} from 'storybook-addon-material-ui';
import theme from '../../theme';
import amo from "../../test/amo.json"
import fero from "../../test/fero.json"

export default {
    title: 'VerbCard',
    component: VerbCard,
    decorators: [muiTheme([theme])]
};

const Template = (args) => <VerbCard {...args} />;

export const Amo = Template.bind({});
Amo.args = {
    forms: amo.etymologies[0].forms
};

export const Fero = Template.bind({});
Fero.args = {
    forms: fero.etymologies[0].forms
};