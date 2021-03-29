import React, { Component } from 'react';
import { DataRangeForm } from '../../DataRangeForm';
import CanvasJSReact from '../../../canvasjs.react';
import { Button, ButtonGroup, ToggleButton } from 'react-bootstrap';
import { ChartOptionsModal } from '../../ChartOptionsModal';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export class LapTimes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            seasons: [],
            lapTimes: [],
            season: 0,
            round: 0,
            raceName: "",
            isLoading: false,
            modalShow: false,

            interactivityEnabled: true,
            exportFileName: this.props.pageTitle,
            zoomEnabled: false,
            theme: "light1",
            title: this.props.pageTitle,
            type: "line",

            axisXTitle: "Lenktynininkas",
            axisXLabelAngle: -90,
            axisXGridThickness: 0,

            axisYTitle: "Laikas, s",
            axisYLabelAngle: 0,
            axisYGridThickness: 1,
            axisYMinimum: 50,
            axisYMaximum: '',
            axisYInterval: 10,
        };

        this.fillData = this.fillData.bind(this);
        this.fillSeasons = this.fillSeasons.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleOptionsChange = this.handleOptionsChange.bind(this);
        this.setDefaultValues = this.setDefaultValues.bind(this);
        this.updateWindowSize = this.updateWindowSize.bind(this);
        this.formatTime = this.formatTime.bind(this);
    }

    fillData() {
        this.setState({
            isLoading: true
        });

        fetch('http://localhost:55032/api/misc/' + this.state.season + '/' + this.state.round + '/laptimes', 
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(result => {
            this.setState({
                lapTimes: result,
                isLoading: false,
                title: "Lenktynininkų apvažiuotų ratų laikai " + this.state.season + " " + this.state.raceName + " metu",
                exportFileName: "Lenktynininkų apvažiuotų ratų laikai " + this.state.season + " " + this.state.raceName + " metu"
            });
        });
    }

    fillSeasons(data) {
        this.setState({
            seasons: data,
        }, () => {
            this.setState({
                lapTimes: [],
                title: "",
                exportFileName: ""
            })
        });
    }

    handleClick(event) {
        event.preventDefault();

        var args = event.currentTarget.value.split("-");
        var season = args[0];
        var round = args[1];
        var raceName = args[2];

        this.setState({
            season: season,
            round: round,
            raceName: raceName
        }, () => {
            this.fillData();
        });
    }

    handleOptionsChange(event) {
        const { name, value, checked, type } = event.target;
        var valueToUpdate = type === 'checkbox' ? checked : value;
        
        if (name === 'axisYInterval' || name === 'axisXInterval') {
            valueToUpdate = parseInt(value);
        }

        this.setState({
            [name]: valueToUpdate
        });
    }

    setDefaultValues(callback) {
        this.setState({
            interactivityEnabled: true,
            exportFileName: "Lenktynininkų apvažiuotų ratų laikai " + this.state.season + " " + this.state.raceName + " metu",
            zoomEnabled: false,
            theme: "light1",
            title: "Lenktynininkų apvažiuotų ratų laikai " + this.state.season + " " + this.state.raceName + " metu",
            type: "line",

            axisXTitle: "Lenktynininkas",
            axisXLabelAngle: 0,
            axisXGridThickness: 0,

            axisYTitle: "Laikas, s",
            axisYLabelAngle: 0,
            axisYGridThickness: 1,
            axisYMinimum: 1,
            axisYMaximum: ''
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

    formatTime(timing) {
        let minutes = Math.floor(timing / 60);
        let seconds = Math.round((timing - 60 * minutes) * 1000) / 1000;

        let time = minutes + ":" + seconds;

        return time;
    }

    render() {
        if (this.state.lapTimes.length > 0) {
            var data = this.state.lapTimes.map((x, index) => ({ type: "scatter", dataPoints: x.timings.map(timing => ({ label: x.name, x: index + 1, y: timing, laptime: this.formatTime(timing) })) } ));

            if (this.state.axisYMaximum === '') {
                var defaultYMaximum = -1;
                for (let i = 0; i < data.length; i++) {
                    for (let j = 0; j < data[i].dataPoints.length; j++) {
                        if (defaultYMaximum < data[i].dataPoints[j].y) {
                            defaultYMaximum = data[i].dataPoints[j].y
                        }
                    }
                }
            }
            
            defaultYMaximum = defaultYMaximum + 5;

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
                data: data,
                axisX: {
                    title: this.state.axisXTitle,
                    labelAngle: this.state.axisXLabelAngle,
                    gridThickness: this.state.axisXGridThickness,
                    interval: 1,
                    minimum: 0,
                    maximum: data.length + 1,
                    labelMaxWidth: 80,
                    labelWrap: true,
                    valueFormatString: " "

                },
                axisY: {
                    title: this.state.axisYTitle,
                    minimum: this.state.axisYMinimum,
                    maximum: this.state.axisYMaximum !== '' ? this.state.axisYMaximum : defaultYMaximum,
                    interval: this.state.axisYInterval,
                    labelAngle: this.state.axisYLabelAngle,
                    gridThickness: this.state.axisYGridThickness
                },
                toolTip:{   
                    content: "{laptime}"
                }
            };
        }

        return (
            <div>
                <h1>{this.props.pageTitle}</h1>
                <br />
                <DataRangeForm api={this.props.api} callback={this.fillSeasons} />
                <br />
                {
                    this.state.seasons.length > 0 &&
                    <div>
                        {this.state.seasons.map(x => (
                            <div>
                                <ButtonGroup vertical>
                                    <p style={{margin: "auto"}}>{x.season}</p>
                                    {x.races.map(race => (
                                        <Button
                                            key={x.season + race.round}
                                            variant="secondary"
                                            value={x.season + '-' + race.round + '-' + race.raceName}
                                            onClick={this.handleClick}
                                            disabled={this.state.isLoading}

                                        >
                                            {race.raceName}
                                        </Button>
                                    ))}
                                </ButtonGroup>
                            </div>
                        ))}
                        <br/>
                        <br/>
                        {this.state.lapTimes.length > 0 &&
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
                                types={[{type: "line", name: "Linijinė"}]}
                                currenttype={this.state.type}
                                axisxtitle={this.state.axisXTitle}
                                axisxlabelangle={this.state.axisXLabelAngle}
                                axisxgridthickness={this.state.axisXGridThickness}
                                axisytitle={this.state.axisYTitle}
                                axisylabelangle={this.state.axisYLabelAngle}
                                axisygridthickness={this.state.axisYGridThickness}
                                axisyminimum={this.state.axisYMinimum}
                                axisymaximum={this.state.axisYMaximum !== '' ? this.state.axisYMaximum : defaultYMaximum}
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