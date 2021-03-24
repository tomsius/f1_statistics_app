import React, { Component } from 'react';
import { DataRangeForm } from '../../DataRangeForm';
import CanvasJSReact from '../../../canvasjs.react';
import { Button } from 'react-bootstrap';
import { Export } from '../../Export';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export class RaceCount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            races: [],
            isBarChart: true,
            isVisible: false
        };

        this.fillData = this.fillData.bind(this);
    }

    fillData(data) {
        this.setState({
            races: data
        });
    }

    render() {
        if (this.state.races.length > 0) {
            var data = this.state.races.map(x => ({ label: x.season, y: x.raceCount }));
            
            var options = {
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
                    interval: 1,
                    valueFormatString: " "
                },
                axisY: {
                    title: "Lenktynių skaičius, vnt.",
                    interval: 1
                },
                toolTip:{   
                    content: "{label}: {y}"      
                }
            };
        }

        return (
            <div>
                <h2>{this.props.pageTitle}</h2>
                <br />
                <DataRangeForm api={this.props.api} callback={this.fillData} />
                <br />
                {
                    this.state.races.length > 0 &&
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