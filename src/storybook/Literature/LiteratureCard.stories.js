import React from 'react';
import LiteratureCard from '../../components/Literature/LiteratureCardInteractive';
import {muiTheme} from 'storybook-addon-material-ui';
import theme from '../../theme';
import caesar from "../../data/Literature/caesar.json";
import virgil from "../../data/Literature/virgil.json";

export default {
    title: 'LiteratureCard',
    component: LiteratureCard,
    decorators: [muiTheme([theme])]
};

const Template = (args) => <LiteratureCard {...args} />;

export const Caesar = Template.bind({});
Caesar.args = caesar;

export const Vergil = Template.bind({});
Vergil.args = virgil;
