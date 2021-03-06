import React from 'react';
import FormCell from '../../../components/EtymologyCard/FormsTable/FormCell';
import {muiTheme} from 'storybook-addon-material-ui';
import theme from '../../../theme';

export default {
    title: 'FormCell',
    component: FormCell,
    decorators: [muiTheme([theme]), (Story) => <div style={{
        width: 191,
        fontFamily: theme.typography.fontFamily,
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.background,
    }}><Story/></div>]
};

const Template = (args) => <FormCell {...args} />;

export const Default = Template.bind({});
Default.args = {
    center: "amātus essēmus,\namātus foremus,\namātus foremus",
    position: "topLeft",
    topLeft: "TL",
    topRight: "TR",
    bottomLeft: "BL",
    bottomRight: "BR",
};

export const TopLeft = Template.bind({});
TopLeft.args = {
    center: "center",
    position: "topLeft",
    topLeft: "TL",
    topRight: "TR",
    bottomLeft: "BL",
    bottomRight: "BR",
};

export const TopRight = Template.bind({});
TopRight.args = {
    center: "center",
    position: "topRight",
    topLeft: "TL",
    topRight: "TR",
    bottomLeft: "BL",
    bottomRight: "BR",
};

export const MidLeft = Template.bind({});
MidLeft.args = {
    center: "center",
    position: "midLeft",
    topLeft: "TL",
    topRight: "TR",
    bottomLeft: "BL",
    bottomRight: "BR",
};

export const MidRight = Template.bind({});
MidRight.args = {
    center: "center",
    position: "midRight",
    topLeft: "TL",
    topRight: "TR",
    bottomLeft: "BL",
    bottomRight: "BR",
};

export const BottomLeft = Template.bind({});
BottomLeft.args = {
    center: "center",
    position: "bottomLeft",
    topLeft: "TL",
    topRight: "TR",
    bottomLeft: "BL",
    bottomRight: "BR",
};

export const BottomRight = Template.bind({});
BottomRight.args = {
    center: "center",
    position: "bottomRight",
    topLeft: "TL",
    topRight: "TR",
    bottomLeft: "BL",
    bottomRight: "BR",
};