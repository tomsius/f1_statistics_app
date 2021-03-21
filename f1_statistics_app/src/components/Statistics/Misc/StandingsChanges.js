import React, { Component } from 'react';
import { DataRangeForm } from '../../DataRangeForm';
import CanvasJSReact from '../../../canvasjs.react';
import { Button, ButtonGroup, ToggleButton } from 'react-bootstrap';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export class StandingsChanges extends Component {
    constructor(props) {
        super(props);
        this.state = {
            standings: [],
            selectedSeason: 0
        };

        this.fillData = this.fillData.bind(this);
        this.handleSeasonChangeClick = this.handleSeasonChangeClick.bind(this);
    }

    fillData(data) {
        this.setState({
            standings: data,
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
        if (this.state.standings.length > 0 && this.state.selectedSeason !== 0) {
            var data = this.state.standings.filter(x => x.season == this.state.selectedSeason)[0].standings.map(x => ({ type: "line", name: x.name, showInLegend: true, dataPoints: x.rounds.map(round => ({ x: round.round, y: round.position })) }));

            var options = {
                title: {
                    text: this.props.pageTitle + " " + this.state.selectedSeason + " metais"
                },
                data: data,
                axisX:{
                    title: "Lenktynių numeris sezone",
                    interval: 1,
                    minimum: 1
                },
                axisY: {
                    title: "Vieta čempionate",
                    interval: 1,
                    minimum: 1,
                    maximum: data.length,
                    reversed: true
                },
                toolTip:{   
                    content: "{name}: {y}"      
                },
                legend: {
                    cursor: "pointer",
                    itemclick: function (e) {
                        if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                            e.dataSeries.visible = false;
                        } else {
                            e.dataSeries.visible = true;
                        }
        
                        e.chart.render();
                    },
                    horizontalAlign: "center",
                     verticalAlign: "top"
                },
            };
        }

        return (
            <div>
                <h2>{this.props.pageTitle}</h2>
                <br />
                <DataRangeForm api={this.props.api} callback={this.fillData} />
                <br />
                {
                    this.state.standings.length > 0 &&
                    <div>
                        <ButtonGroup toggle vertical>
                            {this.state.standings.map(x => (
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