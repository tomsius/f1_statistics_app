import React, { Component } from 'react';
import { DataRangeForm } from '../../DataRangeForm';
import CanvasJSReact from '../../../canvasjs.react';
import { Button } from 'react-bootstrap';
import { ChartOptionsModal } from '../../ChartOptionsModal';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export class WinnersByGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            winnersByGrid: [],
            modalShow: false,

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
            axisYInterval: -1
        };

        this.fillData = this.fillData.bind(this);
        this.handleOptionsChange = this.handleOptionsChange.bind(this);
    }

    fillData(data) {
        this.setState({
            winnersByGrid: data
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

    componentDidUpdate() {
        var canvas = document.getElementsByTagName("canvas")[0];
        var context = canvas.getContext("2d");
        context.fillStyle = "grey";
        context.font = "12px verdana";
        var text = "Lenktynių rezultatų portalas";
        context.fillText(text, 10, canvas.height - 15);
    }

    render() {
        if (this.state.winnersByGrid.length > 0) {
            var data = this.state.winnersByGrid.map(x => ({ label: x.gridPosition, y: x.winCount, winnersFromGrid: x.winners.filter((value, index, element) => element.indexOf(value) === index).join(", ") }));

            var defaultInterval = data[0].y <= 20 ? 1 : data[0].y <= 100 ? 5 : 20;

            if (this.state.axisYMaximum === '') {
                var defaultMaximum = -1;
                for (let i = 0; i < this.state.winnersByGrid.length; i++) {
                    if (defaultMaximum < this.state.winnersByGrid[i].winCount) {
                        defaultMaximum = this.state.winnersByGrid[i].winCount;
                    }
                }
    
                var interval = this.state.axisYInterval !== -1 ? this.state.axisYInterval : defaultInterval;
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
                    gridThickness: this.state.axisXGridThickness
                },
                axisY: {
                    title: this.state.axisYTitle,
                    minimum: this.state.axisYMinimum,
                    maximum: this.state.axisYMaximum !== '' ? this.state.axisYMaximum : defaultMaximum,
                    interval: this.state.axisYInterval !== -1 ? this.state.axisYInterval : defaultInterval,
                    labelAngle: this.state.axisYLabelAngle,
                    gridThickness: this.state.axisYGridThickness
                },
                toolTip:{   
                    content: "Laimėtojai iš {label}-os starto pozicijos (laimėjimų skaičius: {y}): {winnersFromGrid}"
                }
            };
        }

        return (
            <div>
                <h2>{this.props.pageTitle}</h2>
                <br />
                <DataRangeForm api={this.props.api} callback={this.fillData} />
                <br />
                {
                    this.state.winnersByGrid.length > 0 &&
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
                            title={this.state.title}
                            exportfilename={this.state.exportFileName}
                            interactivityenabled={this.state.interactivityEnabled ? 1 : 0}
                            themes={[{value: "light1", content: "Light1"}, {value: "light2", content: "Light2"}, {value: "dark1", content: "Dark1"}, {value: "dark2", content: "Dark2"}]}
                            currenttheme={this.state.theme}
                            types={[{type: "column", name: "Stulpelinė"}]}
                            currenttype={this.state.type}
                            //zoomenabled={this.state.zoomEnabled ? 1 : 0}
                            axisxtitle={this.state.axisXTitle}
                            axisxlabelangle={this.state.axisXLabelAngle}
                            axisxgridthickness={this.state.axisXGridThickness}
                            axisytitle={this.state.axisYTitle}
                            axisylabelangle={this.state.axisYLabelAngle}
                            axisygridthickness={this.state.axisYGridThickness}
                            axisyminimum={this.state.axisYMinimum}
                            axisymaximum={this.state.axisYMaximum !== '' ? this.state.axisYMaximum : defaultMaximum}
                            axisyinterval={this.state.axisYInterval !== -1 ? this.state.axisYInterval : defaultInterval}
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