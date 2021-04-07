import React, { Component } from 'react';
import { DataRangeForm } from '../../DataRangeForm';
import CanvasJSReact from '../../../canvasjs.react';
import { Button } from 'react-bootstrap';
import { ChartOptionsModal } from '../../ChartOptionsModal';
import { DataOptionsModal } from '../../DataOptionsModal';
import { addWatermark, changeExportButtonsLanguage } from '../../../js/utils';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export class PodiumFinishers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            podiumFinishers: [],
            modalShow: false,

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

            axisYTitle: "Podiumų skaičius, vnt.",
            axisYLabelAngle: 0,
            axisYGridThickness: 1,
            axisYMinimum: 0,
            axisYMaximum: '',
            axisYInterval: 5,
            
            titleFont: "Calibri",
            axisXFont: "Calibri",
            axisYFont: "Calibri",

            from: 0,
            to: '',
            podiumFrom: 1,
            podiumTo: 3,
            gridFrom: 1,
            gridTo: '',
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
            podiumFinishers: data
        }, () => this.initializeCircuits(this.getCircuits(this.state.podiumFinishers)));
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

            axisYTitle: "Podiumų skaičius, vnt.",
            axisYLabelAngle: 0,
            axisYGridThickness: 1,
            axisYMinimum: 0,
            axisYMaximum: '',
            axisYInterval: 5,
            
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
            gapFrom: 0,
            gapTo: '',
            gridFrom: 1,
            gridTo: '',
            selectedCircuits: []
        }, () => {
            this.initializeCircuits(this.getCircuits(this.state.podiumFinishers));
            callback();
        });
    }

    filterData(data) {
        var filteredData = JSON.parse(JSON.stringify(data));

        this.state.selectedCircuits.forEach(selectedCircuit => {
            if (selectedCircuit.checked === false) {
                filteredData.forEach(x => {
                    var i = 0;

                    while (i < x.podiumInformation.length) {
                        if (x.podiumInformation[i].circuitName === selectedCircuit.circuit) {
                            x.podiumInformation.splice(i, 1);
                        }
                        else {
                            i++;
                        }
                    }

                    x.podiumCount = x.podiumInformation.length;
                });
            }
        });

        filteredData.forEach(x => {
            var i = 0;

            while (i < x.podiumInformation.length) {
                if (x.podiumInformation[i].podiumPosition < this.state.podiumFrom) {
                    x.podiumInformation.splice(i, 1);
                }
                else {
                    i++;
                }
            }

            x.podiumCount = x.podiumInformation.length;
        });

        filteredData.forEach(x => {
            var i = 0;

            while (i < x.podiumInformation.length) {
                if (x.podiumInformation[i].podiumPosition > this.state.podiumTo) {
                    x.podiumInformation.splice(i, 1);
                }
                else {
                    i++;
                }
            }

            x.podiumCount = x.podiumInformation.length;
        });
        
        filteredData.forEach(x => {
            var i = 0;

            while (i < x.podiumInformation.length) {
                if (x.podiumInformation[i].gridPosition < this.state.gridFrom) {
                    x.podiumInformation.splice(i, 1);
                }
                else {
                    i++;
                }
            }

            x.podiumCount = x.podiumInformation.length;
        });

        if (this.state.gridTo !== '') {
            filteredData.forEach(x => {
                var i = 0;

                while (i < x.podiumInformation.length) {
                    if (x.podiumInformation[i].gridPosition > this.state.gridTo) {
                        x.podiumInformation.splice(i, 1);
                    }
                    else {
                        i++;
                    }
                }

                x.podiumCount = x.podiumInformation.length;
            });
        }
        
        filteredData = filteredData.filter(x => x.podiumCount >= this.state.from);

        if (this.state.to !== '') {
            filteredData = filteredData.filter(x => x.podiumCount <= this.state.to);
        }

        return filteredData;
    }

    getCircuits(data) {
        var uniqueCircuits = new Set();

        data.forEach(x => {
            x.podiumInformation.forEach(y => {
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
        if (this.state.podiumFinishers.length > 0) {
            if (this.state.type !== "stackedColumn") {
                var filteredData = this.filterData(this.state.podiumFinishers);
                var data = filteredData.map((x, index) => ({ label: x.name, x: index + 1, y: x.podiumCount }));

                if (this.state.axisYMaximum === '') {
                    var defaultMaximum = -1;
                    for (let i = 0; i < filteredData.length; i++) {
                        if (defaultMaximum < filteredData[i].podiumCount) {
                            defaultMaximum = filteredData[i].podiumCount;
                        }
                    }

                    defaultMaximum = defaultMaximum % this.state.axisYInterval === 0 ? defaultMaximum : (defaultMaximum + (this.state.axisYInterval - (defaultMaximum % this.state.axisYInterval)));
                }
            }
            else {
                var data = this.state.podiumFinishers.map(x => ({ type: "stackedColumn", showInLegend: true, name: x.name, dataPoints: x.podiumsByYear.map(yearPodium => ({ label: yearPodium.year, x: yearPodium.year, y: yearPodium.podiumCount })) }));

                defaultMaximum = 75;
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
                    }
                ] : data,
                axisX: {
                    title: this.state.type !== "stackedColumn" ? this.state.axisXTitle : this.state.axisXTitle2,
                    labelAngle: this.state.axisXLabelAngle,
                    interval: 1,
                    gridThickness: this.state.axisXGridThickness,
                    labelMaxWidth: 80,
                    labelWrap: true,
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
                    content: "{label}: {y}"
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
                    this.state.podiumFinishers.length > 0 &&
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
                            types={[{ type: "column", name: "Stulpelinė" }, { type: "stackedColumn", name: "Stulpelinė (sluoksniuota)" }]}
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
                            to={this.state.to !== '' ? this.state.to : Math.max.apply(Math, this.state.podiumFinishers.map(x => x.podiumCount))}
                            podiumfrom={this.state.podiumFrom}
                            podiumto={this.state.podiumTo !== '' ? this.state.podiumTo : Math.max.apply(Math, this.state.podiumFinishers.map(x => Math.max.apply(Math, x.podiumInformation.map(y => y.podiumPosition))))}
                            gridfrom={this.state.gridFrom}
                            gridto={this.state.gridTo !== '' ? this.state.gridTo : Math.max.apply(Math, this.state.podiumFinishers.map(x => Math.max.apply(Math, x.podiumInformation.map(y => y.gridPosition))))}
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