import React from 'react';
import FormTable from './FormTable';
import {muiTheme} from 'storybook-addon-material-ui';
import theme from '../../theme';

export default {
    title: 'FormTable',
    component: FormTable,
    decorators: [muiTheme([theme]), (Story) => <div style={{width: `${382}px`}}><Story/></div>]
};

const Template = (args) => <FormTable {...args} />;

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