import React, { Component } from 'react';
import { DataRangeForm } from '../../DataRangeForm';
import CanvasJSReact from '../../../canvasjs.react';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export class DriverWins extends Component {
    constructor(props) {
        super(props);
        this.state = {
            winners: []
        };

        this.fillData = this.fillData.bind(this);
    }

    fillData(data) {
        this.setState({
            winners: data
        });
    }

    render() {
        var data = this.state.winners.map(x => ({label: x.name, y: x.winCount}));

        const options = {
            data: [
                {
                    type: "column",
                    dataPoints: data
                }
            ]
        };

        const options2 = {
            data: [
                {
                    type: "pie",
                    indexLabel: "{label} {y}",
                    dataPoints: data
                }
            ]
        };

        return (
            <div>
                <h2>{this.props.pageTitle}</h2>
                <p style={{color:"red", textAlign:"center"}}>*Papildomai pridėti pie chart</p>
                <br />
                <DataRangeForm api={this.props.api} callback={this.fillData} />
                <br />
                {
                    this.state.winners.length > 0 &&
                    <div style={{position:"relative", right:"6em"}}>
                        <CanvasJSChart options={options} />
                        <br />
                        <CanvasJSChart options={options2} />
                    </div>
                }
            </div>
        );
    }
}