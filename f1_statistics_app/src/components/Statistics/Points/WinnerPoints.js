import React, { Component } from 'react';
import { DataRangeForm } from '../../DataRangeForm';
import CanvasJSReact from '../../../canvasjs.react';
import { Button } from 'react-bootstrap';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export class WinnerPoints extends Component {
    constructor(props) {
        super(props);
        this.state = {
            winnerPoints: [],
            isBarChart: true,
            isVisible: false
        };

        this.fillData = this.fillData.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    fillData(data) {
        console.log(data);
        this.setState({
            winnerPoints: data
        });
    }

    handleClick() {
        var newChart = !this.state.isBarChart;

        this.setState({
            isBarChart: newChart
        });
    }

    render() {
        if (this.state.winnerPoints.length > 0) {
            var data = this.state.winnerPoints.map(x => ({ label: x.season, y: x.points, winner: x.winner }));
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
                        title: "Metai",
                        labelAngle: 30,
                        interval: 1,
                        valueFormatString: " "
                    },
                    axisY: {
                        title: "Taškų skaičius, vnt."
                    },
                    toolTip:{   
                        content: "Laimėtojas: {winner} ({y} taškų)"      
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
                            type: "line",
                            dataPoints: data
                        }
                    ],
                    axisX:{
                        title: "Metai",
                        labelAngle: 30,
                        interval: 1,
                        valueFormatString: " "
                    },
                    axisY: {
                        title: "Taškų skaičius, vnt."
                    },
                    toolTip:{   
                        content: "Laimėtojas: {winner} ({y} taškų)"      
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
                    this.state.winnerPoints.length > 0 &&
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