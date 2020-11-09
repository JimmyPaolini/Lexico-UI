import React from 'react';
import FormsRow from '../../components/EtymologyCard/FormsRow';
import {muiTheme} from 'storybook-addon-material-ui';
import theme from '../../theme';
import amoenus from "../../test/data/amoenus.json"
import fero from "../../test/data/fero.json"

export default {
    title: 'FormsRow',
    component: FormsRow,
    decorators: [muiTheme([theme]), (Story) => <div style={{width: `${382}px`}}><Story/></div>]
};

const Template = (args) => <FormsRow {...args} />;

export const Amoenus = Template.bind({});
Amoenus.args = {
    search: "amoeno",
    forms: amoenus.etymologies[0].forms,
    partOfSpeech: amoenus.etymologies[0].partOfSpeech
};

export const Fero = Template.bind({});
Fero.args = {
    search: "fero",
    forms: fero.etymologies[0].forms,
    partOfSpeech: fero.etymologies[0].partOfSpeech
};