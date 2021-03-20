import React, { Component } from 'react';
import { DataRangeForm } from '../../DataRangeForm';
import CanvasJSReact from '../../../canvasjs.react';
import { Button } from 'react-bootstrap';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export class WinnersNationalities extends Component {
    constructor(props) {
        super(props);
        this.state = {
            winnersNationalities: [],
            isBarChart: true,
            isVisible: false
        };

        this.fillData = this.fillData.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.calculateTotalWinners = this.calculateTotalWinners.bind(this);
    }

    fillData(data) {
        this.setState({
            winnersNationalities: data
        });
    }

    handleClick() {
        var newChart = !this.state.isBarChart;

        this.setState({
            isBarChart: newChart
        });
    }

    calculateTotalWinners(winnersNationalities) {
        var totalWinners = 0;

        winnersNationalities.forEach(winner => {
            totalWinners += winner.winnersCount
        });

        return totalWinners;
    }

    render() {
        if (this.state.winnersNationalities.length > 0) {
            var totalWinners = this.calculateTotalWinners(this.state.winnersNationalities);
            var data = this.state.winnersNationalities.map(x => ({ label: x.nationality, y: x.winnersCount, percentage: Math.round((x.winnersCount / totalWinners * 100) * 100) / 100, drivers: x.winners.filter((value, index, element) => element.indexOf(value) === index).join(", ") }));

            var options;

            if (this.state.isBarChart) {
                options = {
                    title: {
                        text: this.props.pageTitle
                    },
                    data: [
                        {
                            type: "column",
                            dataPoints: data
                        }
                    ],
                    axisX:{
                        title: "Pilietybė",
                        labelAngle: 30,
                        interval: 1,
                        labelMaxWidth: 70,
                        labelWrap: true,
                        valueFormatString: " "
                    },
                    axisY: {
                        title: "Laimėtojų skaičius, vnt.",
                        interval: 1,
                        minimum: 0
                    },
                    toolTip:{   
                        content: "{label} ({y}): {drivers}"      
                    }
                };
            }
            else {
                options = {
                    title: {
                        text: this.props.pageTitle
                    },
                    data: [
                        {
                            type: "pie",
                            indexLabel: "{label} {y}",
                            dataPoints: data
                        }
                    ],
                    toolTip:{   
                        content: "{label} ({percentage}%): {drivers}"      
                    }
                };
            }
        }

        return (
            <div>
                <h2>{this.props.pageTitle}</h2>
                <br />
                <DataRangeForm api={this.props.api} callback={this.fillData} />
                <br />
                {
                    this.state.winnersNationalities.length > 0 &&
                    <div>
                        <Button variant="primary" onClick={this.handleClick} disabled={this.state.isVisible}>
                            {this.state.isBarChart ? "Rodyti skritulinę diagramą" : "Rodyti stulpelinę diagramą"}
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