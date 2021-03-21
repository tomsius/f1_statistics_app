import React, { Component } from 'react';
import { DataRangeForm } from '../../DataRangeForm';
import CanvasJSReact from '../../../canvasjs.react';
import { Button, ButtonGroup, ToggleButton } from 'react-bootstrap';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export class RacePositionsChanges extends Component {
    constructor(props) {
        super(props);
        this.state = {
            seasons: [],
            positions: [],
            season: 0,
            round: 0,
            raceName: "",
            isLoading: false
        };

        this.fillData = this.fillData.bind(this);
        this.fillSeasons = this.fillSeasons.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    fillData() {
        this.setState({
            isLoading: true
        });

        fetch('http://localhost:55032/api/misc/' + this.state.season + '/' + this.state.round + '/positionchangesduringrace', 
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(result => {
            this.setState({
                positions: result,
                isLoading: false
            });
        });
    }

    fillSeasons(data) {
        this.setState({
            seasons: data,
        }, () => {
            this.setState({
                positions: []
            })
        });
    }

    handleClick(event) {
        event.preventDefault();

        var args = event.currentTarget.value.split("-");
        var season = args[0];
        var round = args[1];
        var raceName = args[2];

        this.setState({
            season: season,
            round: round,
            raceName: raceName
        }, () => {
            this.fillData();
        });
    }

    render() {
        if (this.state.positions.length > 0) {
            console.log(this.state.positions);
            var data = this.state.positions.map(x => ({ type: "line", name: x.name, showInLegend: true, markerType: "none", dataPoints: x.laps.map(lap => ({ x: lap.lapNumber, y: lap.position })) }));

            var options = {
                title: {
                    text: "Lenktynininkų pozicijų pokyčiai " + this.state.raceName + " metu"
                },
                data: data,
                axisX:{
                    title: "Lenktynių ratas",
                    interval: 5,
                    minimum: 1,
                    gridThickness: 0
                },
                axisY: {
                    title: "Lenktynininko pozicija",
                    interval: 1,
                    minimum: 1,
                    maximum: data.length,
                    reversed: true,
                    gridThickness: 0
                },
                toolTip:{   
                    content: "{name} pozicija {x}-ame rate: {y}"      
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
                <DataRangeForm api={this.props.api} callback={this.fillSeasons} />
                <br />
                {
                    this.state.seasons.length > 0 &&
                    <div>
                        {this.state.seasons.map(x => (
                            <div>
                                <ButtonGroup vertical>
                                    <p style={{margin: "auto"}}>{x.season}</p>
                                    {x.races.map(race => (
                                        <Button
                                            key={x.season + race.round}
                                            variant="secondary"
                                            value={x.season + '-' + race.round + '-' + race.raceName}
                                            onClick={this.handleClick}
                                            disabled={this.state.isLoading}

                                        >
                                            {this.state.isLoading ? "Palaukite..." : race.raceName}
                                        </Button>
                                    ))}
                                </ButtonGroup>
                            </div>
                        ))}
                        <br/>
                        <br/>
                        {this.state.positions.length > 0 &&
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