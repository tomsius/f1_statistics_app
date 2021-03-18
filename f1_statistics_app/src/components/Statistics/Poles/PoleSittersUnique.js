import React, { Component } from 'react';
import { DataRangeForm } from '../../DataRangeForm';
import CanvasJSReact from '../../../canvasjs.react';
import { Button } from 'react-bootstrap';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export class PoleSittersUnique extends Component {
    constructor(props) {
        super(props);
        this.state = {
            poleSittersUnique: [],
            isBarChart: true
        };

        this.fillData = this.fillData.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    fillData(data) {
        this.setState({
            poleSittersUnique: data
        });
    }

    handleClick() {
        var newChart = !this.state.isBarChart;

        this.setState({
            isBarChart: newChart
        });
    }

    render() {
        if (this.state.poleSittersUnique.length > 0) {
            var data = this.state.poleSittersUnique.map(x => ({ label: x.season, y: x.uniquePoleSittersCount, poleSitters: x.poleSitters.join(", ") }));
            var options;

            if (this.state.isBarChart) {
                options = {
                    title: {
                        text: this.props.pageTitle
                    },
                    toolTip: {
                        content: "Skirtingi „pole“ pozicijos laimėtojai ({y}): {poleSitters}"
                    },
                    axisY: {
                        title: "Skirtingų „pole“ pozicijos laimėtojų skaičius, vnt.",
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
                        content: "Skirtingi „pole“ pozicijos laimėtojai ({y}): {poleSitters}"
                    },
                    axisY: {
                        title: "Skirtingų „pole“ pozicijos laimėtojų skaičius, vnt.",
                        interval: 1,
                        minimum: 0
                    },
                    data: [
                        {
                            type: "line",
                            dataPoints: data
                        }
                    ],
                    axisX:{
                        title: "Metai",
                        labelAngle: 30,
                        interval: 1,
                        valueFormatString: " "
                        
                    }
                };
            }
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
                    this.state.poleSittersUnique.length > 0 &&
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