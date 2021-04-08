import React, { Component } from 'react';
import { DataRangeForm } from '../../DataRangeForm';
import CanvasJSReact from '../../../canvasjs.react';
import { Button } from 'react-bootstrap';
import { ChartOptionsModal } from '../../ChartOptionsModal';
import { DataOptionsModal } from '../../DataOptionsModal';
import { addWatermark, changeExportButtonsLanguage } from '../../../js/utils';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export class PodiumThree extends Component {
    constructor(props) {
        super(props);
        this.state = {
            podiumThree: [],
            modalShow: false,

            interactivityEnabled: true,
            exportFileName: this.props.pageTitle,
            zoomEnabled: false,
            theme: "light1",
            title: this.props.pageTitle,
            type: "column",

            axisXTitle: this.props.axisName,
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
            selectedCircuits: [],
            selectedPodiumFinishers: []
        };

        this.fillData = this.fillData.bind(this);
        this.calculateTotalSamePodiums = this.calculateTotalSamePodiums.bind(this);
        this.handleOptionsChange = this.handleOptionsChange.bind(this);
        this.setDefaultValues = this.setDefaultValues.bind(this);
        this.setDefaultDataFilters = this.setDefaultDataFilters.bind(this);
        this.filterData = this.filterData.bind(this);
        this.getCircuits = this.getCircuits.bind(this);
        this.initializeCircuits = this.initializeCircuits.bind(this);
        this.getPodiumFinishers = this.getPodiumFinishers.bind(this);
        this.initializePodiumFinishers = this.initializePodiumFinishers.bind(this);
        this.updateWindowSize = this.updateWindowSize.bind(this);
    }

    fillData(data) {
        this.setState({
            podiumThree: data
        }, () => {
            this.initializeCircuits(this.getCircuits(this.state.podiumThree));
            this.initializePodiumFinishers(this.getPodiumFinishers(this.state.podiumThree));
        });
    }

    calculateTotalSamePodiums(podiumThree) {
        var totalSamePodiums = 0;

        podiumThree.forEach(podium => {
            totalSamePodiums += podium.samePodiumCount
        });

        return totalSamePodiums;
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

        if (name === 'selectedPodiumFinishers') {
            valueToUpdate = this.state.selectedPodiumFinishers;
            valueToUpdate.filter(x => x.podiumFinisher === value)[0].checked = checked;
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
            selectedCircuits: [],
            selectedDrivers: []
        }, () => {
            this.initializeCircuits(this.getCircuits(this.state.podiumThree));
            this.initializePodiumFinishers(this.getPodiumFinishers(this.state.podiumThree));
            callback();
        });
    }

    filterData(data) {
        var filteredData = JSON.parse(JSON.stringify(data));

        this.state.selectedCircuits.forEach(selectedCircuit => {
            if (selectedCircuit.checked === false) {
                filteredData.forEach(podiumThree => {
                    var i = 0;

                    while (i < podiumThree.circuits.length) {
                        if (podiumThree.circuits[i] === selectedCircuit.circuit) {
                            podiumThree.circuits.splice(i, 1);
                        }
                        else {
                            i++;
                        }
                    }

                    podiumThree.samePodiumCount = podiumThree.circuits.length;
                });
            }
        });

        this.state.selectedPodiumFinishers.forEach(selectedPodiumFinisher => {
            if (selectedPodiumFinisher.checked === false) {
                for (let i = 0; i < filteredData.length; i++) {
                    if (filteredData[i].podiumFinishers.includes(selectedPodiumFinisher.podiumFinisher)) {
                        filteredData.splice(i, 1);
                        i--;
                    }
                }
            }
        });
        
        filteredData = filteredData.filter(podiumThree => podiumThree.samePodiumCount >= this.state.from);

        if (this.state.to !== '') {
            filteredData = filteredData.filter(podiumThree => podiumThree.samePodiumCount <= this.state.to);
        }

        return filteredData;
    }

    getCircuits(data) {
        var uniqueCircuits = new Set();

        data.forEach(podiumThree => {
            podiumThree.circuits.forEach(circuit => {
                uniqueCircuits.add(circuit);
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

    getPodiumFinishers(data) {
        var uniquePodiumfinishers = new Set();

        data.forEach(podiumThree => {
            podiumThree.podiumFinishers.forEach(podiumFinisher => {
                uniquePodiumfinishers.add(podiumFinisher);
            });
        });

        return [...uniquePodiumfinishers];
    }

    initializePodiumFinishers(podiumFinishers) {
        var podiumFinisherObjects = [];
        podiumFinishers.forEach(x => {
            var podiumFinisherObject = { podiumFinisher: x, checked: true };

            podiumFinisherObjects.push(podiumFinisherObject);
        });

        podiumFinisherObjects.sort((a, b) => (a.podiumFinisher > b.podiumFinisher ? 1 : -1));

        this.setState({
            selectedPodiumFinishers: podiumFinisherObjects
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
        if (this.state.podiumThree.length > 0) {
            var filteredData = this.filterData(this.state.podiumThree);
            var totalSamePodiums = this.calculateTotalSamePodiums(filteredData);
            var data = filteredData.map((x, index) => ({ label: x.podiumFinishers.join(", "), x: index + 1, y: x.samePodiumCount, percentage: Math.round((x.samePodiumCount / totalSamePodiums * 100) * 100) / 100 }));
            
            if (this.state.axisYMaximum === '') {
                var defaultMaximum = -1;
                for (let i = 0; i < filteredData.length; i++) {
                    if (defaultMaximum < filteredData[i].samePodiumCount) {
                        defaultMaximum = filteredData[i].samePodiumCount;
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
                        dataPoints: data,
                        indexLabel: this.state.type === 'column' ? "" : "{label} {y}"
                    }
                ],
                axisX: {
                    title: this.state.axisXTitle,
                    labelAngle: this.state.axisXLabelAngle,
                    interval: 1,
                    gridThickness: this.state.axisXGridThickness,
                    titleFontFamily: this.state.axisXFont,
                    labelFontFamily: this.state.axisXFont,
                    valueFormatString: " "
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
                toolTip:{   
                    content: this.state.type === 'column' ? "{label}: {y}" : "{label}: {percentage}%"
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
                    this.state.podiumThree.length > 0 &&
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
                            types={[{type: "column", name: "Stulpelinė"}, {type: "pie", name: "Skritulinė"}]}
                            currenttype={this.state.type}
                            axisxtitle={this.state.axisXTitle}
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
                            to={this.state.to !== '' ? this.state.to : Math.max.apply(Math, this.state.podiumThree.map(podiumThree => podiumThree.samePodiumCount))}
                            selectedcircuits={this.state.selectedCircuits}
                            podiumfinishertitle={this.props.axisName === "Lenktynininkų trejetukas" ? "Lenktynininkas" : "Komanda"}
                            selectedpodiumfinishers={this.state.selectedPodiumFinishers}
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