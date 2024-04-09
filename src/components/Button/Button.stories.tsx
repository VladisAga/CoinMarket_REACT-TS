import Button from "./Button";
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Button> = {
    title: 'Button',
    component: Button,
    argTypes: {
    },
};

export default meta;

type Story = StoryObj<typeof Button>;


export const Default: Story = {
    args: {
        children: 'Press me',
        onClick: () => alert('You clicked the button')
    },
};


