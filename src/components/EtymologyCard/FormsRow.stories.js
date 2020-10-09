import React from 'react';
import FormsRow from './FormsRow';
import {muiTheme} from 'storybook-addon-material-ui';
import theme from '../../theme';
import amoenus from "../../test/amoenus.json"
import fero from "../../test/fero.json"

export default {
    title: 'FormsRow',
    component: FormsRow,
    decorators: [muiTheme([theme]), (Story) => <div style={{width: `${382}px`}}><Story/></div>]
};

const Template = (args) => <FormsRow {...args} />;

export const Amoenus = Template.bind({});
Amoenus.args = {
    principalParts: amoenus.etymologies[0].principalParts,
};

export const Fero = Template.bind({});
Fero.args = {
    principalParts: fero.etymologies[0].principalParts,
};