import { Provider } from "react-redux";
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from "../../redux/configure-store";
import TableRow from "./TableRow";
import type { Meta, StoryObj } from '@storybook/react';
import { example } from "../../additionalInf/examplesForStories";

const meta: Meta<typeof TableRow> = {
    title: 'TableRow',
    component: TableRow,

    decorators: [
        (Story) => (
            <Provider store={store}>
                <Router>
                    <div style={{border: '1px solid black', borderRadius: '3px'}}>
                        <Story />
                    </div>
                </Router>
            </Provider>
        ),
    ],
};

export default meta;

type Story = StoryObj<typeof TableRow>;


export const Default: Story = {
    args: {
        value: example,
        id: 2,
        imgSrc: example.coinImg
    }
};
