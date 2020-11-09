import React from 'react';
import EtymologyCard from '../../components/EtymologyCard/EtymologyCard';
import {muiTheme} from 'storybook-addon-material-ui';
import theme from '../../theme';
import amoenus from "../../test/data/amoenus.json"
import fero from "../../test/data/fero.json"
import amo from "../../test/data/amo.json"

export default {
    title: 'EtymologyCard',
    component: EtymologyCard,
    decorators: [muiTheme([theme])]
};

const Template = (args) => <EtymologyCard {...args} />;

export const Amoenus = Template.bind({});
Amoenus.args = {
    etymology: amoenus.etymologies[0],
    searched: "amoeno",
};

export const Fero = Template.bind({});
Fero.args = {
    etymology: fero.etymologies[0],
    searched: "feram"
};

export const Amo = Template.bind({});
Amo.args = {
    etymology: amo.etymologies[0],
    searched: "amat"
};