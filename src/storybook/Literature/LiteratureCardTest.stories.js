import React from 'react';
import LiteratureCardTest from '../../components/Literature/LiteratureCardRoot';
import {muiTheme} from 'storybook-addon-material-ui';
import theme from '../../theme';

const X = {
    title: 'LiteratureCardTest',
    component: LiteratureCardTest,
    decorators: [muiTheme([theme])]
};

const Template = (args) => <LiteratureCardTest {...args} />;

export const Default = Template.bind({});
Default.args = {};

export default X;