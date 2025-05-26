import { Chart, registerables } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { useEffect } from 'react';
Chart.register(...registerables);

export default function FinStates(props) {
    const data = {
        labels: props.finLabels,
        datasets: props.finData
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return `${context.dataset.label}: ${context.raw.toFixed(2)} руб.`;
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function(value) {
                        return value + ' руб.';
                    }
                }
            }
        }
    };

    return(
        <div className="fin-states-chart">
            <Bar data={data} options={options} />
        </div>
    )
}