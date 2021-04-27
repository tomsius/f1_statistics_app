import React, { Component } from 'react';
import { DataRangeForm } from '../../DataRangeForm';
import CanvasJSReact from '../../../canvasjs.react';
import { Button, ButtonGroup, Dropdown, DropdownButton } from 'react-bootstrap';
import { ChartOptionsModal } from '../../ChartOptionsModal';
import { addWatermark, changeExportButtonsLanguage, getApi } from '../../../js/utils';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

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
            axisYMaximum: '',

            titleFont: "Calibri",
            axisXFont: "Calibri",
            axisYFont: "Calibri"
        };

        this.fillData = this.fillData.bind(this);
        this.fillSeasons = this.fillSeasons.bind(this);
        this.handleRaceChangeClick = this.handleRaceChangeClick.bind(this);
        this.handleOptionsChange = this.handleOptionsChange.bind(this);
        this.setDefaultValues = this.setDefaultValues.bind(this);
        this.updateWindowSize = this.updateWindowSize.bind(this);
    }

    fillData() {
        this.setState({
            isLoading: true
        });

        fetch(getApi() + 'misc/' + this.state.season + '/' + this.state.round + '/positionchangesduringrace',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                else {
                    toastr.options = {
                        "closeButton": false,
                        "debug": false,
                        "newestOnTop": false,
                        "positionClass": "toast-bottom-full-width",
                        "preventDuplicates": true,
                        "hideDuration": "1000",
                        "timeOut": "3000",
                        "showEasing": "swing",
                        "hideEasing": "linear",
                        "showMethod": "fadeIn",
                        "hideMethod": "fadeOut"
                    };
                    
                    response.json().then(message => toastr["error"]("", message));

                    const error = new Error();
                    error.name = "InputError";
    
                    throw error;
                }
            })
            .then(result => {
                this.setState({
                    positions: result,
                    isLoading: false,
                    title: "Lenktynininkų pozicijų pokyčiai " + this.state.season + " " + this.state.raceName + " metu",
                    exportFileName: "Lenktynininkų pozicijų pokyčiai " + this.state.season + " " + this.state.raceName + " metu"
                });
            })
            .catch(error => {
                this.setState({
                    isLoading: false
                });

                toastr.options = {
                    "closeButton": false,
                    "debug": false,
                    "newestOnTop": false,
                    "positionClass": "toast-bottom-full-width",
                    "preventDuplicates": true,
                    "hideDuration": "1000",
                    "timeOut": "3000",
                    "showEasing": "swing",
                    "hideEasing": "linear",
                    "showMethod": "fadeIn",
                    "hideMethod": "fadeOut"
                };

                if (error.name !== "InputError") {
                    toastr["error"]("", "Nepavyko pasiekti serverio");
                }
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

    handleRaceChangeClick(eventKey, event) {
        event.preventDefault();

        var args = eventKey.split("-");
        var season = parseInt(args[0]);
        var round = parseInt(args[1]);
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
            axisYMaximum: '',

            titleFont: "Calibri",
            axisXFont: "Calibri",
            axisYFont: "Calibri"
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
                var defaultXMaximum = Math.max.apply(Math, this.state.positions.map(x => x.laps.length));
            }

            var options = {
                interactivityEnabled: this.state.interactivityEnabled,
                exportFileName: this.state.exportFileName,
                exportEnabled: true,
                zoomEnabled: this.state.zoomEnabled,
                zoomType: "x",
                theme: this.state.theme,
                title: {
                    text: this.state.title,
                    fontFamily: this.state.titleFont
                },
                data: data,
                axisX: {
                    title: this.state.axisXTitle,
                    labelAngle: this.state.axisXLabelAngle,
                    minimum: this.state.axisXMinimum,
                    maximum: this.state.axisXMaximum !== '' ? this.state.axisXMaximum : defaultXMaximum,
                    interval: this.state.axisXInterval,
                    gridThickness: this.state.axisXGridThickness,
                    titleFontFamily: this.state.axisXFont,
                    labelFontFamily: this.state.axisXFont
                },
                axisY: {
                    title: this.state.axisYTitle,
                    minimum: this.state.axisYMinimum,
                    maximum: this.state.axisYMaximum !== '' ? this.state.axisYMaximum : defaultYMaximum,
                    interval: 1,
                    labelAngle: this.state.axisYLabelAngle,
                    gridThickness: this.state.axisYGridThickness,
                    reversed: true,
                    titleFontFamily: this.state.axisYFont,
                    labelFontFamily: this.state.axisYFont
                },
                toolTip: {
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
                        {this.state.seasons.map(season => (
                                <ButtonGroup key={season.year} style={{padding: "0px"}}>
                                    <DropdownButton as={ButtonGroup} title={season.year} id="bg-nested-dropdown" onSelect={this.handleRaceChangeClick} variant="secondary" style={{padding: "10px"}}>
                                        {season.races.map((race, index) => {
                                            if (season.year === this.state.season && race.round === this.state.round && race.raceName === this.state.raceName) {
                                                return <Dropdown.Item key={index} eventKey={season.year + '-' + race.round + '-' + race.raceName} active disabled={this.state.isLoading}>
                                                    {race.raceName}
                                                </Dropdown.Item>
                                            }
                                            else {
                                                return <Dropdown.Item key={index} eventKey={season.year + '-' + race.round + '-' + race.raceName} disabled={this.state.isLoading}>
                                                    {race.raceName}
                                                </Dropdown.Item>
                                            }
                                        })}
                                    </DropdownButton>
                                </ButtonGroup>
                        ))}
                        <br />
                        <br />
                        {this.state.positions.length > 0 &&
                            <div>
                                <Button variant="primary" onClick={() => this.setState({ modalShow: true })}>
                                    Keisti grafiko parinktis
                            </Button>
                                <ChartOptionsModal
                                    animation={false}
                                    size="lg"
                                    show={this.state.modalShow}
                                    onHide={() => this.setState({ modalShow: false })}
                                    handleoptionschange={this.handleOptionsChange}
                                    setdefaultvalues={this.setDefaultValues}
                                    title={this.state.title}
                                    exportfilename={this.state.exportFileName}
                                    interactivityenabled={this.state.interactivityEnabled ? 1 : 0}
                                    themes={[{ value: "light1", content: "Light1" }, { value: "light2", content: "Light2" }, { value: "dark1", content: "Dark1" }, { value: "dark2", content: "Dark2" }]}
                                    currenttheme={this.state.theme}
                                    types={[{ type: "line", name: "Linijinė" }]}
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
                                    fonts={["Calibri", "Optima", "Candara", "Verdana", "Geneva"]}
                                    currenttitlefont={this.state.titleFont}
                                    currentaxisxfont={this.state.axisXFont}
                                    currentaxisyfont={this.state.axisYFont}
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