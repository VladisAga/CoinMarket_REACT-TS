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

const CandlestickChart: React.FC<ICandlestickChart> = ({ graphicData, timePeriod }) => {
    const priceMap = () => {
        if (graphicData) {
            return graphicData.map((value) => value.priceUsd);
        }
    };

    const labelsMap = (timePeriod: string) => {
        if (graphicData) {
            return graphicData.map((value) => {
                const date = new Date(value.date);
                let label = '';
                if (timePeriod === '1d' || timePeriod === '12h') {
                    const hour = date.getHours();
                    const minutes = date.getMinutes().toString().padStart(2, '0');
                    label = hour + `:${minutes}`;
                } else if (timePeriod === '1h') {
                    const hours = date.getHours();
                    const minutes = date.getMinutes().toString().padStart(2, '0');
                    label = `${hours}:${minutes}`;
                }
                return label;
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
                        return '$' + (+value).toFixed(2);
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
        labels: labelsMap(timePeriod),
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
