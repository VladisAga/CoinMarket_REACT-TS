import Loader from "./Loader";
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Loader> = {
    title: 'Loader',
    component: Loader,
    decorators: [
        (Story) => (
            <div style={{margin: '-18px'}}>
                <Story />
            </div>
        ),
    ],
};

export default meta;

type Story = StoryObj<typeof Loader>;


export const Default: Story = {
    args: {
        isLoading: true
    }
};
