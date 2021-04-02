import React, { Component } from 'react';
import { DataRangeForm } from '../../DataRangeForm';
import CanvasJSReact from '../../../canvasjs.react';
import { Button, ButtonGroup, ToggleButton } from 'react-bootstrap';
import { ChartOptionsModal } from '../../ChartOptionsModal';
import { addWatermark, changeExportButtonsLanguage } from '../../../js/utils';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export class DriversFinishingPositions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            finishingPositions: [],
            selectedDriver: "",
            modalShow: false,

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
            axisYInterval: ''
        };

        this.fillData = this.fillData.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleOptionsChange = this.handleOptionsChange.bind(this);
        this.setDefaultValues = this.setDefaultValues.bind(this);
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

    handleClick(event) {
        event.preventDefault();

        this.setState({
            selectedDriver: event.currentTarget.value,
            title: event.currentTarget.value + " finišavimo pozicijos",
            exportFileName: event.currentTarget.value + " finišavimo pozicijos"
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
            axisYInterval: ''
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
        if (this.state.finishingPositions.length > 0 && this.state.selectedDriver !== "") {
            var data = this.state.finishingPositions.filter(x => x.name == this.state.selectedDriver).map(x => x.finishingPositions)[0].map((x, index) => ({ label: x.finishingPosition, x: index + 1, y: x.count }));

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
                    interval: this.state.axisYInterval !== '' ? this.state.axisYInterval : defaultInterval,
                    labelAngle: this.state.axisYLabelAngle,
                    gridThickness: this.state.axisYGridThickness
                },
                toolTip:{   
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
                        <ButtonGroup toggle vertical>
                            {this.state.finishingPositions.map((driver) => (
                                <ToggleButton
                                    key={driver.name}
                                    type="radio"
                                    variant="secondary"
                                    name="radio"
                                    value={driver.name}
                                    checked={this.state.selectedDriver === driver.name}
                                    onChange={this.handleClick}
                                >
                                    {driver.name}
                                </ToggleButton>
                            ))}
                        </ButtonGroup>
                        <br />
                        <br />
                        {this.state.selectedDriver !== "" &&
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
                                types={[{type: "column", name: "Stulpelinė"}]}
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