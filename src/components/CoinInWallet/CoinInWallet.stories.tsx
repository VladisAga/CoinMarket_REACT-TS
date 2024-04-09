import CoinInWallet from "./CoinInWallet";
import type { Meta, StoryObj } from '@storybook/react';
import { example } from '../../additionalInf/examplesForStories';


const meta: Meta<typeof CoinInWallet> = {
    title: 'CoinInWallet',
    component: CoinInWallet,
    decorators: [
        (Story) => (
            <div style={{ border: '1px solid black', maxWidth: '500px', padding: '0 10px', borderRadius: '3px' }}>
                <Story />
            </div>
        ),
    ],
};

export default meta;

type Story = StoryObj<typeof CoinInWallet>;


export const Default: Story = {
    args: {
        coin: example,
        id: 0,
    }
};
