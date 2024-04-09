import { BrowserRouter as Router } from 'react-router-dom';
import Error from "./Error";
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Error> = {
    title: 'Error',
    component: Error,
    decorators: [
        (Story) => (
            <Router>
                <div style={{ margin: '-18px' }}>
                    <Story />
                </div>
            </Router>
        ),
    ],
};

export default meta;

type Story = StoryObj<typeof Error>;


export const Default: Story = {

};
