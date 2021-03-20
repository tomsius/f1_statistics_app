import React, { Component } from 'react';
import { DataRangeForm } from '../../DataRangeForm';
import CanvasJSReact from '../../../canvasjs.react';
import { Button } from 'react-bootstrap';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export class DriverNationalities extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nationalities: [],
            isBarChart: true,
            isVisible: false
        };

        this.fillData = this.fillData.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.calculateTotalDrivers = this.calculateTotalDrivers.bind(this);
    }

    fillData(data) {
        this.setState({
            nationalities: data
        });
    }

    handleClick() {
        var newChart = !this.state.isBarChart;

        this.setState({
            isBarChart: newChart
        });
    }

    calculateTotalDrivers(nationalities) {
        var totalDrivers = 0;

        nationalities.forEach(nationality => {
            totalDrivers += nationality.driversCount
        });

        return totalDrivers;
    }

    render() {
        if (this.state.nationalities.length > 0) {
            var totalDrivers = this.calculateTotalDrivers(this.state.nationalities);
            var data = this.state.nationalities.map(x => ({ label: x.nationality, y: x.driversCount, percentage: Math.round((x.driversCount / totalDrivers * 100) * 100) / 100, drivers: x.drivers.join(", ") }));
            
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
                        title: "Lenktynininkų skaičius, vnt."
                    },
                    toolTip:{   
                        content: "{label}: {drivers}"      
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
                    this.state.nationalities.length > 0 &&
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