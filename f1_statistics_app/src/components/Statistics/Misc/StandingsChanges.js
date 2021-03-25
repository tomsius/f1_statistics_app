import React, { Component } from 'react';
import { DataRangeForm } from '../../DataRangeForm';
import CanvasJSReact from '../../../canvasjs.react';
import { Button, ButtonGroup, ToggleButton } from 'react-bootstrap';
import { ChartOptionsModal } from '../../ChartOptionsModal';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export class StandingsChanges extends Component {
    constructor(props) {
        super(props);
        this.state = {
            standings: [],
            selectedSeason: 0,
            modalShow: false,

            interactivityEnabled: true,
            exportFileName: this.props.pageTitle,
            zoomEnabled: false,
            theme: "light1",
            title: this.props.pageTitle,
            type: "line",

            axisXTitle: "Lenktynės",
            axisXLabelAngle: -90,
            axisXGridThickness: 1,

            axisYTitle: "Vieta čempionate",
            axisYLabelAngle: 0,
            axisYGridThickness: 0,
            axisYMinimum: 1,
            axisYMaximum: '',
            axisYInterval: 1
        };

        this.fillData = this.fillData.bind(this);
        this.handleSeasonChangeClick = this.handleSeasonChangeClick.bind(this);
        this.handleOptionsChange = this.handleOptionsChange.bind(this);
    }

    fillData(data) {
        this.setState({
            standings: data,
            selectedSeason: 0,
            title: ""
        });
    }

    handleSeasonChangeClick(event) {
        event.preventDefault();

        this.setState({
            selectedSeason: event.currentTarget.value,
            title: this.props.pageTitle + " " + event.currentTarget.value + " metais"
        });
    }

    handleOptionsChange(event) {
        const { name, value, checked, type } = event.target;
        var valueToUpdate = type === 'checkbox' ? checked : value;
        
        if (name === 'axisYInterval') {
            valueToUpdate = parseInt(value);
        }

        this.setState({
            [name]: valueToUpdate
        });
    }

    componentDidUpdate() {
        var canvas = document.getElementsByTagName("canvas")[0];
        
        if (canvas) {
            var context = canvas.getContext("2d");
            context.fillStyle = "grey";
            context.font = "12px verdana";
            var text = "Lenktynių rezultatų portalas";
            context.fillText(text, 10, canvas.height - 15);
        }
    }

    render() {
        if (this.state.standings.length > 0 && this.state.selectedSeason !== 0) {
            var data = this.state.standings.filter(x => x.season == this.state.selectedSeason)[0].standings.map(x => ({ type: this.state.type, name: x.name, markerType: "none", showInLegend: true, dataPoints: x.rounds.map(round => ({ x: round.round, label: round.roundName, y: round.position, points: round.points })) }));

            if (this.state.axisYMaximum === '') {
                var defaultMaximum = data.length;
            }

            var options = {
                interactivityEnabled: this.state.interactivityEnabled,
                exportFileName: this.state.exportFileName,
                exportEnabled: true,
                zoomEnabled: this.state.zoomEnabled,
                zoomType: "x",
                theme: this.state.theme,
                title: {
                    text: this.state.title
                },
                data: data,
                axisX: {
                    title: this.state.axisXTitle,
                    labelAngle: this.state.axisXLabelAngle,
                    interval: 1,
                    gridThickness: this.state.axisXGridThickness,
                    labelMaxWidth: 80,
                    labelWrap: true,
                },
                axisY: {
                    title: this.state.axisYTitle,
                    minimum: this.state.axisYMinimum,
                    maximum: this.state.axisYMaximum !== '' ? this.state.axisYMaximum : defaultMaximum,
                    interval: this.state.axisYInterval,
                    labelAngle: this.state.axisYLabelAngle,
                    gridThickness: this.state.axisYGridThickness,
                    reversed: true
                },
                toolTip:{   
                    content: "{name} (taškų skaičius - {points}): {y}"  
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
                        <div>
                            <Button variant="primary" onClick={() => this.setState({modalShow: true})}>
                                Keisti grafiko parinktis
                            </Button>
                            <ChartOptionsModal 
                                animation={false}
                                size="lg"
                                show={this.state.modalShow} 
                                onHide={() => this.setState({modalShow: false})} 
                                handleoptionschange={this.handleOptionsChange} 
                                title={this.state.title}
                                exportfilename={this.state.exportFileName}
                                interactivityenabled={this.state.interactivityEnabled ? 1 : 0}
                                themes={[{value: "light1", content: "Light1"}, {value: "light2", content: "Light2"}, {value: "dark1", content: "Dark1"}, {value: "dark2", content: "Dark2"}]}
                                currenttheme={this.state.theme}
                                types={[{type: "line", name: "Linijinė"}]}
                                currenttype={this.state.type}
                                //zoomenabled={this.state.zoomEnabled ? 1 : 0}
                                axisxtitle={this.state.axisXTitle}
                                axisxlabelangle={this.state.axisXLabelAngle}
                                axisxgridthickness={this.state.axisXGridThickness}
                                axisytitle={this.state.axisYTitle}
                                axisylabelangle={this.state.axisYLabelAngle}
                                axisygridthickness={this.state.axisYGridThickness}
                                //axisyminimum={this.state.axisYMinimum}
                                //axisymaximum={this.state.axisYMaximum !== '' ? this.state.axisYMaximum : defaultMaximum}
                                //axisyinterval={this.state.axisYInterval}
                            />
                            <br />
                            <br />
                            <div style={{ position: "relative", right: "6em" }}>
                                <CanvasJSChart options={options} />
                            </div>
                        </div>}
                    </div>
                }
            </div>
        );
    }
}