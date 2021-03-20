import React, { Component } from 'react';
import { DataRangeForm } from '../../DataRangeForm';
import CanvasJSReact from '../../../canvasjs.react';
import { Button, ButtonGroup, ToggleButton } from 'react-bootstrap';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export class PositionDifferences extends Component {
    constructor(props) {
        super(props);
        this.state = {
            seasonDifferences: [],
            selectedSeason: 0
        };

        this.fillData = this.fillData.bind(this);
        this.handleSeasonChangeClick = this.handleSeasonChangeClick.bind(this);
    }

    fillData(data) {
        this.setState({
            seasonDifferences: data,
            selectedSeason: 0
        });
    }

    handleSeasonChangeClick(event) {
        event.preventDefault();

        this.setState({
            selectedSeason: event.currentTarget.value
        });
    }

    render() {
        if (this.state.seasonDifferences.length > 0 && this.state.selectedSeason !== 0) {
            console.log(this.state.seasonDifferences.filter(x => x.season == this.state.selectedSeason));
            var data = this.state.seasonDifferences.filter(x => x.season == this.state.selectedSeason).map(x => x.positionChanges)[0].map(x => ({ label: x.name, y: x.positionChange }));

            var options = {
                title: {
                    text: this.props.pageTitle + " " + this.state.selectedSeason + " metais"
                },
                data: [
                    {
                        type: "column",
                        dataPoints: data
                    }
                ],
                axisX:{
                    title: "Lenktynininkas",
                    labelAngle: 30,
                    interval: 1
                },
                axisY: {
                    title: "Pozicijų pokytis, vnt."
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
                    this.state.seasonDifferences.length > 0 &&
                    <div>
                        <ButtonGroup toggle vertical>
                            {this.state.seasonDifferences.map(x => (
                                <ToggleButton
                                    key={x.season}
                                    type="radio"
                                    variant="secondary"
                                    name="radio"
                                    value={x.season}
                                    checked={this.state.selectedSeason === x.season}
                                    onChange={this.handleSeasonChangeClick}
                                >
                                    {x.season}
                                </ToggleButton>
                            ))}
                        </ButtonGroup>
                        <br/>
                        <br/>
                        {this.state.selectedSeason !== 0 &&
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