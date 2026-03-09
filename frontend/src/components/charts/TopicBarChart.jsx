import React from 'react';
import Plot from 'react-plotly.js';

const TopicBarChart = ({ data }) => {
    const chartData = [{
        x: data.map(d => d.frequency),
        y: data.map(d => d.name),
        type: 'bar',
        orientation: 'h',
        marker: {
            color: '#6366f1',
            line: {
                color: '#4f46e5',
                width: 1
            }
        }
    }];

    const layout = {
        height: 350,
        margin: { t: 20, b: 40, l: 120, r: 20 },
        xaxis: {
            title: 'Frequency',
            gridcolor: '#1e293b',
            tickfont: { color: '#94a3b8' },
            titlefont: { color: '#94a3b8' }
        },
        yaxis: {
            showgrid: false,
            tickfont: { color: '#94a3b8', size: 12 },
            autorange: 'reversed'
        },
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        font: { family: 'Inter, sans-serif' }
    };

    return (
        <div className="w-full h-full">
            <Plot
                data={chartData}
                layout={layout}
                useResizeHandler={true}
                className="w-full h-full"
                config={{ displayModeBar: false, responsive: true }}
            />
        </div>
    );
};

export default TopicBarChart;
