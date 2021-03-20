import React, { Component } from 'react';
import { DataRangeForm } from '../../DataRangeForm';
import CanvasJSReact from '../../../canvasjs.react';
import { Button } from 'react-bootstrap';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export class HatTricks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hatTricks: [],
            isBarChart: true,
            isVisible: false
        };

        this.fillData = this.fillData.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.calculateTotalHatTricks = this.calculateTotalHatTricks.bind(this);
    }

    fillData(data) {
        this.setState({
            hatTricks: data
        });
    }

    handleClick() {
        var newChart = !this.state.isBarChart;

        this.setState({
            isBarChart: newChart
        });
    }

    calculateTotalHatTricks(hatTricks) {
        var totalHatTricks = 0;

        hatTricks.forEach(hatTrick => {
            totalHatTricks += hatTrick.hatTrickCount
        });

        return totalHatTricks;
    }

    render() {
        if (this.state.hatTricks.length > 0) {
            var totalHatTricks = this.calculateTotalHatTricks(this.state.hatTricks);
            var data = this.state.hatTricks.map(x => ({ label: x.name, y: x.hatTrickCount, percentage: Math.round((x.hatTrickCount / totalHatTricks * 100) * 100) / 100 }));
            
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
                        labelAngle: 0,
                        interval: 1,
                        valueFormatString: " "
                    },
                    axisY: {
                        title: "„Hat Trick“ skaičius, vnt."
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
                    this.state.hatTricks.length > 0 &&
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