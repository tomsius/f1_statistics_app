import React, { Component } from 'react';
import { DataRangeForm } from '../../DataRangeForm';
import CanvasJSReact from '../../../canvasjs.react';
import { Button } from 'react-bootstrap';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export class PodiumFinishers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            podiumFinishers: []
        };

        this.fillData = this.fillData.bind(this);
        this.calculateTotalPodiums = this.calculateTotalPodiums.bind(this);
    }

    fillData(data) {
        this.setState({
            podiumFinishers: data
        });
    }

    render() {
        if (this.state.podiumFinishers.length > 0) {
            var data = this.state.podiumFinishers.map(x => ({ label: x.name, y: x.podiumCount }));
            
            var options = {
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
                        title: "Podiumų skaičius, vnt."
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
                    this.state.podiumFinishers.length > 0 &&
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