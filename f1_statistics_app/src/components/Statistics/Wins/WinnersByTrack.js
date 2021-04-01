import React, { Component } from 'react';
import { DataRangeForm } from '../../DataRangeForm';
import CanvasJSReact from '../../../canvasjs.react';
import { Button, ButtonGroup, ToggleButton } from 'react-bootstrap';
import { ChartOptionsModal } from '../../ChartOptionsModal';
import { addWatermark } from '../../../js/utils';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export class WinnersByTrack extends Component {
    constructor(props) {
        super(props);

        this.state = {
            winnersByTrack: [],
            selectedTrack: "",
            modalShow: false,

            interactivityEnabled: true,
            exportFileName: this.props.pageTitle,
            zoomEnabled: false,
            theme: "light1",
            title: "",
            type: "column",

            axisXTitle: "Lenktynininkas",
            axisXLabelAngle: 0,
            axisXGridThickness: 0,

            axisYTitle: "Laimėjimų ir dalyvavimų skaičius, vnt.",
            axisYLabelAngle: 0,
            axisYGridThickness: 1,
            axisYMinimum: 0,
            axisYMaximum: '',
            axisYInterval: 1
        };

        this.fillData = this.fillData.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleOptionsChange = this.handleOptionsChange.bind(this);
        this.setDefaultValues = this.setDefaultValues.bind(this);
        this.updateWindowSize = this.updateWindowSize.bind(this);
    }

    fillData(data) {
        this.setState({
            winnersByTrack: data,
            selectedTrack: "",
            title: "",
            exportFileName: ""
        });
    }

    handleClick(event) {
        event.preventDefault();

        this.setState({
            selectedTrack: event.currentTarget.value,
            title: "„" + event.currentTarget.value + "“ trasoje laimėję lenktynininkai",
            exportFileName: "„" + event.currentTarget.value + "“ trasoje laimėję lenktynininkai"
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
            exportFileName: "„" + this.state.selectedTrack + "“ trasoje laimėję lenktynininkai",
            zoomEnabled: false,
            theme: "light1",
            title: "„" + this.state.selectedTrack + "“ trasoje laimėję lenktynininkai",
            type: "column",

            axisXTitle: "Lenktynininkas",
            axisXLabelAngle: 0,
            axisXGridThickness: 0,

            axisYTitle: "Laimėjimų ir dalyvavimų skaičius, vnt.",
            axisYLabelAngle: 0,
            axisYGridThickness: 1,
            axisYMinimum: 0,
            axisYMaximum: '',
            axisYInterval: 1
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
    }

    componentDidMount() {
        window.addEventListener('resize', this.updateWindowSize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowSize);
    }

    render() {
        if (this.state.winnersByTrack.length > 0 && this.state.selectedTrack !== "") {
            var data = this.state.winnersByTrack.filter(x => x.name == this.state.selectedTrack).map(x => x.winners)[0].map((x, index) => ({ label: x.name, x: index + 1, y: x.winCount }));
            var participationsData = this.state.winnersByTrack.filter(x => x.name == this.state.selectedTrack).map(x => x.winners)[0].map((x, index) => ({ label: x.name, x: index + 1, y: x.participationsCount }));

            if (this.state.axisYMaximum === '') {
                var defaultMaximum = -1;
                for (let i = 0; i < participationsData.length; i++) {
                    if (defaultMaximum < participationsData[i].y) {
                        defaultMaximum = participationsData[i].y;
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
                        showInLegend: true,
                        name: "Laimėjimai",
                        dataPoints: data
                    },
                    {
                        type: this.state.type,
                        showInLegend: true,
                        name: "Dalyvavimai",
                        dataPoints: participationsData
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
                legend: {
                    cursor:"pointer",
		            itemclick: function (e) {
                        if (e.dataSeries.name === "Laimėjimai") {
                            return;
                        }
                        if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                            e.dataSeries.visible = false;
                        }
                        else {
                            e.dataSeries.visible = true;
                        }
                        e.chart.render();
                    }
                },
                toolTip: {
                    shared: true
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
                    this.state.winnersByTrack.length > 0 &&
                    <div>
                        <ButtonGroup toggle vertical>
                            {this.state.winnersByTrack.map((track) => (
                                <ToggleButton
                                    key={track.name}
                                    type="radio"
                                    variant="secondary"
                                    name="radio"
                                    value={track.name}
                                    checked={this.state.selectedTrack === track.name}
                                    onChange={this.handleClick}
                                >
                                    {track.name}
                                </ToggleButton>
                            ))}
                        </ButtonGroup>
                        <br />
                        <br />
                        {this.state.selectedTrack !== "" &&
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
                                axisyinterval={this.state.axisYInterval}
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