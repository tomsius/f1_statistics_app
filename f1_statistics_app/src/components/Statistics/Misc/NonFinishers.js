import React, { Component } from 'react';
import { DataRangeForm } from '../../DataRangeForm';
import CanvasJSReact from '../../../canvasjs.react';
import { Button } from 'react-bootstrap';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export class NonFinishers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nonFinishers: [],
            isBarChart: true,
            isVisible: false
        };

        this.fillData = this.fillData.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.calculateTotalNonFinishers = this.calculateTotalNonFinishers.bind(this);
    }

    fillData(data) {
        this.setState({
            nonFinishers: data
        });
    }

    handleClick() {
        var newChart = !this.state.isBarChart;

        this.setState({
            isBarChart: newChart
        });
    }

    calculateTotalNonFinishers(nonFinishers) {
        var totalNonFinishers = 0;

        nonFinishers.forEach(totalNonFinisher => {
            totalNonFinishers += totalNonFinisher.didNotFinishCount
        });

        return totalNonFinishers;
    }

    render() {
        if (this.state.nonFinishers.length > 0) {
            var totalNonFinishers = this.calculateTotalNonFinishers(this.state.nonFinishers);
            var data = this.state.nonFinishers.map(x => ({ label: x.name, y: x.didNotFinishCount, percentage: Math.round((x.didNotFinishCount / totalNonFinishers * 100) * 100) / 100 }));
            
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
                        title: "Lenktynininkas",
                        labelAngle: 30,
                        interval: 1,
                        labelMaxWidth: 70,
                        labelWrap: true,
                        valueFormatString: " "
                    },
                    axisY: {
                        title: "Nebaigtų lenktynių skaičius, vnt."
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
                    this.state.nonFinishers.length > 0 &&
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