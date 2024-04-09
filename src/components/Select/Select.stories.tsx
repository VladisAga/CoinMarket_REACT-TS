import Select from "./Select";
import type { Meta, StoryObj } from '@storybook/react';
import { sortingOptions } from '../SortingSection/sortingOptions';


const meta: Meta<typeof Select> = {
    title: 'Select',
    component: Select,
    argTypes: {
        options: {
            options: ['coinPrice', 'marketCap', 'percent'], 
            mapping: sortingOptions,
            control: {
                type: 'select',
                labels: {
                    coinPrice: 'Coin Price',
                    marketCap: 'Market Cap',
                    percent: '24h %',
                },
            },
        },
    },
};

export default meta;

type Story = StoryObj<typeof Select>;

export const Default: Story = {
    args: {
        options: sortingOptions.coinPrice, 
    },
};