import React, { Component } from 'react';
import { DataRangeForm } from '../../DataRangeForm';
import CanvasJSReact from '../../../canvasjs.react';
import { Button } from 'react-bootstrap';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export class FastestLappersUnique extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fastestLappersUnique: [],
            isBarChart: true
        };

        this.fillData = this.fillData.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    fillData(data) {
        this.setState({
            fastestLappersUnique: data
        });
    }

    handleClick() {
        var newChart = !this.state.isBarChart;

        this.setState({
            isBarChart: newChart
        });
    }

    render() {
        var data = this.state.fastestLappersUnique.map(x => ({ label: x.season, y: x.uniqueFastestLapsCount, fastest: x.fastestLapAchievers.join(", ") }));
        var options;

        if (this.state.isBarChart) {
            options = {
                toolTip: {
                    content: "Fastest: {fastest}"
                },
                axisY: {
                    interval: 1,
                    minimum: 0
                },
                data: [
                    {
                        type: "column",
                        dataPoints: data
                    }
                ]
            };
        }
        else {
            options = {
                toolTip: {
                    content: "Fastest: {fastest}"
                },
                axisY: {
                    interval: 1,
                    minimum: 0
                },
                data: [
                    {
                        type: "line",
                        dataPoints: data
                    }
                ]
            };
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
                    this.state.fastestLappersUnique.length > 0 &&
                    <div>
                        <Button variant="primary" onClick={this.handleClick} disabled={this.state.isVisible}>
                            {this.state.isBarChart ? "Rodyti linijinę diagramą" : "Rodyti stulpelinę diagramą"}
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