import React, { Component } from 'react';
import { DataRangeForm } from '../../DataRangeForm';
import CanvasJSReact from '../../../canvasjs.react';
import { Button } from 'react-bootstrap';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export class WinnersUnique extends Component {
    constructor(props) {
        super(props);
        this.state = {
            winnersUnique: [],
            isBarChart: true
        };

        this.fillData = this.fillData.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    fillData(data) {
        this.setState({
            winnersUnique: data
        });
    }

    handleClick() {
        var newChart = !this.state.isBarChart;

        this.setState({
            isBarChart: newChart
        });
    }

    render() {
        var data = this.state.winnersUnique.map(x => ({ label: x.season, y: x.uniqueWinnersCount, winners: x.winners.join(", ") }));
        var options;

        if (this.state.isBarChart) {
            options = {
                toolTip: {
                    content: "Winners: {winners}"
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
                    content: "Winners: {winners}"
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
                <DataRangeForm api={this.props.api} callback={this.fillData} />
                <br />
                {
                    this.state.winnersUnique.length > 0 &&
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