import React, { Component } from 'react';
import { DataRangeForm } from '../../DataRangeForm';
import CanvasJSReact from '../../../canvasjs.react';
import { Button } from 'react-bootstrap';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export class WinnersByGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            winnersByGrid: []
        };

        this.fillData = this.fillData.bind(this);
    }

    fillData(data) {
        this.setState({
            winnersByGrid: data
        });
    }

    render() {
        if (this.state.winnersByGrid.length > 0) {
            var data = this.state.winnersByGrid.map(x => ({ label: x.gridPosition, y: x.winCount, winnersFromGrid: x.winners.filter((value, index, element) => element.indexOf(value) === index).join(", ") }));
            var maxWins = data[0].y;
            var options;

            options = {
                title: {
                    text: this.props.pageTitle
                },
                toolTip: {
                    content: "Laimėtojai iš {label}-os starto pozicijos (laimėjimų skaičius: {y}): {winnersFromGrid}"
                },
                axisY: {
                    title: "Laimėjimų skaičius, vnt.",
                    interval: maxWins <= 20 ? 1 : maxWins <= 100 ? 5 : 20,
                    minimum: 0
                },
                axisX: {
                    title: "Starto pozicija"
                },
                data: [
                    {
                        type: "column",
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
                    this.state.winnersByGrid.length > 0 &&
                    <div>
                        <div style={{ position: "relative", right: "6em" }}>
                            <CanvasJSChart options={options} />
                        </div>
                    </div>
                }
            </div>
        );
    }
}