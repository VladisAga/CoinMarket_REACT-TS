import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from "react-redux";
import { store } from "../../../redux/configure-store";
import ErrorModal from "./ErrorModal";
import type { Meta, StoryObj } from '@storybook/react';
import styles from '../ModalBuyCoins/ModalBuyCoins.module.scss';

const meta: Meta<typeof ErrorModal> = {
    title: 'ErrorModal',
    component: ErrorModal,
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

type Story = StoryObj<typeof ErrorModal>;

export const Default: Story = {
    args: {
       isOpen: true
    }
};