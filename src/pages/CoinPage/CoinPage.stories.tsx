import CoinPage from './CoinPage';
import { MemoryRouter } from 'react-router-dom';
import { example } from '../../additionalInf/examplesForStories';
import { Provider } from 'react-redux';
import { store } from '../../redux/configure-store';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof CoinPage> = {
    title: 'CoinPage',
    component: CoinPage,
    decorators: [
        (Story) => (
            <Provider store={store}>
                <MemoryRouter initialEntries={[`/coinPage/${encodeURIComponent(JSON.stringify(example))}`]}>
                    <Story />
                </MemoryRouter>
            </Provider>
        ),
    ],
};

export default meta;

type Story = StoryObj<typeof CoinPage>;

export const Default: Story = {
    args: {
        inf: example,
    },
};