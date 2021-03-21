import React, { Component } from 'react';
import { DataRangeForm } from '../../DataRangeForm';
import CanvasJSReact from '../../../canvasjs.react';
import { Button, ButtonGroup, ToggleButton } from 'react-bootstrap';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export class DriversFinishingPositions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            finishingPositions: [],
            selectedDriver: ""
        };

        this.fillData = this.fillData.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    fillData(data) {
        this.setState({
            finishingPositions: data,
            selectedDriver: ""
        });
    }

    handleClick(event) {
        event.preventDefault();

        this.setState({
            selectedDriver: event.currentTarget.value
        });
    }

    render() {
        var options;
        if (this.state.finishingPositions.length > 0 && this.state.selectedDriver !== "") {
            var data = this.state.finishingPositions.filter(x => x.name == this.state.selectedDriver).map(x => x.finishingPositions)[0].map(x => ({ label: x.finishingPosition, y: x.count }));
            var maxCount = Math.max.apply(Math, data.map(data => data.y));
            
            options = {
                title: {
                    text: this.state.selectedDriver + " finišavimo pozicijos"
                },
                axisY: {
                    title: "Finišavimo skaičius, vnt.",
                    interval: maxCount >= 25 ? 5 : 1,
                    minimum: 0
                },
                axisX: {
                    title: "Finišavimo pozicija",
                    interval: 1,
                    valueFormatString: " "
                },
                data: [
                    {
                        type: "column",
                        dataPoints: data
                    }
                ],
                toolTip: {
                    content: "Finišavimo skaičius {label}-oje pozicijoje: {y}"
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
                    this.state.finishingPositions.length > 0 &&
                    <div>
                        <ButtonGroup toggle vertical>
                            {this.state.finishingPositions.map((driver) => (
                                <ToggleButton
                                    key={driver.name}
                                    type="radio"
                                    variant="secondary"
                                    name="radio"
                                    value={driver.name}
                                    checked={this.state.selectedDriver === driver.name}
                                    onChange={this.handleClick}
                                >
                                    {driver.name}
                                </ToggleButton>
                            ))}
                        </ButtonGroup>
                        <br />
                        <br />
                        {this.state.selectedDriver !== "" &&
                            <div style={{ position: "relative", right: "6em" }}>
                                <CanvasJSChart options={options} />
                            </div>
                        }
                    </div>
                }
            </div>
        );
    }
}