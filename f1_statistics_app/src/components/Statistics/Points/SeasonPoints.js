import React, { Component } from 'react';
import { DataRangeForm } from '../../DataRangeForm';
import CanvasJSReact from '../../../canvasjs.react';
import { Button, ButtonGroup, Dropdown, DropdownButton } from 'react-bootstrap';
import { ChartOptionsModal } from '../../ChartOptionsModal';
import { addWatermark, changeExportButtonsLanguage } from '../../../js/utils';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export class SeasonPoints extends Component {
    constructor(props) {
        super(props);
        this.state = {
            seasonPoints: [],
            selectedSeason: 0,
            modalShow: false,

            interactivityEnabled: true,
            exportFileName: "",
            zoomEnabled: false,
            theme: "light1",
            title: "",
            type: "column",

            axisXTitle: this.props.axisName,
            axisXLabelAngle: 0,
            axisXGridThickness: 0,

            axisYTitle: "Taškų skaičius, vnt.",
            axisYLabelAngle: 0,
            axisYGridThickness: 1,
            axisYMinimum: 0,
            axisYMaximum: '',
            axisYInterval: 50,

            titleFont: "Calibri",
            axisXFont: "Calibri",
            axisYFont: "Calibri"
        };

        this.fillData = this.fillData.bind(this);
        this.handleSeasonChangeClick = this.handleSeasonChangeClick.bind(this);
        this.handleOptionsChange = this.handleOptionsChange.bind(this);
        this.setDefaultValues = this.setDefaultValues.bind(this);
        this.updateWindowSize = this.updateWindowSize.bind(this);
    }

    fillData(data) {
        this.setState({
            seasonPoints: data,
            selectedSeason: 0,
            title: "",
            exportFileName: ""
        });
    }

    handleSeasonChangeClick(eventKey, event) {
        event.preventDefault();

        this.setState({
            selectedSeason: parseInt(eventKey),
            title: this.props.pageTitle + " " + eventKey + " metais",
            exportFileName: this.props.pageTitle + " " + eventKey + " metais"
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
            exportFileName: this.props.pageTitle + " " + this.state.selectedSeason + " metais",
            title: this.props.pageTitle + " " + this.state.selectedSeason + " metais",
            zoomEnabled: false,
            theme: "light1",
            type: "column",

            axisXTitle: this.props.axisName,
            axisXLabelAngle: 0,
            axisXGridThickness: 0,

            axisYTitle: "Taškų skaičius, vnt.",
            axisYLabelAngle: 0,
            axisYGridThickness: 1,
            axisYMinimum: 0,
            axisYMaximum: '',
            axisYInterval: 50,

            titleFont: "Calibri",
            axisXFont: "Calibri",
            axisYFont: "Calibri"
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
        if (this.state.seasonPoints.length > 0 && this.state.selectedSeason !== 0) {
            var data = this.state.seasonPoints.filter(x => x.year == this.state.selectedSeason).map(x => x.scoredPoints)[0].map((x, index) => ({ label: x.name, x: index + 1, y: x.points }));
            data = data.map(x => ({ label: x.label, y: x.y, percentage: Math.round((x.y / this.state.seasonPoints.filter(x => x.year == this.state.selectedSeason)[0].totalPoints * 100) * 100) / 100 }));

            if (this.state.axisYMaximum === '') {
                var defaultMaximum = -1;
                for (let i = 0; i < data.length; i++) {
                    if (defaultMaximum < data[i].y) {
                        defaultMaximum = data[i].y;
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
                    text: this.state.title,
                    fontFamily: this.state.titleFont
                },
                data: [
                    {
                        type: this.state.type,
                        dataPoints: data,
                        indexLabel: this.state.type === 'column' ? "" : "{label} {y}"
                    }
                ],
                axisX: {
                    title: this.state.axisXTitle,
                    labelAngle: this.state.axisXLabelAngle,
                    interval: 1,
                    gridThickness: this.state.axisXGridThickness,
                    valueFormatString: " ",
                    labelMaxWidth: 80,
                    labelWrap: true,
                    titleFontFamily: this.state.axisXFont,
                    labelFontFamily: this.state.axisXFont
                },
                axisY: {
                    title: this.state.axisYTitle,
                    minimum: this.state.axisYMinimum,
                    maximum: this.state.axisYMaximum !== '' ? this.state.axisYMaximum : defaultMaximum,
                    interval: this.state.axisYInterval,
                    labelAngle: this.state.axisYLabelAngle,
                    gridThickness: this.state.axisYGridThickness,
                    titleFontFamily: this.state.axisYFont,
                    labelFontFamily: this.state.axisYFont
                },
                toolTip: {
                    content: this.state.type === 'column' ? "{label}: {y}" : "{label}: {percentage}%"
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
                    this.state.seasonPoints.length > 0 &&
                    <div>
                        <ButtonGroup>
                            <DropdownButton as={ButtonGroup} title="Sezonai" id="bg-nested-dropdown" onSelect={this.handleSeasonChangeClick} variant="secondary">
                                {this.state.seasonPoints.map((season, index) => {
                                    if (season.year === this.state.selectedSeason) {
                                        return <Dropdown.Item key={index} eventKey={season.year} active>
                                                    {season.year}
                                                </Dropdown.Item>
                                    }
                                    else {
                                        return <Dropdown.Item key={index} eventKey={season.year}>
                                                    {season.year}
                                                </Dropdown.Item>
                                    }
                                })}
                            </DropdownButton>
                        </ButtonGroup>
                        <br />
                        <br />
                        {this.state.selectedSeason !== 0 &&
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
                                    types={[{ type: "column", name: "Stulpelinė" }, { type: "pie", name: "Skritulinė" }]}
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
                                    fonts={["Calibri", "Optima", "Candara", "Verdana", "Geneva"]}
                                    currenttitlefont={this.state.titleFont}
                                    currentaxisxfont={this.state.axisXFont}
                                    currentaxisyfont={this.state.axisYFont}
                                />
                                <br />
                                <br />
                                <div style={{ position: "relative", right: "6em" }}>
                                    <CanvasJSChart options={options} />
                                </div>
                            </div>
                        }
                    </div>
                }
            </div>
        );
    }
}