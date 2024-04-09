import { Provider } from "react-redux";
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from "../../redux/configure-store";
import HeaderAndMain from "./HeaderAndMain";
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof HeaderAndMain> = {
    title: 'HeaderAndMain',
    component: HeaderAndMain,
    decorators: [
        (Story) => (
            <Provider store={store}>
                <Router>
                    <div >
                        <Story />
                    </div>
                </Router>
            </Provider>
        ),
    ],
};

export default meta;

type Story = StoryObj<typeof HeaderAndMain>;


export const Default: Story = {
    args: {
      
    }
};
