import React, { Component } from 'react';
import { DataRangeForm } from '../../DataRangeForm';
import CanvasJSReact from '../../../canvasjs.react';
import { Button } from 'react-bootstrap';
import { ChartOptionsModal } from '../../ChartOptionsModal';
import { addWatermark, changeExportButtonsLanguage } from '../../../js/utils';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export class Leaders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            leaders: [],
            modalShow: false,

            interactivityEnabled: true,
            exportFileName: this.props.pageTitle,
            zoomEnabled: false,
            theme: "light1",
            title: this.props.pageTitle,
            type: "column",

            axisXTitle: this.props.axisName,
            axisXTitle2: "Metai",
            axisXLabelAngle: -90,
            axisXGridThickness: 0,

            axisYTitle: "Pirmavimų skaičius, vnt.",
            axisYLabelAngle: 0,
            axisYGridThickness: 1,
            axisYMinimum: 0,
            axisYMaximum: '',
            axisYInterval: 200
        };

        this.fillData = this.fillData.bind(this);
        this.calculateTotalLaps = this.calculateTotalLaps.bind(this);
        this.handleOptionsChange = this.handleOptionsChange.bind(this);
        this.setDefaultValues = this.setDefaultValues.bind(this);
        this.updateWindowSize = this.updateWindowSize.bind(this);
    }

    fillData(data) {
        this.setState({
            leaders: data
        });
    }

    calculateTotalLaps(leaders) {
        var totalLaps = 0;

        leaders.forEach(leader => {
            totalLaps += leader.leadingLapCount
        });

        return totalLaps;
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

            axisXTitle: this.props.axisName,
            axisXTitle2: "Metai",
            axisXLabelAngle: -90,
            axisXGridThickness: 0,

            axisYTitle: "Pirmavimų skaičius, vnt.",
            axisYLabelAngle: 0,
            axisYGridThickness: 1,
            axisYMinimum: 0,
            axisYMaximum: '',
            axisYInterval: 200
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
        if (this.state.leaders.length > 0) {
            if (this.state.type !== "stackedColumn") {
                var totalLaps = this.calculateTotalLaps(this.state.leaders);
                var data = this.state.leaders.map(x => ({ label: x.name, y: x.leadingLapCount, percentage: Math.round((x.leadingLapCount / totalLaps * 100) * 100) / 100 }));

                if (this.state.axisYMaximum === '') {
                    var defaultMaximum = -1;
                    for (let i = 0; i < this.state.leaders.length; i++) {
                        if (defaultMaximum < this.state.leaders[i].leadingLapCount) {
                            defaultMaximum = this.state.leaders[i].leadingLapCount;
                        }
                    }

                    defaultMaximum = defaultMaximum % this.state.axisYInterval === 0 ? defaultMaximum : (defaultMaximum + (this.state.axisYInterval - (defaultMaximum % this.state.axisYInterval)));
                }
            }
            else {
                var data = this.state.leaders.map(x => ({ type: "stackedColumn", showInLegend: true, name: x.name, dataPoints: x.leadingLapsByYear.map(yearLeadingLap => ({ label: yearLeadingLap.year, x: yearLeadingLap.year, y: yearLeadingLap.leadingLapCount })) }));

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
                    text: this.state.title
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