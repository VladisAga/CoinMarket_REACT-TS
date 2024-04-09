import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from "react-redux";
import { store } from "../../../redux/configure-store";
import ModalBuyCoins from "./ModalBuyCoins";
import type { Meta, StoryObj } from '@storybook/react';
import styles from '../ModalBuyCoins/ModalBuyCoins.module.scss';
import { example } from '../../../additionalInf/examplesForStories';

const meta: Meta<typeof ModalBuyCoins> = {
    title: 'ModalBuyCoins',
    component: ModalBuyCoins,
    decorators: [
        (Story) => (
            <Provider store={store}>
                <Router>
                    <div className={styles.success}>
                        <Story />
                    </div>
                </Router>
            </Provider>
        ),
    ],
};

export default meta;

type Story = StoryObj<typeof ModalBuyCoins>;

export const Default: Story = {
    args: {
        isOpen: true,
        coinInf: example,
        img: example.coinImg
    }
};