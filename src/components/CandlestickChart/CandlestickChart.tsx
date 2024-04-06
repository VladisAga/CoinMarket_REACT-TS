import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { ICandlestickChart } from './CandlestichChart.props';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const CandlestickChart: React.FC<ICandlestickChart> = ({ graphicData }) => {
    const priceMap = () => {
        if (graphicData) {
            return graphicData.map((value) => value.priceUsd);
        }
    };

    const labelsMap = () => {
        if (graphicData) {
            return graphicData.map((value) => {
                const date = new Date(value.date);
                const hour = date.getHours() % 12 || 12;
                const meridiem = date.getHours() < 12 ? 'AM' : 'PM';
                return hour + meridiem;
            });
        }
    };

    const chooseColor = () => {
        if (graphicData) {
            return graphicData[0].priceUsd > graphicData[graphicData.length - 1].priceUsd ? 'rgba(255, 0, 0, 0.3)' : 'rgba(0, 255, 0, 0.3)';
        }
    };

    return <Line options={{
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: true,
                font: {
                    size: 18
                }
            },
            filler: {
                propagate: true
            }
        },
        scales: {
            y: {
                ticks: {
                    callback: function (value) {
                        if (+value >= 1000) {
                            return '$' + +value / 1000 + 'k';
                        }
                        return '$' + value;
                    },
                    color: 'black',
                    font: {
                        weight: 500,
                    }
                }
            },
            x: {
                ticks: {
                    color: 'black',
                    font: {
                        weight: 500,
                    }
                }
            }
        }
    }
    } data={{
        labels: labelsMap(),
        datasets: [
            {
                label: '',
                data: priceMap(),
                borderColor: 'rgb(255, 141, 2)',
                fill: {
                    target: 'origin',
                    above: chooseColor(),

                }
            },
        ],
    }} />;
}

export default CandlestickChart;
