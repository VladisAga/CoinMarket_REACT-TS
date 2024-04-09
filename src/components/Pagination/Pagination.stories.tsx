import Pagination from "./Pagination";
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Pagination> = {
    title: 'Pagination',
    component: Pagination,
    argTypes: {
    
        page: {
            options: [1, 5, 9],
            control: { type: 'radio' },
        }
    },
};

export default meta;

type Story = StoryObj<typeof Pagination>;


export const Default: Story = {
    args: {
        dataLength: 900,
        page: 1 * 100,
    }
};
