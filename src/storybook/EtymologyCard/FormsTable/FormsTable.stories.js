import React from 'react';
import FormsTable from '../../../components/EtymologyCard/FormsTable/FormsTable';
import {muiTheme} from 'storybook-addon-material-ui';
import theme from '../../../theme';

export default {
    title: 'FormsTable',
    component: FormsTable,
    decorators: [muiTheme([theme]), (Story) => <div style={{width: theme.custom.cardWidth}}><Story/></div>]
};

const Template = (args) => <FormsTable {...args} />;

export const Verb = Template.bind({});
Verb.args = {
    forms: [
        {
            topLeft: "1",
            topRight: "SG",
        },
        {
            topRight: "PL",
        },
        {
            topLeft: "2",
        },
        {
        },
        {
            topLeft: "3",
        },
        {
        },
    ],
};

export const Noun = Template.bind({});
Noun.args = {
    forms: [
        {
            topLeft: "NOM",
            topRight: "SG",
        },
        {
            topLeft: "PL",
        },
        {
            topLeft: "GEN",
        },
        {
        },
        {
            topLeft: "DAT",
        },
        {
        },
        {
            topLeft: "ACC",
        },
        {
        },
        {
            topLeft: "ABL",
        },
        {
        },
    ],
};

export const NounLong = Template.bind({});
NounLong.args = {
    forms: [
        {
            topLeft: "NOM",
            topRight: "SG",
        },
        {
            topLeft: "PL",
        },
        {
            topLeft: "VOC",
        },
        {
        },
        {
            topLeft: "GEN",
        },
        {
        },
        {
            topLeft: "DAT",
        },
        {
        },
        {
            topLeft: "ACC",
        },
        {
        },
        {
            topLeft: "ABL",
        },
        {
        },
        {
            topLeft: "LOC",
        },
        {
        },
    ],
};