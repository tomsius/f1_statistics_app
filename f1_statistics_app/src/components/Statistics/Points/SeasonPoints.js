import React, { Component } from 'react';
import { DataRangeForm } from '../../DataRangeForm';
import CanvasJSReact from '../../../canvasjs.react';
import { Button, ButtonGroup, ToggleButton } from 'react-bootstrap';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export class SeasonPoints extends Component {
    constructor(props) {
        super(props);
        this.state = {
            seasonPoints: [],
            isBarChart: true,
            isVisible: false,
            selectedSeason: 0
        };

        this.fillData = this.fillData.bind(this);
        this.handleChartChangeClick = this.handleChartChangeClick.bind(this);
        this.handleSeasonChangeClick = this.handleSeasonChangeClick.bind(this);
    }

    fillData(data) {
        this.setState({
            seasonPoints: data,
            selectedSeason: 0
        });
    }

    handleChartChangeClick() {
        var newChart = !this.state.isBarChart;

        this.setState({
            isBarChart: newChart
        });
    }

    handleSeasonChangeClick(event) {
        event.preventDefault();

        this.setState({
            selectedSeason: event.currentTarget.value
        });
    }

    render() {
        if (this.state.seasonPoints.length > 0 && this.state.selectedSeason !== 0) {
            var data = this.state.seasonPoints.filter(x => x.season == this.state.selectedSeason).map(x => x.scoredPoints)[0].map(x => ({ label: x.name, y: x.points }));
            data = data.map(x => ({ label: x.label, y: x.y, percentage: Math.round((x.y / this.state.seasonPoints.filter(x => x.season == this.state.selectedSeason)[0].totalPoints * 100) * 100) / 100 }));

            var options;

            if (this.state.isBarChart) {
                options = {
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
                        title: this.props.axisName,
                        labelAngle: 30,
                        interval: 1
                    },
                    axisY: {
                        title: "Taškų skaičius, vnt.",
                        interval: 50
                    },
                    toolTip:{   
                        content: "{label}: {y}"      
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
                            type: "pie",
                            indexLabel: "{label} {y}",
                            dataPoints: data
                        }
                    ],
                    toolTip:{   
                        content: "{label}: {percentage}%"      
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
                    this.state.seasonPoints.length > 0 &&
                    <div>
                        <ButtonGroup toggle vertical>
                            {this.state.seasonPoints.map(x => (
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
                            <div>
                                 <Button variant="primary" onClick={this.handleChartChangeClick} disabled={this.state.isVisible}>
                                    {this.state.isBarChart ? "Rodyti skritulinę diagramą" : "Rodyti stulpelinę diagramą"}
                                </Button>
                                <br />
                                <br />
                                <div style={{ position: "relative", right: "6em" }}>
                                    <CanvasJSChart options={options} />
                                </div>
                            </div>
                        }
                    </div>
                }
            </div>
        );
    }
}