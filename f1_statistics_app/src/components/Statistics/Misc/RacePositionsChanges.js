import React, { Component } from 'react';
import { DataRangeForm } from '../../DataRangeForm';
import CanvasJSReact from '../../../canvasjs.react';
import { Button, ButtonGroup, ToggleButton } from 'react-bootstrap';
import { ChartOptionsModal } from '../../ChartOptionsModal';
import { addWatermark, changeExportButtonsLanguage } from '../../../js/utils';

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
            isLoading: false,
            modalShow: false,

            interactivityEnabled: true,
            exportFileName: this.props.pageTitle,
            zoomEnabled: false,
            theme: "light1",
            title: this.props.pageTitle,
            type: "line",

            axisXTitle: "Lenktynių ratas",
            axisXLabelAngle: 0,
            axisXGridThickness: 0,
            axisXMinimum: 1,
            axisXMaximum: '',
            axisXInterval: 5,

            axisYTitle: "Lenktynininko pozicija",
            axisYLabelAngle: 0,
            axisYGridThickness: 1,
            axisYMinimum: 1,
            axisYMaximum: ''
        };

        this.fillData = this.fillData.bind(this);
        this.fillSeasons = this.fillSeasons.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleOptionsChange = this.handleOptionsChange.bind(this);
        this.setDefaultValues = this.setDefaultValues.bind(this);
        this.updateWindowSize = this.updateWindowSize.bind(this);
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
                isLoading: false,
                title: "Lenktynininkų pozicijų pokyčiai " + this.state.season + " " + this.state.raceName + " metu",
                exportFileName: "Lenktynininkų pozicijų pokyčiai " + this.state.season + " " + this.state.raceName + " metu"
            });
        });
    }

    fillSeasons(data) {
        this.setState({
            seasons: data,
        }, () => {
            this.setState({
                positions: [],
                title: "",
                exportFileName: ""
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

    handleOptionsChange(event) {
        const { name, value, checked, type } = event.target;
        var valueToUpdate = type === 'checkbox' ? checked : value;
        
        if (name === 'axisYInterval' || name === 'axisXInterval') {
            valueToUpdate = parseInt(value);
        }

        this.setState({
            [name]: valueToUpdate
        });
    }

    setDefaultValues(callback) {
        this.setState({
            interactivityEnabled: true,
            exportFileName: "Lenktynininkų pozicijų pokyčiai " + this.state.season + " " + this.state.raceName + " metu",
            zoomEnabled: false,
            theme: "light1",
            title: "Lenktynininkų pozicijų pokyčiai " + this.state.season + " " + this.state.raceName + " metu",
            type: "line",

            axisXTitle: "Lenktynių ratas",
            axisXLabelAngle: 0,
            axisXGridThickness: 0,
            axisXMinimum: 1,
            axisXMaximum: '',
            axisXInterval: 5,

            axisYTitle: "Lenktynininko pozicija",
            axisYLabelAngle: 0,
            axisYGridThickness: 1,
            axisYMinimum: 1,
            axisYMaximum: ''
        }, () => {
            callback();
        });
    }

    updateWindowSize() {
        this.setState({
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight
        });
    }

    componentDidUpdate() {
        addWatermark();
        changeExportButtonsLanguage();
    }

    componentDidMount() {
        window.addEventListener('resize', this.updateWindowSize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowSize);
    }

    render() {
        if (this.state.positions.length > 0) {
            var data = this.state.positions.map(x => ({ type: "line", name: x.name, showInLegend: true, markerType: "none", dataPoints: x.laps.map(lap => ({ x: lap.lapNumber, y: lap.position })) }));

            if (this.state.axisYMaximum === '') {
                var defaultYMaximum = data.length;
            }

            if (this.state.axisXMaximum === '') {
                var defaultXMaximum = this.state.positions[0].laps.length;
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
                    minimum: this.state.axisXMinimum,
                    maximum: this.state.axisXMaximum !== '' ? this.state.axisXMaximum : defaultXMaximum,
                    interval: this.state.axisXInterval,
                    gridThickness: this.state.axisXGridThickness
                },
                axisY: {
                    title: this.state.axisYTitle,
                    minimum: this.state.axisYMinimum,
                    maximum: this.state.axisYMaximum !== '' ? this.state.axisYMaximum : defaultYMaximum,
                    interval: 1,
                    labelAngle: this.state.axisYLabelAngle,
                    gridThickness: this.state.axisYGridThickness,
                    reversed: true,
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
                }
            };
        }

        return (
            <div>
                <h1>{this.props.pageTitle}</h1>
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
                                            {race.raceName}
                                        </Button>
                                    ))}
                                </ButtonGroup>
                            </div>
                        ))}
                        <br/>
                        <br/>
                        {this.state.positions.length > 0 &&
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
                                setdefaultvalues={this.setDefaultValues}
                                title={this.state.title}
                                exportfilename={this.state.exportFileName}
                                interactivityenabled={this.state.interactivityEnabled ? 1 : 0}
                                themes={[{value: "light1", content: "Light1"}, {value: "light2", content: "Light2"}, {value: "dark1", content: "Dark1"}, {value: "dark2", content: "Dark2"}]}
                                currenttheme={this.state.theme}
                                types={[{type: "line", name: "Linijinė"}]}
                                currenttype={this.state.type}
                                axisxtitle={this.state.axisXTitle}
                                axisxlabelangle={this.state.axisXLabelAngle}
                                axisxgridthickness={this.state.axisXGridThickness}
                                axisxminimum={this.state.axisXMinimum}
                                axisxmaximum={this.state.axisXMaximum !== '' ? this.state.axisXMaximum : defaultXMaximum}
                                axisxinterval={this.state.axisXInterval}
                                axisytitle={this.state.axisYTitle}
                                axisylabelangle={this.state.axisYLabelAngle}
                                axisygridthickness={this.state.axisYGridThickness}
                                axisyminimum={this.state.axisYMinimum}
                                axisymaximum={this.state.axisYMaximum !== '' ? this.state.axisYMaximum : defaultYMaximum}
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