import React, { Component } from 'react';
import { DataRangeForm } from '../../DataRangeForm';
import CanvasJSReact from '../../../canvasjs.react';
import { Button } from 'react-bootstrap';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export class PoleSitters extends Component {
    constructor(props) {
        super(props);
        this.state = {
            poleSitters: [],
            isBarChart: true,
            isVisible: false
        };

        this.fillData = this.fillData.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.calculateTotalPoles = this.calculateTotalPoles.bind(this);
    }

    fillData(data) {
        this.setState({
            poleSitters: data
        });
    }

    handleClick() {
        var newChart = !this.state.isBarChart;

        this.setState({
            isBarChart: newChart
        });
    }

    calculateTotalPoles(poleSitters) {
        var totalPoles = 0;

        poleSitters.forEach(poleSitter => {
            totalPoles += poleSitter.poleCount
        });

        return totalPoles;
    }

    render() {
        if (this.state.poleSitters.length > 0) {
            var totalPoles = this.calculateTotalPoles(this.state.poleSitters);
            var data = this.state.poleSitters.map(x => ({ label: x.name, y: x.poleCount, percentage: Math.round((x.poleCount / totalPoles * 100) * 100) / 100 }));
            
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
                        title: "„Pole“ pozicijų skaičius, vnt."
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
                <p style={{color:"red", textAlign:"center"}}>*Pilni kvalifikacijos duomenys prieinami nuo 2003 metų.</p>
                <br />
                <DataRangeForm api={this.props.api} callback={this.fillData} />
                <br />
                {
                    this.state.poleSitters.length > 0 &&
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