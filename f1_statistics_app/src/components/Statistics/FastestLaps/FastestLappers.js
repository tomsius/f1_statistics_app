import React, { Component } from 'react';
import { DataRangeForm } from '../../DataRangeForm';
import CanvasJSReact from '../../../canvasjs.react';
import { Button } from 'react-bootstrap';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export class FastestLappers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fastestLappers: [],
            isBarChart: true,
            isVisible: false
        };

        this.fillData = this.fillData.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.calculateTotalFastest = this.calculateTotalFastest.bind(this);
    }

    fillData(data) {
        this.setState({
            fastestLappers: data
        });
    }

    handleClick() {
        var newChart = !this.state.isBarChart;

        this.setState({
            isBarChart: newChart
        });
    }

    calculateTotalFastest(fastestLappers) {
        var totalFastest = 0;

        fastestLappers.forEach(fastestLapper => {
            totalFastest += fastestLapper.fastestLapsCount
        });

        return totalFastest;
    }

    render() {
        if (this.state.fastestLappers.length > 0) {
            var totalFastest = this.calculateTotalFastest(this.state.fastestLappers);
            var data = this.state.fastestLappers.map(x => ({ label: x.name, y: x.fastestLapsCount, percentage: Math.round((x.fastestLapsCount / totalFastest * 100) * 100) / 100 }));
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
                        labelAngle: 30,
                        interval: 1
                    },
                    axisY: {
                        title: "Greičiausių lenktynių ratų skaičius, vnt."
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
                <p style={{color:"red", textAlign:"center"}}>*Greičiausių ratų duomenys prieinami tik nuo 2004 metų.</p>
                <br />
                <DataRangeForm api={this.props.api} callback={this.fillData} />
                <br />
                {
                    this.state.fastestLappers.length > 0 &&
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