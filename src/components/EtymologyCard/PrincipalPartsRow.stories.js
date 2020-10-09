import React from 'react';
import PrincipalPartsRow from './PrincipalPartsRow';
import {muiTheme} from 'storybook-addon-material-ui';
import theme from '../theme';
import amoenus from "../test/amoenus.json"
import fero from "../test/fero.json"

export default {
    title: 'PrincipalPartsRow',
    component: PrincipalPartsRow,
    decorators: [muiTheme([theme]), (Story) => <div style={{width: `${382}px`}}><Story/></div>]
};

const Template = (args) => <PrincipalPartsRow {...args} />;

export const Amoenus = Template.bind({});
Amoenus.args = {
    principalParts: amoenus.etymologies[0].principalParts,
    searchResults: ["amoena, amoenae"],
    bookmarked: true
};

export const Fero = Template.bind({});
Fero.args = {
    principalParts: fero.etymologies[0].principalParts,
    searchResults: ["fere", "tuli"],
    bookmarked: false
};