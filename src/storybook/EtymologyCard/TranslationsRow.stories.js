import React from 'react';
import TranslationsRow from '../../components/EtymologyCard/TranslationsRow';
import {muiTheme} from 'storybook-addon-material-ui';
import theme from '../../theme';
import amoenus from "../../test/data/amoenus.json"
import fero from "../../test/data/fero.json"

export default {
    title: 'TranslationsRow',
    component: TranslationsRow,
    decorators: [muiTheme([theme]), (Story) => <div style={{width: `${382}px`}}><Story/></div>]
};

const Template = (args) => <TranslationsRow {...args} />;

export const Amoenus = Template.bind({});
Amoenus.args = {
    translations: amoenus.etymologies[0].translations
};

export const Fero = Template.bind({});
Fero.args = {
    translations: fero.etymologies[0].translations
};