import React, { Component } from 'react';
import { DataRangeForm } from '../../DataRangeForm';
import CanvasJSReact from '../../../canvasjs.react';
import { Button, ButtonGroup, Dropdown, DropdownButton } from 'react-bootstrap';
import { ChartOptionsModal } from '../../ChartOptionsModal';
import { DataOptionsModal } from '../../DataOptionsModal';
import { addWatermark, changeExportButtonsLanguage } from '../../../js/utils';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export class PositionDifferences extends Component {
    constructor(props) {
        super(props);
        this.state = {
            seasonDifferences: [],
            selectedSeason: 0,
            chartOptionsModalShow: false,
            dataOptionsModalShow: false,

            interactivityEnabled: true,
            exportFileName: this.props.pageTitle,
            zoomEnabled: false,
            theme: "light1",
            title: this.props.pageTitle,
            type: "column",

            axisXTitle: "Lenktynininkas",
            axisXLabelAngle: -90,
            axisXGridThickness: 0,

            axisYTitle: "Pozicijų pokytis, vnt.",
            axisYLabelAngle: 0,
            axisYGridThickness: 1,
            axisYMinimum: '',
            axisYMaximum: '',
            axisYInterval: 10,

            titleFont: "Calibri",
            axisXFont: "Calibri",
            axisYFont: "Calibri",

            from: '',
            to: '',
            championshipFrom: 1,
            championshipTo: '',
            selectedCircuits: []
        };

        this.fillData = this.fillData.bind(this);
        this.handleSeasonChangeClick = this.handleSeasonChangeClick.bind(this);
        this.handleOptionsChange = this.handleOptionsChange.bind(this);
        this.setDefaultValues = this.setDefaultValues.bind(this);
        this.setDefaultDataFilters = this.setDefaultDataFilters.bind(this);
        this.filterData = this.filterData.bind(this);
        this.getCircuits = this.getCircuits.bind(this);
        this.initializeCircuits = this.initializeCircuits.bind(this);
        this.updateWindowSize = this.updateWindowSize.bind(this);
    }

    fillData(data) {
        this.setState({
            seasonDifferences: data,
            selectedSeason: 0,
            title: "",
            exportFileName: ""
        });
    }

    handleSeasonChangeClick(eventKey, event) {
        event.preventDefault();

        this.setState({
            selectedSeason: parseInt(eventKey),
            title: this.props.pageTitle + " " + eventKey + " metais",
            exportFileName: this.props.pageTitle + " " + eventKey + " metais"
        }, () => this.initializeCircuits(this.getCircuits(this.state.seasonDifferences.filter(x => x.year == this.state.selectedSeason)[0])));
    }

    handleOptionsChange(event) {
        const { name, value, checked, type } = event.target;
        var valueToUpdate = type === 'checkbox' ? checked : value;

        if (name === 'axisYInterval') {
            valueToUpdate = parseFloat(value);
        }

        if (name === 'selectedCircuits') {
            valueToUpdate = this.state.selectedCircuits;
            valueToUpdate.filter(x => x.circuit === value)[0].checked = checked;
        }

        this.setState({
            [name]: valueToUpdate
        });
    }

    setDefaultValues(callback) {
        this.setState({
            interactivityEnabled: true,
            exportFileName: this.props.pageTitle + " " + this.state.selectedSeason + " metais",
            zoomEnabled: false,
            theme: "light1",
            title: this.props.pageTitle + " " + this.state.selectedSeason + " metais",
            type: "column",

            axisXTitle: "Lenktynininkas",
            axisXLabelAngle: -90,
            axisXGridThickness: 0,

            axisYTitle: "Pozicijų pokytis, vnt.",
            axisYLabelAngle: 0,
            axisYGridThickness: 1,
            axisYMinimum: '',
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
            from: '',
            to: '',
            championshipFrom: 1,
            championshipTo: '',
            selectedCircuits: []
        }, () => {
            this.initializeCircuits(this.getCircuits(this.state.seasonDifferences.filter(x => x.year == this.state.selectedSeason)[0]));
            callback();
        });
    }

    filterData(data) {
        var filteredData = JSON.parse(JSON.stringify(data));

        this.state.selectedCircuits.forEach(selectedCircuit => {
            if (selectedCircuit.checked === false) {
                filteredData.positionChanges.forEach(driver => {
                    var i = 0;

                    while (i < driver.driverPositionChangeInformation.length) {
                        if (driver.driverPositionChangeInformation[i].circuitName === selectedCircuit.circuit) {
                            driver.driverPositionChangeInformation.splice(i, 1);
                        }
                        else {
                            i++;
                        }
                    }

                    driver.totalPositionChange = driver.driverPositionChangeInformation.map(information => information.racePositionChange).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
                });
            }
        });

        for (let i = 0; i < filteredData.positionChanges.length; i++) {
            if (filteredData.positionChanges[i].championshipPosition < this.state.championshipFrom) {
                filteredData.positionChanges.splice(i, 1);
                i--;
            }
        }

        if (this.state.championshipTo !== '') {
            for (let i = 0; i < filteredData.positionChanges.length; i++) {
                if (filteredData.positionChanges[i].championshipPosition > this.state.championshipTo) {
                    filteredData.positionChanges.splice(i, 1);
                    i--;
                }
            }
        }

        if (this.state.from !== '') {
            filteredData = { year: filteredData.year, positionChanges: filteredData.positionChanges.filter(driver => driver.totalPositionChange >= this.state.from) };
        }

        if (this.state.to !== '') {
            filteredData = { year: filteredData.year, positionChanges: filteredData.positionChanges.filter(driver => driver.totalPositionChange <= this.state.to) };
        }

        return filteredData;
    }

    getCircuits(data) {
        var uniqueCircuits = new Set();

        data.positionChanges.forEach(driver => {
            driver.driverPositionChangeInformation.forEach(information => {
                uniqueCircuits.add(information.circuitName);
            });
        });

        return [...uniqueCircuits];
    }

    initializeCircuits(circuits) {
        var circuitObjects = [];
        circuits.forEach(x => {
            var circuitObject = { circuit: x, checked: true };

            circuitObjects.push(circuitObject);
        });

        circuitObjects.sort((a, b) => (a.circuit > b.circuit ? 1 : -1));

        this.setState({
            selectedCircuits: circuitObjects
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
        if (this.state.seasonDifferences.length > 0 && this.state.selectedSeason !== 0) {
            var selectedData = this.state.seasonDifferences.filter(x => x.year == this.state.selectedSeason)[0];
            var filteredData = this.filterData(selectedData);
            var data = filteredData.positionChanges.map((x, index) => ({ label: x.name, x: index + 1, y: x.totalPositionChange, position: x.championshipPosition }));

            if (this.state.axisYMaximum === '') {
                var defaultMaximum = -999;
                for (let i = 0; i < data.length; i++) {
                    if (defaultMaximum < data[i].y) {
                        defaultMaximum = data[i].y;
                    }
                }

                defaultMaximum = defaultMaximum % this.state.axisYInterval === 0 ? defaultMaximum : (defaultMaximum + (this.state.axisYInterval - (defaultMaximum % this.state.axisYInterval)));
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
                data: [
                    {
                        type: this.state.type,
                        dataPoints: data
                    }
                ],
                axisX: {
                    title: this.state.axisXTitle,
                    labelAngle: this.state.axisXLabelAngle,
                    interval: 1,
                    gridThickness: this.state.axisXGridThickness,
                    valueFormatString: " ",
                    labelMaxWidth: 80,
                    labelWrap: true,
                    titleFontFamily: this.state.axisXFont,
                    labelFontFamily: this.state.axisXFont
                },
                axisY: {
                    title: this.state.axisYTitle,
                    minimum: this.state.axisYMinimum !== '' ? this.state.axisYMinimum : -defaultMaximum,
                    maximum: this.state.axisYMaximum !== '' ? this.state.axisYMaximum : defaultMaximum,
                    interval: this.state.axisYInterval,
                    labelAngle: this.state.axisYLabelAngle,
                    gridThickness: this.state.axisYGridThickness,
                    titleFontFamily: this.state.axisYFont,
                    labelFontFamily: this.state.axisYFont
                },
                toolTip: {
                    content: "{label}<br />Pozicijų pokytis: {y}<br />Čempionato vieta: {position}"
                }
            };
        }

        return (
            <div>
                <h1>{this.props.pageTitle}</h1>
                <br />
                <DataRangeForm api={this.props.api} callback={this.fillData} />
                <br />
                {
                    this.state.seasonDifferences.length > 0 &&
                    <div>
                        <ButtonGroup>
                            <DropdownButton as={ButtonGroup} title="Sezonai" id="bg-nested-dropdown" onSelect={this.handleSeasonChangeClick} variant="secondary">
                                {this.state.seasonDifferences.map((season, index) => {
                                    if (season.year === this.state.selectedSeason) {
                                        return <Dropdown.Item key={index} eventKey={season.year} active>
                                                    {season.year}
                                                </Dropdown.Item>
                                    }
                                    else {
                                        return <Dropdown.Item key={index} eventKey={season.year}>
                                                    {season.year}
                                                </Dropdown.Item>
                                    }
                                })}
                            </DropdownButton>
                        </ButtonGroup>
                        <br />
                        <br />
                        {this.state.selectedSeason !== 0 &&
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
                                    themes={[{ value: "light1", content: "Light1" }, { value: "light2", content: "Light2" }, { value: "dark1", content: "Dark1" }, { value: "dark2", content: "Dark2" }]}
                                    currenttheme={this.state.theme}
                                    types={[{ type: "column", name: "Stulpelinė" }]}
                                    currenttype={this.state.type}
                                    zoomenabled={this.state.zoomEnabled ? 1 : 0}
                                    axisxtitle={this.state.axisXTitle}
                                    axisxlabelangle={this.state.axisXLabelAngle}
                                    axisxgridthickness={this.state.axisXGridThickness}
                                    axisytitle={this.state.axisYTitle}
                                    axisylabelangle={this.state.axisYLabelAngle}
                                    axisygridthickness={this.state.axisYGridThickness}
                                    axisyminimum={this.state.axisYMinimum !== '' ? this.state.axisYMinimum : -defaultMaximum}
                                    axisymaximum={this.state.axisYMaximum !== '' ? this.state.axisYMaximum : defaultMaximum}
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
                                    from={this.state.from !== '' ? this.state.from : Math.min.apply(Math, selectedData.positionChanges.map(driver => driver.totalPositionChange))}
                                    to={this.state.to !== '' ? this.state.to : Math.max.apply(Math, selectedData.positionChanges.map(driver => driver.totalPositionChange))}
                                    championshipfrom={this.state.championshipFrom}
                                    championshipto={this.state.championshipTo !== '' ? this.state.championshipTo : Math.max.apply(Math, selectedData.positionChanges.map(driver => driver.championshipPosition))}
                                    selectedcircuits={this.state.selectedCircuits}
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