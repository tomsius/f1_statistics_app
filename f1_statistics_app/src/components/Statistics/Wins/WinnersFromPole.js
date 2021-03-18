import React, { Component } from 'react';
import { DataRangeForm } from '../../DataRangeForm';
import CanvasJSReact from '../../../canvasjs.react';
import { Button } from 'react-bootstrap';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export class WinnersFromPole extends Component {
    constructor(props) {
        super(props);
        this.state = {
            winnersFromPole: [],
            isBarChart: true
        };

        this.fillData = this.fillData.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    fillData(data) {
        this.setState({
            winnersFromPole: data
        });
    }

    handleClick() {
        var newChart = !this.state.isBarChart;

        this.setState({
            isBarChart: newChart
        });
    }

    render() {
        var data = this.state.winnersFromPole.map(x => ({ label: x.season, y: x.winsFromPoleCount, winnersWithPole: x.winnersFromPole.filter((value, index, element) => element.indexOf(value) === index).join(", ") }));
        var options;

        if (this.state.isBarChart) {
            options = {
                title: {
                    text: this.props.pageTitle
                },
                toolTip: {
                    content: "Laimėtojai iš „pole“ pozicijos {label} metais (laimėjimų skaičius: {y}): {winnersWithPole}"
                },
                axisY: {
                    title: "Laimėjimų iš „pole“ pozicijos skaičius, vnt.",
                    interval: 1,
                    minimum: 0
                },
                axisX: {
                    title: "Metai"
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
                    content: "Laimėtojai iš „pole“ pozicijos {label} metais (laimėjimų skaičius: {y}): {winnersWithPole}"
                },
                axisY: {
                    title: "Laimėjimų iš „pole“ pozicijos skaičius, vnt.",
                    interval: 1,
                    minimum: 0
                },
                axisX: {
                    title: "Metai"
                },
                data: [
                    {
                        type: "line",
                        dataPoints: data
                    }
                ]
            };
        }

        return (
            <div>
                <h2>{this.props.pageTitle}</h2>
                <br />
                <p style={{color:"red", textAlign:"center"}}>*Pilni kvalifikacijos duomenys prieinami nuo 2003 metų.</p>
                <br />
                <DataRangeForm api={this.props.api} callback={this.fillData} />
                <br />
                {
                    this.state.winnersFromPole.length > 0 &&
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