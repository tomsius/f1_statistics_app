import React, { Component } from 'react';
import { DataRangeForm } from '../../DataRangeForm';
import CanvasJSReact from '../../../canvasjs.react';
import { Button } from 'react-bootstrap';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export class PodiumThree extends Component {
    constructor(props) {
        super(props);
        this.state = {
            podiumThree: [],
            isBarChart: true,
            isVisible: false
        };

        this.fillData = this.fillData.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.calculateTotalSamePodiums = this.calculateTotalSamePodiums.bind(this);
    }

    fillData(data) {
        this.setState({
            podiumThree: data
        });
    }

    handleClick() {
        var newChart = !this.state.isBarChart;

        this.setState({
            isBarChart: newChart
        });
    }

    calculateTotalSamePodiums(podiumThree) {
        var totalSamePodiums = 0;

        podiumThree.forEach(p => {
            totalSamePodiums += p.samePodiumCount
        });

        return totalSamePodiums;
    }

    render() {
        if (this.state.podiumThree.length > 0) {
            var totalSamePodiums = this.calculateTotalSamePodiums(this.state.podiumThree);
            var data = this.state.podiumThree.map(x => ({ label: x.podiumFinishers.join(", "), y: x.samePodiumCount, percentage: Math.round((x.samePodiumCount / totalSamePodiums * 100) * 100) / 100 }));
            
            var options;

            if (this.state.isBarChart) {
                options = {
                    title: {
                        text: this.props.pageTitle
                    },
                    data: [
                        {
                            type: "column",
                            dataPoints: data
                        }
                    ],
                    axisX:{
                        title: this.props.axisName,
                        labelAngle: 0,
                        interval: 1
                    },
                    axisY: {
                        title: "Podiumų skaičius, vnt."
                    },
                    toolTip:{   
                        content: "{label}: {y}"      
                    }
                };
            }
            else {
                options = {
                    title: {
                        text: this.props.pageTitle
                    },
                    data: [
                        {
                            type: "pie",
                            indexLabel: "{label} {y}",
                            dataPoints: data
                        }
                    ],
                    toolTip:{   
                        content: "{label}: {percentage}%"      
                    }
                };
            }
        }

        return (
            <div>
                <h2>{this.props.pageTitle}</h2>
                <br />
                <DataRangeForm api={this.props.api} callback={this.fillData} />
                <br />
                {
                    this.state.podiumThree.length > 0 &&
                    <div>
                        <Button variant="primary" onClick={this.handleClick} disabled={this.state.isVisible}>
                            {this.state.isBarChart ? "Rodyti skritulinę diagramą" : "Rodyti stulpelinę diagramą"}
                        </Button>
                        <br />
                        <br />
                        <div style={{ position: "relative", right: "6em" }}>
                            <CanvasJSChart options={options} />
                        </div>
                    </div>
                }
            </div>
        );
    }
}