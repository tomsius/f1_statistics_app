import React, { Component } from 'react';
import { DataRangeForm } from '../../DataRangeForm';
import CanvasJSReact from '../../../canvasjs.react';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export class WinnersPercent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            winnersPercent: []
        };

        this.fillData = this.fillData.bind(this);
    }

    fillData(data) {
        this.setState({
            winnersPercent: data
        });
    }

    render() {
        var data = this.state.winnersPercent.filter(x => x.averageWins > 0).map(x => ({ label: x.name, y: x.averageWins }));
        const options = {
            title: {
                text: this.props.pageTitle
            },
            toolTip: {
                content: "{label}: {y}%"
            },
            data: [
                {
                    type: "column",
                    dataPoints: data
                }
            ],
            axisX: {
                title: this.props.axisName,
                labelAngle: 30,
                interval: 1
            },
            axisY: {
                title: "Laimėjimų procentas, %"
            },
        };

        return (
            <div>
                <h2>{this.props.pageTitle}</h2>
                <br />
                <DataRangeForm api={this.props.api} callback={this.fillData} />
                <br />
                {
                    this.state.winnersPercent.length > 0 &&
                    <div style={{ position: "relative", right: "6em" }}>
                        <CanvasJSChart options={options} />
                    </div>
                }
            </div>
        );
    }
}