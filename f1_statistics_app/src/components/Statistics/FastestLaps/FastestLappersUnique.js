import React, { Component } from 'react';
import { DataRangeForm } from '../../DataRangeForm';
import CanvasJSReact from '../../../canvasjs.react';
import { Button } from 'react-bootstrap';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export class FastestLappersUnique extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fastestLappersUnique: [],
            isBarChart: true
        };

        this.fillData = this.fillData.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    fillData(data) {
        this.setState({
            fastestLappersUnique: data
        });
    }

    handleClick() {
        var newChart = !this.state.isBarChart;

        this.setState({
            isBarChart: newChart
        });
    }

    render() {
        if (this.state.fastestLappersUnique.length > 0) {
            var data = this.state.fastestLappersUnique.map(x => ({ label: x.season, y: x.uniqueFastestLapsCount, fastest: x.fastestLapAchievers.join(", ") }));
            var options;

            if (this.state.isBarChart) {
                options = {
                    title: {
                        text: this.props.pageTitle
                    },
                    toolTip: {
                        content: "Skirtingi greičiausiai apvažiavę lenktynių ratą ({y}): {fastest}"
                    },
                    axisY: {
                        title: "Skirtingų greičiausiai apvažiavusių lenktynių ratą skaičius, vnt.",
                        interval: 1,
                        minimum: 0
                    },
                    axisX:{
                        title: "Metai",
                        labelAngle: 30,
                        interval: 1,
                        valueFormatString: " "
                    },
                    data: [
                        {
                            type: "column",
                            dataPoints: data
                        }
                    ]
                };
            }
            else {
                options = {
                    title: {
                        text: this.props.pageTitle
                    },
                    toolTip: {
                        content: "Skirtingi greičiausiai apvažiavę lenktynių ratą ({y}): {fastest}"
                    },
                    axisY: {
                        title: "Skirtingų greičiausiai apvažiavusių lenktynių ratą skaičius, vnt.",
                        interval: 1,
                        minimum: 0
                    },
                    axisX:{
                        title: "Metai",
                        labelAngle: 30,
                        interval: 1,
                        valueFormatString: " "
                    },
                    data: [
                        {
                            type: "line",
                            dataPoints: data
                        }
                    ]
                };
            }
        }

        return (
            <div>
                <h2>{this.props.pageTitle}</h2>
                <br />
                <p style={{color:"red", textAlign:"center"}}>*Greičiausių ratų duomenys prieinami tik nuo 2004 metų.</p>
                <br />
                <DataRangeForm api={this.props.api} callback={this.fillData} />
                <br />
                {
                    this.state.fastestLappersUnique.length > 0 &&
                    <div>
                        <Button variant="primary" onClick={this.handleClick} disabled={this.state.isVisible}>
                            {this.state.isBarChart ? "Rodyti linijinę diagramą" : "Rodyti stulpelinę diagramą"}
                        </Button>
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