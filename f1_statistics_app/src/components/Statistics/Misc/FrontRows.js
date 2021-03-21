import React, { Component } from 'react';
import { DataRangeForm } from '../../DataRangeForm';
import CanvasJSReact from '../../../canvasjs.react';
import { Button } from 'react-bootstrap';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export class FrontRows extends Component {
    constructor(props) {
        super(props);
        this.state = {
            frontRows: [],
            isBarChart: true,
            isVisible: false
        };

        this.fillData = this.fillData.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.calculateTotalFrontRows = this.calculateTotalFrontRows.bind(this);
    }

    fillData(data) {
        this.setState({
            frontRows: data
        });
    }

    handleClick() {
        var newChart = !this.state.isBarChart;

        this.setState({
            isBarChart: newChart
        });
    }

    calculateTotalFrontRows(frontRows) {
        var totalFrontRows = 0;

        frontRows.forEach(frontRow => {
            totalFrontRows += frontRow.frontRowCount
        });

        return totalFrontRows;
    }

    render() {
        if (this.state.frontRows.length > 0) {
            var totalFrontRows = this.calculateTotalFrontRows(this.state.frontRows);
            var data = this.state.frontRows.map(x => ({ label: x.name, y: x.frontRowCount, percentage: Math.round((x.frontRowCount / totalFrontRows * 100) * 100) / 100 }));
            
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
                        title: "Komanda",
                        labelAngle: 0,
                        interval: 1,
                        valueFormatString: " "
                    },
                    axisY: {
                        interval: 5,
                        minimum: 0,
                        title: "„Front row“ skaičius, vnt."
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
                    this.state.frontRows.length > 0 &&
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