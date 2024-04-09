import Input from "./Input";
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Input> = {
    title: 'Input',
    component: Input,
    decorators: [
        (Story) => (
            <div style={{ border: '1px solid black', padding: '0 10px', borderRadius: '3px', maxWidth: '300px'}}>
                <Story />
            </div>
        ),
    ],
};

export default meta;

type Story = StoryObj<typeof Input>;


export const Default: Story = {
    args: {
        placeholder: 'Some text'
    }
};
