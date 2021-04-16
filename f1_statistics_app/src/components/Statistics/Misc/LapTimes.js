import React, { Component } from 'react';
import { DataRangeForm } from '../../DataRangeForm';
import CanvasJSReact from '../../../canvasjs.react';
import { Button, ButtonGroup, Dropdown, DropdownButton } from 'react-bootstrap';
import { ChartOptionsModal } from '../../ChartOptionsModal';
import { DataOptionsModal } from '../../DataOptionsModal';
import { addWatermark, changeExportButtonsLanguage } from '../../../js/utils';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export class LapTimes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            seasons: [],
            lapTimes: [],
            season: 0,
            round: 0,
            raceName: "",
            isLoading: false,
            chartOptionsModalShow: false,
            dataOptionsModalShow: false,

            interactivityEnabled: true,
            exportFileName: this.props.pageTitle,
            zoomEnabled: false,
            theme: "light1",
            title: this.props.pageTitle,
            type: "scatter",

            axisXTitle: "Lenktynininkas",
            axisXLabelAngle: -90,
            axisXGridThickness: 0,

            axisYTitle: "Laikas, s",
            axisYLabelAngle: 0,
            axisYGridThickness: 1,
            axisYMinimum: 50,
            axisYMaximum: '',
            axisYInterval: 10,

            titleFont: "Calibri",
            axisXFont: "Calibri",
            axisYFont: "Calibri",

            medianAnomalyExclusion: ''
        };

        this.fillData = this.fillData.bind(this);
        this.fillSeasons = this.fillSeasons.bind(this);
        this.handleRaceChangeClick = this.handleRaceChangeClick.bind(this);
        this.handleOptionsChange = this.handleOptionsChange.bind(this);
        this.setDefaultValues = this.setDefaultValues.bind(this);
        this.setDefaultDataFilters = this.setDefaultDataFilters.bind(this);
        this.filterData = this.filterData.bind(this);
        this.updateWindowSize = this.updateWindowSize.bind(this);
        this.formatTime = this.formatTime.bind(this);
        this.findQuartile = this.findQuartile.bind(this);
        this.findMinimum = this.findMinimum.bind(this);
        this.findMaximum = this.findMaximum.bind(this);
        this.findDefaultMaximumDifference = this.findDefaultMaximumDifference.bind(this);
    }

    fillData() {
        this.setState({
            isLoading: true
        });

        fetch('http://localhost:55032/api/misc/' + this.state.season + '/' + this.state.round + '/laptimes',
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
                    lapTimes: result,
                    isLoading: false,
                    title: "Lenktynininkų apvažiuotų ratų laikai " + this.state.season + " " + this.state.raceName + " metu",
                    exportFileName: "Lenktynininkų apvažiuotų ratų laikai " + this.state.season + " " + this.state.raceName + " metu"
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

                toastr["error"]("", "Nepavyko pasiekti serverio");
            });
    }

    fillSeasons(data) {
        this.setState({
            seasons: data,
        }, () => {
            this.setState({
                lapTimes: [],
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

        if (name === 'axisYInterval' || name === 'medianAnomalyExclusion') {
            valueToUpdate = parseInt(value);
        }

        this.setState({
            [name]: valueToUpdate
        });
    }

    setDefaultValues(callback) {
        this.setState({
            interactivityEnabled: true,
            exportFileName: "Lenktynininkų apvažiuotų ratų laikai " + this.state.season + " " + this.state.raceName + " metu",
            zoomEnabled: false,
            theme: "light1",
            title: "Lenktynininkų apvažiuotų ratų laikai " + this.state.season + " " + this.state.raceName + " metu",
            type: "scatter",

            axisXTitle: "Lenktynininkas",
            axisXLabelAngle: -90,
            axisXGridThickness: 0,

            axisYTitle: "Laikas, s",
            axisYLabelAngle: 0,
            axisYGridThickness: 1,
            axisYMinimum: 50,
            axisYMaximum: '',
            axisYInterval: 10,

            titleFont: "Calibri",
            axisXFont: "Calibri",
            axisYFont: "Calibri"
        }, () => {
            callback();
        });
    }

    setDefaultDataFilters(callback) {
        this.setState({
            medianAnomalyExclusion: ''
        }, () => callback());
    }

    filterData(data) {
        var filteredData = JSON.parse(JSON.stringify(data));

        if (this.state.medianAnomalyExclusion !== '') {
            filteredData.forEach(driver => {
                var median = this.findQuartile(driver.timings, 0.5);
                var maximumTiming = median + this.state.medianAnomalyExclusion;

                driver.timings = driver.timings.filter(timing => timing <= maximumTiming);
            });
        }

        return filteredData;
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

    formatTime(timing) {
        var minutes = Math.floor(timing / 60);
        var seconds = Math.round((timing - 60 * minutes) * 1000) / 1000;

        if (seconds > 10) {
            var time = minutes + ":" + seconds;
        }
        else {
            var time = minutes + ":0" + seconds;
        }

        var decimalNumber = time.split(".")[1] !== undefined ? time.split(".")[1] : "";

        if (decimalNumber === "") {
            time += ".";
        }

        for (let i = decimalNumber.length; i < 3; i++) {
            time += "0";
        }

        return time;
    }

    findQuartile(data, q) {
        var medianIndex = Math.floor(data.length / 2);
        
        switch (q) {
            case 0.25:
                if (data.length % 2 === 0) {
                    return this.findMedian(data, 0, medianIndex - 1);
                }
                else {
                    return this.findMedian(data, 0, medianIndex);
                }
            case 0.5:
                return this.findMedian(data, 0, data.length - 1);
            case 0.75:
                if (data.length % 2 === 0) {
                    return this.findMedian(data, medianIndex, data.length - 1);
                }
                else {
                    return this.findMedian(data, medianIndex, data.length - 1);
                }
            default:
                break;
        }
    }

    findMedian(data, startIndex, endIndex) {
        var index = Math.floor((endIndex - startIndex + 1) / 2) + startIndex;

        if (index % 2 === 0) {
            var result = (data[index - 1] + data[index]) / 2;
        }
        else {
            var result = data[index];
        }
        
        return result;
    }

    findMinimum(data) {
        var minimum = 999;

        for (let i = 0; i < data.length; i++) {
            if (minimum > data[i]) {
                minimum = data[i];
            }
        }

        return minimum;
    }

    findMaximum(data) {
        var maximum = -1;

        for (let i = 0; i < data.length; i++) {
            if (maximum < data[i]) {
                maximum = data[i];
            }
        }

        return maximum;
    }

    findDefaultMaximumDifference(data) {
        var maximum = -1;

        data.forEach(driver => {
            var median = this.findQuartile(driver.timings, 0.5);
            var timingsMaximum = this.findMaximum(driver.timings);

            var difference = timingsMaximum - median;

            if (maximum < difference) {
                maximum = difference;
            }
        });

        return maximum;
    }

    render() {
        if (this.state.lapTimes.length > 0) {
            var filteredData = this.filterData(this.state.lapTimes);

            if (this.state.type === "scatter") {
                var data = filteredData.map((x, index) => ({ type: "scatter", dataPoints: x.timings.map(timing => ({ label: x.name, x: index + 1, y: timing, laptime: this.formatTime(timing) })) }));

                if (this.state.axisYMaximum === '') {
                    var defaultYMaximum = -1;
                    for (let i = 0; i < data.length; i++) {
                        for (let j = 0; j < data[i].dataPoints.length; j++) {
                            if (defaultYMaximum < data[i].dataPoints[j].y) {
                                defaultYMaximum = data[i].dataPoints[j].y;
                            }
                        }
                    }
                }
            }
            else {
                var data = filteredData.map((x, index) => ({ type: "boxAndWhisker", dataPoints: [({ label: x.name, x: index + 1, y: [this.findMinimum(x.timings), this.findQuartile(x.timings, 0.25), this.findQuartile(x.timings, 0.75), this.findMaximum(x.timings), this.findQuartile(x.timings, 0.5)] })] }));
               
                if (this.state.axisYMaximum === '') {
                    var defaultYMaximum = -1;
                    for (let i = 0; i < data.length; i++) {
                        for (let j = 0; j < data[i].dataPoints.length; j++) {
                            var maximumTiming = Math.max.apply(Math, data[i].dataPoints[j].y);
                            if (defaultYMaximum < maximumTiming) {
                                defaultYMaximum = maximumTiming;
                            }
                        }
                    }
                }
            }

            defaultYMaximum = defaultYMaximum + 5;

            var options = {
                interactivityEnabled: this.state.interactivityEnabled,
                exportFileName: this.state.exportFileName,
                exportEnabled: true,
                zoomEnabled: this.state.zoomEnabled,
                zoomType: "xy",
                theme: this.state.theme,
                title: {
                    text: this.state.title,
                    fontFamily: this.state.titleFont
                },
                data: data,
                axisX: {
                    title: this.state.axisXTitle,
                    labelAngle: this.state.axisXLabelAngle,
                    gridThickness: this.state.axisXGridThickness,
                    interval: 1,
                    minimum: 0,
                    maximum: data.length + 1,
                    labelMaxWidth: 80,
                    labelWrap: true,
                    valueFormatString: " ",
                    titleFontFamily: this.state.axisXFont,
                    labelFontFamily: this.state.axisXFont
                },
                axisY: {
                    title: this.state.axisYTitle,
                    minimum: this.state.axisYMinimum,
                    maximum: this.state.axisYMaximum !== '' ? this.state.axisYMaximum : defaultYMaximum,
                    interval: this.state.axisYInterval,
                    labelAngle: this.state.axisYLabelAngle,
                    gridThickness: this.state.axisYGridThickness,
                    titleFontFamily: this.state.axisYFont,
                    labelFontFamily: this.state.axisYFont
                },
                toolTip: {
                    content: this.state.type === "scatter" ? "{label}: {laptime}" : "{label}<br />Minimum: {y[0]}s<br />Q1: {y[1]}s<br />Q2: {y[4]}s<br />Q3: {y[2]}s<br />Maximum: {y[3]}s<br />"
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
                            <ButtonGroup key={season.year} style={{ padding: "0px" }}>
                                <DropdownButton as={ButtonGroup} title={season.year} id="bg-nested-dropdown" onSelect={this.handleRaceChangeClick} variant="secondary" style={{ padding: "10px" }}>
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
                        {this.state.lapTimes.length > 0 &&
                            <div>
                                <Button variant="primary" onClick={() => this.setState({ chartOptionsModalShow: true })}>
                                    Keisti grafiko parinktis
                            </Button>
                                <ChartOptionsModal
                                    animation={false}
                                    size="lg"
                                    show={this.state.chartOptionsModalShow}
                                    onHide={() => this.setState({ chartOptionsModalShow: false })}
                                    handleoptionschange={this.handleOptionsChange}
                                    setdefaultvalues={this.setDefaultValues}
                                    title={this.state.title}
                                    exportfilename={this.state.exportFileName}
                                    interactivityenabled={this.state.interactivityEnabled ? 1 : 0}
                                    zoomenabled={this.state.zoomEnabled ? 1 : 0}
                                    themes={[{ value: "light1", content: "Light1" }, { value: "light2", content: "Light2" }, { value: "dark1", content: "Dark1" }, { value: "dark2", content: "Dark2" }]}
                                    currenttheme={this.state.theme}
                                    types={[{ type: "scatter", name: "Taškinė" }, { type: "boxAndWhisker", name: "Pasikliautinasis intervalas" }]}
                                    currenttype={this.state.type}
                                    axisxtitle={this.state.axisXTitle}
                                    axisxlabelangle={this.state.axisXLabelAngle}
                                    axisxgridthickness={this.state.axisXGridThickness}
                                    axisytitle={this.state.axisYTitle}
                                    axisylabelangle={this.state.axisYLabelAngle}
                                    axisygridthickness={this.state.axisYGridThickness}
                                    axisyminimum={this.state.axisYMinimum}
                                    axisymaximum={this.state.axisYMaximum !== '' ? this.state.axisYMaximum : defaultYMaximum}
                                    axisyinterval={this.state.axisYInterval}
                                    fonts={["Calibri", "Optima", "Candara", "Verdana", "Geneva"]}
                                    currenttitlefont={this.state.titleFont}
                                    currentaxisxfont={this.state.axisXFont}
                                    currentaxisyfont={this.state.axisYFont}
                                />
                                <br />
                                <br />
                                <Button variant="primary" onClick={() => this.setState({ dataOptionsModalShow: true })}>
                                    Keisti duomenų parinktis
                                </Button>
                                <DataOptionsModal
                                    animation={false}
                                    size="lg"
                                    show={this.state.dataOptionsModalShow}
                                    onHide={() => this.setState({ dataOptionsModalShow: false })}
                                    handleoptionschange={this.handleOptionsChange}
                                    setdefaultdatafilters={this.setDefaultDataFilters}
                                    mediananomalyexclusion={this.state.medianAnomalyExclusion !== '' ? this.state.medianAnomalyExclusion : this.findDefaultMaximumDifference(filteredData)}
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