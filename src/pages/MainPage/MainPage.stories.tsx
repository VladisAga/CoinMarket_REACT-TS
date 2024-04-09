import { Provider } from "react-redux";
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from "../../redux/configure-store";
import MainPage from "./MainPage";
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof MainPage> = {
    title: 'MainPage',
    component: MainPage,
    decorators: [
        (Story) => (
            <Provider store={store}>
                <Router>
                        <Story />     
                </Router>
            </Provider>
        ),
    ],
};

export default meta;

type Story = StoryObj<typeof MainPage>;


export const Default: Story = {

};
