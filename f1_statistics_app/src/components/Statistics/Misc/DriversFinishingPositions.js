import React, { Component } from 'react';
import { DataRangeForm } from '../../DataRangeForm';
import CanvasJSReact from '../../../canvasjs.react';
import { Button, ButtonGroup, Dropdown, DropdownButton } from 'react-bootstrap';
import { ChartOptionsModal } from '../../ChartOptionsModal';
import { DataOptionsModal } from '../../DataOptionsModal';
import { addWatermark, changeExportButtonsLanguage } from '../../../js/utils';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export class DriversFinishingPositions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            finishingPositions: [],
            selectedDriver: "",
            chartOptionsModalShow: false,
            dataOptionsModalShow: false,

            interactivityEnabled: true,
            exportFileName: this.props.pageTitle,
            zoomEnabled: false,
            theme: "light1",
            title: this.props.pageTitle,
            type: "column",

            axisXTitle: "Finišavimo pozicija",
            axisXLabelAngle: 0,
            axisXGridThickness: 0,

            axisYTitle: "Finišavimo skaičius, vnt.",
            axisYLabelAngle: 0,
            axisYGridThickness: 1,
            axisYMinimum: 0,
            axisYMaximum: '',
            axisYInterval: '',

            titleFont: "Calibri",
            axisXFont: "Calibri",
            axisYFont: "Calibri",

            from: 0,
            to: '',
            finishedRace: "all",
            selectedCircuits: []
        };

        this.fillData = this.fillData.bind(this);
        this.handleDriverChangeClick = this.handleDriverChangeClick.bind(this);
        this.handleOptionsChange = this.handleOptionsChange.bind(this);
        this.setDefaultValues = this.setDefaultValues.bind(this);
        this.setDefaultDataFilters = this.setDefaultDataFilters.bind(this);
        this.filterData = this.filterData.bind(this);
        this.filterByFinishedStatus = this.filterByFinishedStatus.bind(this);
        this.getCircuits = this.getCircuits.bind(this);
        this.initializeCircuits = this.initializeCircuits.bind(this);
        this.updateWindowSize = this.updateWindowSize.bind(this);
    }

    fillData(data) {
        this.setState({
            finishingPositions: data,
            selectedDriver: "",
            title: "",
            exportFileName: ""
        });
    }

    handleDriverChangeClick(eventKey, event) {
        event.preventDefault();
        
        this.setState({
            selectedDriver: eventKey,
            title: eventKey + " finišavimo pozicijos",
            exportFileName: eventKey + " finišavimo pozicijos"
        }, () => this.initializeCircuits(this.getCircuits(this.state.finishingPositions.filter(x => x.name == this.state.selectedDriver)[0])));
    }

    handleOptionsChange(event) {
        const { name, value, checked, type } = event.target;
        var valueToUpdate = type === 'checkbox' ? checked : value;

        if (name === 'axisYInterval') {
            valueToUpdate = parseInt(value);
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
            exportFileName: this.state.selectedDriver + " finišavimo pozicijos",
            zoomEnabled: false,
            theme: "light1",
            title: this.state.selectedDriver + " finišavimo pozicijos",
            type: "column",

            axisXTitle: "Finišavimo pozicija",
            axisXLabelAngle: 0,
            axisXGridThickness: 0,

            axisYTitle: "Finišavimo skaičius, vnt.",
            axisYLabelAngle: 0,
            axisYGridThickness: 1,
            axisYMinimum: 0,
            axisYMaximum: '',
            axisYInterval: '',

            titleFont: "Calibri",
            axisXFont: "Calibri",
            axisYFont: "Calibri"
        }, () => {
            callback();
        });
    }

    setDefaultDataFilters(callback) {
        this.setState({
            from: 0,
            to: '',
            finishedRace: "all",
            selectedCircuits: []
        }, () => {
            this.initializeCircuits(this.getCircuits(this.state.finishingPositions.filter(x => x.name == this.state.selectedDriver)[0]));
            callback();
        });
    }

    filterData(data) {
        var filteredData = JSON.parse(JSON.stringify(data));

        this.state.selectedCircuits.forEach(selectedCircuit => {
            if (selectedCircuit.checked === false) {
                filteredData.finishingPositions.forEach(position => {
                    var i = 0;

                    while (i < position.finishingPositionInformation.length) {
                        if (position.finishingPositionInformation[i].circuitName === selectedCircuit.circuit) {
                            position.finishingPositionInformation.splice(i, 1);
                        }
                        else {
                            i++;
                        }
                    }

                    position.count = position.finishingPositionInformation.length;
                });
            }
        });

        switch (this.state.finishedRace) {
            case "finishedOnly":
                filteredData = this.filterByFinishedStatus(filteredData, true);
                break;
            case "notFinishedOnly":
                filteredData = this.filterByFinishedStatus(filteredData, false);
                break;
            default:
                break;
        }

        filteredData.finishingPositions = filteredData.finishingPositions.filter(position => position.count >= this.state.from);

        if (this.state.to !== '') {
            filteredData.finishingPositions = filteredData.finishingPositions.filter(position => position.count <= this.state.to);
        }

        return filteredData;
    }

    filterByFinishedStatus(data, status) {
        var filteredData = JSON.parse(JSON.stringify(data));

        filteredData.finishingPositions.forEach(position => {
            var i = 0;

            while (i < position.finishingPositionInformation.length) {
                if (position.finishingPositionInformation[i].finishedRace !== status) {
                    position.finishingPositionInformation.splice(i, 1);
                }
                else {
                    i++;
                }
            }
            position.count = position.finishingPositionInformation.length;
        });

        return filteredData;
    }

    getCircuits(data) {
        var uniqueCircuits = new Set();

        data.finishingPositions.forEach(position => {
            position.finishingPositionInformation.forEach(information => {
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
        if (this.state.finishingPositions.length > 0 && this.state.selectedDriver !== "") {
            var selectedData = this.state.finishingPositions.filter(x => x.name == this.state.selectedDriver)[0];
            var filteredData = this.filterData(selectedData);
            var data = filteredData.finishingPositions.map(x => ({ label: x.finishingPosition, y: x.count }));

            if (this.state.axisYInterval === '') {
                var maxCount = Math.max.apply(Math, data.map(data => data.y));
                var defaultInterval = maxCount >= 25 ? 5 : 1;
            }

            if (this.state.axisYMaximum === '') {
                var defaultMaximum = -1;
                for (let i = 0; i < data.length; i++) {
                    if (defaultMaximum < data[i].y) {
                        defaultMaximum = data[i].y;
                    }
                }

                var interval = this.state.axisYInterval === '' ? defaultInterval : this.state.axisYInterval;

                defaultMaximum = defaultMaximum % interval === 0 ? defaultMaximum : (defaultMaximum + (interval - (defaultMaximum % interval)));
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
                    titleFontFamily: this.state.axisXFont,
                    labelFontFamily: this.state.axisXFont
                },
                axisY: {
                    title: this.state.axisYTitle,
                    minimum: this.state.axisYMinimum,
                    maximum: this.state.axisYMaximum !== '' ? this.state.axisYMaximum : defaultMaximum,
                    interval: this.state.axisYInterval !== '' ? this.state.axisYInterval : defaultInterval,
                    labelAngle: this.state.axisYLabelAngle,
                    gridThickness: this.state.axisYGridThickness,
                    titleFontFamily: this.state.axisYFont,
                    labelFontFamily: this.state.axisYFont
                },
                toolTip: {
                    content: "Finišavimo skaičius {label}-oje pozicijoje: {y}"
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
                    this.state.finishingPositions.length > 0 &&
                    <div>
                        <ButtonGroup>
                            <DropdownButton as={ButtonGroup} title="Lenktynininkai" id="bg-nested-dropdown" onSelect={this.handleDriverChangeClick} variant="secondary">
                                {this.state.finishingPositions.map((driver, index) => {
                                    if (driver.name === this.state.selectedDriver) {
                                        return <Dropdown.Item key={index} eventKey={driver.name} active>
                                                    {driver.name}
                                                </Dropdown.Item>
                                    }
                                    else {
                                        return <Dropdown.Item key={index} eventKey={driver.name}>
                                                    {driver.name}
                                                </Dropdown.Item>
                                    }
                                })}
                            </DropdownButton>
                        </ButtonGroup>
                        <br />
                        <br />
                        {this.state.selectedDriver !== "" &&
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
                                    axisxtitle={this.state.axisXTitle}
                                    axisxlabelangle={this.state.axisXLabelAngle}
                                    axisxgridthickness={this.state.axisXGridThickness}
                                    axisytitle={this.state.axisYTitle}
                                    axisylabelangle={this.state.axisYLabelAngle}
                                    axisygridthickness={this.state.axisYGridThickness}
                                    axisyminimum={this.state.axisYMinimum}
                                    axisymaximum={this.state.axisYMaximum !== '' ? this.state.axisYMaximum : defaultMaximum}
                                    axisyinterval={this.state.axisYInterval !== '' ? this.state.axisYInterval : defaultInterval}
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
                                    from={this.state.from}
                                    to={this.state.to !== '' ? this.state.to : Math.max.apply(Math, selectedData.finishingPositions.map(position => position.count))}
                                    finishedracestatuses={[{ value: "all", label: "Visos" }, { value: "finishedOnly", label: "Tik baigtos" }, { value: "notFinishedOnly", label: "Tik nebaigtos" }]}
                                    selectedstatus={this.state.finishedRace}
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