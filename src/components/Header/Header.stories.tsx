import { Provider } from "react-redux";
import { store } from "../../redux/configure-store";
import Header from "./Header";
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Header> = {
    title: 'Header',
    component: Header,
    argTypes: {
    },
    decorators: [
        (Story) => (
            <Provider store={store}>
                <Story />
            </Provider>
        ),
    ],
};

export default meta;

type Story = StoryObj<typeof Header>;


export const Default: Story = {
    
};
