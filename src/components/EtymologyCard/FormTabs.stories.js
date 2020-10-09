import React from 'react';
import FormTabs from './FormTabs';
import {muiTheme} from 'storybook-addon-material-ui';
import theme from '../theme';

export default {
    title: 'FormTabs',
    component: FormTabs,
    decorators: [muiTheme([theme]), (Story) => <div style={{width: `${382}px`}}><Story/></div>]
};

const Template = (args) => <FormTabs {...args} />;

export const Mood = Template.bind({});
Mood.args = {
    tabs: ["IND", "SUB", "IMP", "INF", "NONF"],
    activeTab: 0,
    setActiveTab: () => null
};

export const Tense = Template.bind({});
Tense.args = {
    ...Mood.args,
    tabs: ["PRES", "IMP", "FUT", "PERF", "PLUP", "FUTP"]
};

export const Voice = Template.bind({});
Voice.args = {
    ...Mood.args,
    tabs: ["ACT", "PAS"]
};

export const Gender = Template.bind({});
Gender.args = {
    ...Mood.args,
    tabs: ["MASC", "FEM", "NEU"]
};