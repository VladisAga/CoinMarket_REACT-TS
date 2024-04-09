import React from 'react';
import { Provider } from 'react-redux';
import { coinApi } from '../../redux/coinApi';
import CandlestickChart from './CandlestickChart';
import type { Meta, StoryObj } from '@storybook/react';
import { store } from '../../redux/configure-store'

const meta: Meta<typeof CandlestickChart> = {
    title: 'CandlestickChart',
    component: CandlestickChart,
    argTypes: {
        graphicData: {
            options: ['bitcoin', 'ethereum', 'dogecoin'],
            control: { type: 'select' },
        },
        timePeriod: {
            options: ['d1', 'h1', 'h12'],
            control: { type: 'select' },
        },
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

type Story = StoryObj<typeof CandlestickChart>;

export const Default: Story = {
    render: (args) => {
        const [graphicData, setGraphicData] = React.useState();
        const [getCandleData] = coinApi.endpoints.getCoinCandle.useLazyQuery();

        React.useEffect(() => {
            const dataPoints = 24;
            getCandleData({ interval: args.timePeriod || 'd1' , coin: args.graphicData as unknown as string || 'bitcoin'  })
                .unwrap()
                .then((data) => {
                    setGraphicData(data.data.slice(-dataPoints));
                })
                .catch(console.log);
        }, [getCandleData, args.graphicData, args.timePeriod]);

        return <CandlestickChart graphicData={graphicData!} timePeriod={args.timePeriod} />;
    },
};