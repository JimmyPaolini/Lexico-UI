import React from 'react';
import SwitchEnLa from '../../components/Search/SwitchEnLa';
import {muiTheme} from 'storybook-addon-material-ui';
import theme from '../../theme';
import {BrowserRouter as Router} from "react-router-dom";


const obj = {
    title: 'SwitchEnLa',
    component: SwitchEnLa,
    decorators: [muiTheme([theme]), (Story) => <Router><Story/></Router>]
};

const Template = (args) => <SwitchEnLa {...args} />;

export const Default = Template.bind({});
Default.args = {
    isLatin: true,
    setLatin: () => null
};

export default obj;