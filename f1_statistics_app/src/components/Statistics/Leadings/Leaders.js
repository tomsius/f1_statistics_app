import React, { Component } from 'react';
import { DataRangeForm } from '../../DataRangeForm';
import CanvasJSReact from '../../../canvasjs.react';
import { Button } from 'react-bootstrap';
import { ChartOptionsModal } from '../../ChartOptionsModal';
import { DataOptionsModal } from '../../DataOptionsModal';
import { addWatermark, changeExportButtonsLanguage } from '../../../js/utils';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export class Leaders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            leaders: [],
            chartOptionsModalShow: false,
            dataOptionsModalShow: false,

            interactivityEnabled: true,
            exportFileName: this.props.pageTitle,
            zoomEnabled: false,
            theme: "light1",
            title: this.props.pageTitle,
            type: "column",

            axisXTitle: this.props.axisName,
            axisXTitle2: "Metai",
            axisXLabelAngle: 0,
            axisXGridThickness: 0,

            axisYTitle: "Pirmavimų skaičius, vnt.",
            axisYLabelAngle: 0,
            axisYGridThickness: 1,
            axisYMinimum: 0,
            axisYMaximum: '',
            axisYInterval: 200,

            titleFont: "Calibri",
            axisXFont: "Calibri",
            axisYFont: "Calibri",

            from: 0,
            to: '',
            selectedCircuits: []
        };

        this.fillData = this.fillData.bind(this);
        this.calculateTotalLaps = this.calculateTotalLaps.bind(this);
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
            leaders: data
        }, () => this.initializeCircuits(this.getCircuits(this.state.leaders)));
    }

    calculateTotalLaps(leaders) {
        var totalLaps = 0;

        leaders.forEach(leader => {
            totalLaps += leader.totalLeadingLapCount
        });

        return totalLaps;
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

            axisXTitle: this.props.axisName,
            axisXTitle2: "Metai",
            axisXLabelAngle: 0,
            axisXGridThickness: 0,

            axisYTitle: "Pirmavimų skaičius, vnt.",
            axisYLabelAngle: 0,
            axisYGridThickness: 1,
            axisYMinimum: 0,
            axisYMaximum: '',
            axisYInterval: 200,

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
            this.initializeCircuits(this.getCircuits(this.state.leaders));
            callback();
        });
    }

    filterData(data) {
        var filteredData = JSON.parse(JSON.stringify(data));

        this.state.selectedCircuits.forEach(selectedCircuit => {
            if (selectedCircuit.checked === false) {
                filteredData.forEach(leader => {
                    leader.leadingLapsByYear.forEach(year => {
                        var i = 0;

                        while (i < year.leadingLapInformation.length) {
                            if (year.leadingLapInformation[i].circuitName === selectedCircuit.circuit) {
                                year.leadingLapInformation.splice(i, 1);
                            }
                            else {
                                i++;
                            }
                        }

                        year.yearLeadingLapCount = year.leadingLapInformation.length;
                    });

                    leader.totalLeadingLapCount = leader.leadingLapsByYear.map(year => year.yearLeadingLapCount).reduce((accumulator, currentValue) => accumulator + currentValue);
                });
            }
        });

        filteredData = filteredData.filter(leader => leader.totalLeadingLapCount >= this.state.from);

        if (this.state.to !== '') {
            filteredData = filteredData.filter(leader => leader.totalLeadingLapCount <= this.state.to);
        }

        return filteredData;
    }

    getCircuits(data) {
        var uniqueCircuits = new Set();

        data.forEach(leader => {
            leader.leadingLapsByYear.forEach(year => {
                year.leadingLapInformation.forEach(information => {
                    uniqueCircuits.add(information.circuitName);
                });
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
        if (this.state.leaders.length > 0) {
            var filteredData = this.filterData(this.state.leaders);

            if (this.state.type !== "stackedColumn") {
                var totalLaps = this.calculateTotalLaps(filteredData);
                var data = filteredData.map(x => ({ label: x.name, y: x.totalLeadingLapCount, percentage: Math.round((x.totalLeadingLapCount / totalLaps * 100) * 100) / 100 }));

                if (this.state.axisYMaximum === '') {
                    var defaultMaximum = -1;
                    for (let i = 0; i < this.state.leaders.length; i++) {
                        if (defaultMaximum < filteredData[i].totalLeadingLapCount) {
                            defaultMaximum = filteredData[i].totalLeadingLapCount;
                        }
                    }

                    defaultMaximum = defaultMaximum % this.state.axisYInterval === 0 ? defaultMaximum : (defaultMaximum + (this.state.axisYInterval - (defaultMaximum % this.state.axisYInterval)));
                }
            }
            else {
                var data = filteredData.map(x => ({ type: "stackedColumn", showInLegend: true, name: x.name, dataPoints: x.leadingLapsByYear.map(yearLeadingLap => ({ label: yearLeadingLap.year, x: yearLeadingLap.year, y: yearLeadingLap.yearLeadingLapCount })) }));

                defaultMaximum = 1400;
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
                data: this.state.type !== "stackedColumn" ? [
                    {
                        type: this.state.type,
                        dataPoints: data,
                        indexLabel: this.state.type === 'column' ? "" : "{label} {y}"
                    }
                ] : data,
                axisX: {
                    title: this.state.type !== "stackedColumn" ? this.state.axisXTitle : this.state.axisXTitle2,
                    labelAngle: this.state.axisXLabelAngle,
                    interval: 1,
                    gridThickness: this.state.axisXGridThickness,
                    labelMaxWidth: 80,
                    labelWrap: true,
                    valueFormatString: " ",
                    titleFontFamily: this.state.axisXFont,
                    labelFontFamily: this.state.axisXFont
                },
                axisY: {
                    title: this.state.axisYTitle,
                    minimum: this.state.axisYMinimum,
                    maximum: this.state.axisYMaximum !== '' ? this.state.axisYMaximum : defaultMaximum,
                    interval: this.state.axisYInterval,
                    labelAngle: this.state.axisYLabelAngle,
                    gridThickness: this.state.axisYGridThickness,
                    titleFontFamily: this.state.axisYFont,
                    labelFontFamily: this.state.axisYFont
                },
                toolTip: this.state.type !== "stackedColumn" ? {
                    content: this.state.type === 'column' ? "{label}: {y}" : "{label}: {percentage}%"
                } : {
                    shared: true,
                    content: function (e) {
                        var content = e.entries[0].dataPoint.x + "<br />";
                        var total = 0;
                        for (let i = 0; i < e.entries.length; i++) {
                            content += e.entries[i].dataSeries.name + ": " + e.entries[i].dataPoint.y + "<br />";
                            total += e.entries[i].dataPoint.y;
                        }
                        content += "Iš viso: " + total;
                        return content;
                    }
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
                    this.state.leaders.length > 0 &&
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
                            types={[{ type: "column", name: "Stulpelinė" }, { type: "stackedColumn", name: "Stulpelinė (sluoksniuota)" }, { type: "pie", name: "Skritulinė" }]}
                            currenttype={this.state.type}
                            axisxtitle={this.state.type !== "stackedColumn" ? this.state.axisXTitle : this.state.axisXTitle2}
                            axisxlabelangle={this.state.axisXLabelAngle}
                            axisxgridthickness={this.state.axisXGridThickness}
                            axisytitle={this.state.axisYTitle}
                            axisylabelangle={this.state.axisYLabelAngle}
                            axisygridthickness={this.state.axisYGridThickness}
                            axisyminimum={this.state.axisYMinimum}
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
                            from={this.state.from}
                            to={this.state.to !== '' ? this.state.to : Math.max.apply(Math, this.state.leaders.map(leader => leader.totalLeadingLapCount))}
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