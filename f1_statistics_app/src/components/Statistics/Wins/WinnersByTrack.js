import React, { Component } from 'react';
import { DataRangeForm } from '../../DataRangeForm';
import CanvasJSReact from '../../../canvasjs.react';
import { Button, ButtonGroup, ToggleButton } from 'react-bootstrap';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export class WinnersByTrack extends Component {
    constructor(props) {
        super(props);
        this.state = {
            winnersByTrack: [],
            selectedTrack: ""
        };

        this.fillData = this.fillData.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    fillData(data) {
        this.setState({
            winnersByTrack: data,
            selectedTrack: ""
        });
    }

    handleClick(event) {
        event.preventDefault();

        this.setState({
            selectedTrack: event.currentTarget.value
        });
    }

    render() {
        var options;
        if (this.state.winnersByTrack.length > 0 && this.state.selectedTrack !== "") {
            var data = this.state.winnersByTrack.filter(x => x.name == this.state.selectedTrack).map(x => x.winners)[0].map(x => ({ label: x.name, y: x.winCount }));
            options = {
                title: {
                    text: "„" + this.state.selectedTrack + "“ trasoje laimėję lenktynininkai"
                },
                axisY: {
                    title: "Laimėjimų skaičius, vnt.",
                    interval: 1,
                    minimum: 0
                },
                axisX: {
                    title: "Lenktynininkas",
                    labelAngle: 30,
                    interval: 1,
                    valueFormatString: " "
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
                    this.state.winnersByTrack.length > 0 &&
                    <div>
                        <ButtonGroup toggle vertical>
                            {this.state.winnersByTrack.map((track) => (
                                <ToggleButton
                                    key={track.name}
                                    type="radio"
                                    variant="secondary"
                                    name="radio"
                                    value={track.name}
                                    checked={this.state.selectedTrack === track.name}
                                    onChange={this.handleClick}
                                >
                                    {track.name}
                                </ToggleButton>
                            ))}
                        </ButtonGroup>
                        <br />
                        <br />
                        {this.state.selectedTrack !== "" &&
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