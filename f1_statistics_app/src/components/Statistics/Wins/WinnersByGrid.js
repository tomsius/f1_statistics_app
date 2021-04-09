import React, { Component } from 'react';
import { DataRangeForm } from '../../DataRangeForm';
import CanvasJSReact from '../../../canvasjs.react';
import { Button } from 'react-bootstrap';
import { ChartOptionsModal } from '../../ChartOptionsModal';
import { DataOptionsModal } from '../../DataOptionsModal';
import { addWatermark, changeExportButtonsLanguage } from '../../../js/utils';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export class WinnersByGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            winnersByGrid: [],
            chartOptionsModalShow: false,
            dataOptionsModalShow: false,

            interactivityEnabled: true,
            exportFileName: this.props.pageTitle,
            zoomEnabled: false,
            theme: "light1",
            title: this.props.pageTitle,
            type: "column",

            axisXTitle: "Starto pozicija",
            axisXLabelAngle: 0,
            axisXGridThickness: 0,

            axisYTitle: "Laimėjimų skaičius, vnt.",
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
            selectedCircuits: []
        };

        this.fillData = this.fillData.bind(this);
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
            winnersByGrid: data
        }, () => this.initializeCircuits(this.getCircuits(this.state.winnersByGrid)));
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
            exportFileName: this.props.pageTitle,
            zoomEnabled: false,
            theme: "light1",
            title: this.props.pageTitle,
            type: "column",

            axisXTitle: "Starto pozicija",
            axisXLabelAngle: 0,
            axisXGridThickness: 0,

            axisYTitle: "Laimėjimų skaičius, vnt.",
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
            selectedCircuits: []
        }, () => {
            this.initializeCircuits(this.getCircuits(this.state.winnersByGrid));
            callback();
        });
    }

    filterData(data) {
        var filteredData = JSON.parse(JSON.stringify(data));

        this.state.selectedCircuits.forEach(selectedCircuit => {
            if (selectedCircuit.checked === false) {
                filteredData.forEach(x => {
                    var i = 0;

                    while (i < x.winInformation.length) {
                        if (x.winInformation[i].circuitName === selectedCircuit.circuit) {
                            x.winInformation.splice(i, 1);
                        }
                        else {
                            i++;
                        }
                    }

                    x.winCount = x.winInformation.length;
                });
            }
        });

        filteredData = filteredData.filter(x => x.winCount >= this.state.from);

        if (this.state.to !== '') {
            filteredData = filteredData.filter(x => x.winCount <= this.state.to);
        }

        return filteredData;
    }

    getCircuits(data) {
        var uniqueCircuits = new Set();

        data.forEach(x => {
            x.winInformation.forEach(y => {
                uniqueCircuits.add(y.circuitName);
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
        if (this.state.winnersByGrid.length > 0) {
            var filteredData = this.filterData(this.state.winnersByGrid);
            var data = filteredData.map(x => ({ label: x.gridPosition, x: x.gridPosition, y: x.winCount, winnersFromGrid: x.winInformation.map(winner => winner.winnerName).filter((value, index, elements) => elements.indexOf(value) === index).join(", ") }));

            var defaultInterval = Math.max.apply(Math, data.map(d => d.y)) <= 20 ? 1 : Math.max.apply(Math, data.map(d => d.y)) <= 100 ? 5 : 20;

            if (this.state.axisYMaximum === '') {
                var defaultMaximum = -1;
                for (let i = 0; i < filteredData.length; i++) {
                    if (defaultMaximum < filteredData[i].winCount) {
                        defaultMaximum = filteredData[i].winCount;
                    }
                }

                var interval = this.state.axisYInterval !== '' ? this.state.axisYInterval : defaultInterval;
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
                    content: "Laimėtojai iš {label}-os starto pozicijos (laimėjimų skaičius: {y}): {winnersFromGrid}"
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
                    this.state.winnersByGrid.length > 0 &&
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
                            to={this.state.to !== '' ? this.state.to : Math.max.apply(Math, this.state.winnersByGrid.map(winner => winner.winCount))}
                            selectedcircuits={this.state.selectedCircuits}
                        />
                        <br />
                        <br />
                        <div style={{ position: "relative", right: "6em" }}>
                            <CanvasJSChart options={options} />
                        </div>
                    </div>
                }
            </div>
        );
    }
}