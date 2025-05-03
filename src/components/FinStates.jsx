import { Chart, registerables } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
Chart.register(...registerables);

export default function FinStates(props) {
    const data = {
        labels: props.finLabels,
        datasets: props.finData
    };

    return(
        <div>
            <div className="AppChart">
                <Bar data={data} />
            </div>
        </div>
    )
}