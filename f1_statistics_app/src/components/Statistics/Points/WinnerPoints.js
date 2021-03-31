import React, { Component } from 'react';
import { DataRangeForm } from '../../DataRangeForm';
import CanvasJSReact from '../../../canvasjs.react';
import { Button } from 'react-bootstrap';
import { ChartOptionsModal } from '../../ChartOptionsModal';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export class WinnerPoints extends Component {
    constructor(props) {
        super(props);
        this.state = {
            winnerPoints: [],
            modalShow: false,

            interactivityEnabled: true,
            exportFileName: this.props.pageTitle,
            zoomEnabled: false,
            theme: "light1",
            title: this.props.pageTitle,
            type: "column",

            axisXTitle: "Metai",
            axisXLabelAngle: 0,
            axisXGridThickness: 0,

            axisYTitle: "Taškų skaičius, vnt.",
            axisYLabelAngle: 0,
            axisYGridThickness: 1,
            axisYMinimum: 0,
            axisYMaximum: '',
            axisYInterval: 50,

            axisY2Title: "Lenktynių skaičius, vnt.",
            axisY2LabelAngle: 0,
            axisY2Interval: 2
        };

        this.fillData = this.fillData.bind(this);
        this.handleOptionsChange = this.handleOptionsChange.bind(this);
        this.setDefaultValues = this.setDefaultValues.bind(this);
        this.updateWindowSize = this.updateWindowSize.bind(this);
    }

    fillData(data) {
        this.setState({
            winnerPoints: data
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

    setDefaultValues(callback) {
        this.setState({
            interactivityEnabled: true,
            exportFileName: this.props.pageTitle,
            zoomEnabled: false,
            theme: "light1",
            title: this.props.pageTitle,
            type: "column",

            axisXTitle: "Metai",
            axisXLabelAngle: 0,
            axisXGridThickness: 0,

            axisYTitle: "Taškų skaičius, vnt.",
            axisYLabelAngle: 0,
            axisYGridThickness: 1,
            axisYMinimum: 0,
            axisYMaximum: '',
            axisYInterval: 50,

            axisY2Title: "Lenktynių skaičius, vnt.",
            axisY2LabelAngle: 0,
            axisY2Interval: 2
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
        var canvas = document.getElementsByTagName("canvas")[0];
        
        if (canvas) {
            var context = canvas.getContext("2d");
            context.fillStyle = "grey";
            context.font = "10px verdana";
            var text = "Lenktynių rezultatų portalas";
            context.fillText(text, 10, canvas.height - 15);
        }
    }

    componentDidMount() {
        window.addEventListener('resize', this.updateWindowSize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowSize);
    }

    render() {
        if (this.state.winnerPoints.length > 0) {
            var data = this.state.winnerPoints.map(x => ({ label: x.season, x: x.season, y: x.points, winner: x.winner }));
            
            if (this.state.axisYMaximum === '') {
                var defaultMaximum = -1;
                for (let i = 0; i < this.state.winnerPoints.length; i++) {
                    if (defaultMaximum < this.state.winnerPoints[i].points) {
                        defaultMaximum = this.state.winnerPoints[i].points;
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
                    text: this.state.title
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
                    valueFormatString: " "
                },
                axisY: {
                    title: this.state.axisYTitle,
                    minimum: this.state.axisYMinimum,
                    maximum: this.state.axisYMaximum !== '' ? this.state.axisYMaximum : defaultMaximum,
                    interval: this.state.axisYInterval,
                    labelAngle: this.state.axisYLabelAngle,
                    gridThickness: this.state.axisYGridThickness
                },
                toolTip:{   
                    contentFormatter: "",
                    content: "Laimėtojas {label} metais: {winner} ({y} taškų)" 
                }
            };

            if (this.state.type === "line") {
                var racesData = this.state.winnerPoints.map(x => ({ label: x.season, x: x.season, y: x.racesCount }));

                if (this.state.axisY2Maximum === '') {
                    var defaultMaximum2 = -1;
                    for (let i = 0; i < this.state.winnerPoints.length; i++) {
                        if (defaultMaximum2 < this.state.winnerPoints[i].racesCount) {
                            defaultMaximum2 = this.state.winnerPoints[i].racesCount;
                        }
                    }
    
                    defaultMaximum2 = defaultMaximum2 % this.state.axisYInterval === 0 ? defaultMaximum2 : (defaultMaximum2 + (this.state.axisYInterval - (defaultMaximum2 % this.state.axisYInterval)));
                }

                options["axisY"]["titleFontColor"] = "#4F81BC";
                options["axisY"]["lineColor"] = "#4F81BC";
                options["axisY"]["labelFontColor"] = "#4F81BC";
                options["axisY"]["tickColor"] = "#4F81BC";
                options["axisY2"] = {};
                options["axisY2"]["title"] = this.state.axisY2Title;
                options["axisY2"]["minimum"] = 0;
                options["axisY2"]["interval"] = this.state.axisY2Interval;
                options["axisY2"]["labelAngle"] = this.state.axisY2LabelAngle;
                options["axisY2"]["titleFontColor"] = "#C0504E";
                options["axisY2"]["lineColor"] = "#C0504E";
                options["axisY2"]["labelFontColor"] = "#C0504E";
                options["axisY2"]["tickColor"] = "#C0504E";
                options["data"][0]["showInLegend"] = true;
                options["data"][0]["name"] = "Taškų skaičius";
                options["data"].push({ type: "line", showInLegend: true, name: "Lenktynių skaičius", axisYType: "secondary", dataPoints: racesData });
                options["toolTip"]["shared"] = true;
                options["toolTip"]["contentFormatter"] = function (e) {
                        var content = "";
                        content += "Laimėtojas " + e.entries[0].dataPoint.label + " metais: " + e.entries[0].dataPoint.winner + " (" + e.entries[0].dataPoint.y + " taškų)<br />";
                        content += "Lenktynių skaičius " + e.entries[1].dataPoint.label + " metais: " + e.entries[1].dataPoint.y;
                        return content;
                    }
                options["legend"] = {};
                options["legend"]["cursor"] = "pointer";
                options["legend"]["itemclick"] = function (e) {
                    if (e.dataSeries.name === "Taškų skaičius") {
                        return;
                    }
                    if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                        e.chart.options["axisY2"] = {};
                        e.dataSeries.visible = false;
                    }
                    else {
                        e.chart.options["axisY2"]["title"] = "Lenktynių skaičius, vnt.";
                        e.chart.options["axisY2"]["minimum"] = 0;
                        e.chart.options["axisY2"]["interval"] = 2;
                        e.chart.options["axisY2"]["labelAngle"] = 0;
                        e.chart.options["axisY2"]["titleFontColor"] = "#C0504E";
                        e.chart.options["axisY2"]["lineColor"] = "#C0504E";
                        e.chart.options["axisY2"]["labelFontColor"] = "#C0504E";
                        e.chart.options["axisY2"]["tickColor"] = "#C0504E";
                        e.dataSeries.visible = true;
                    }
                    e.chart.render();
                }
            }
        }

        return (
            <div>
                <h1>{this.props.pageTitle}</h1>
                <br />
                <DataRangeForm api={this.props.api} callback={this.fillData} />
                <br />
                {
                    this.state.winnerPoints.length > 0 &&
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
                                    types={[{type: "column", name: "Stulpelinė"}, {type: "line", name: "Linijinė"}]}
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
                                    secondaxis={this.state.type === "line" ? 1 : undefined}
                                    axisy2title={this.state.axisY2Title}
                                    axisy2labelangle={this.state.axisY2LabelAngle}
                                    axisy2interval={this.state.axisY2Interval}
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