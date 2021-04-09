import React, { Component } from 'react';
import { DataRangeForm } from '../../DataRangeForm';
import CanvasJSReact from '../../../canvasjs.react';
import { Button } from 'react-bootstrap';
import { ChartOptionsModal } from '../../ChartOptionsModal';
import { DataOptionsModal } from '../../DataOptionsModal';
import { addWatermark, changeExportButtonsLanguage } from '../../../js/utils';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export class HatTricks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hatTricks: null,
            chartOptionsModalShow: false,
            dataOptionsModalShow: false,

            interactivityEnabled: true,
            exportFileName: this.props.pageTitle,
            zoomEnabled: false,
            theme: "light1",
            title: this.props.pageTitle,
            type: "column",

            axisXTitle: "Lenktynininkas",
            axisXLabelAngle: 0,
            axisXGridThickness: 0,

            axisYTitle: "„Hat Trick“ skaičius, vnt.",
            axisYLabelAngle: 0,
            axisYGridThickness: 1,
            axisYMinimum: 0,
            axisYMaximum: '',
            axisYInterval: 5,
            
            titleFont: "Calibri",
            axisXFont: "Calibri",
            axisYFont: "Calibri",

            from: 0,
            to: '',
            selectedNationalities: []
        };

        this.fillData = this.fillData.bind(this);
        this.calculateTotalHatTricks = this.calculateTotalHatTricks.bind(this);
        this.handleOptionsChange = this.handleOptionsChange.bind(this);
        this.setDefaultValues = this.setDefaultValues.bind(this);
        this.setDefaultDataFilters = this.setDefaultDataFilters.bind(this);
        this.filterData = this.filterData.bind(this);
        this.getNationalities = this.getNationalities.bind(this);
        this.initializeNationalities = this.initializeNationalities.bind(this);
        this.updateWindowSize = this.updateWindowSize.bind(this);
    }

    fillData(data) {
        this.setState({
            hatTricks: data
        }, () => { this.initializeNationalities(this.getNationalities(this.state.hatTricks)) });
    }

    calculateTotalHatTricks(hatTricks) {
        var totalHatTricks = 0;

        hatTricks.forEach(hatTrick => {
            totalHatTricks += hatTrick.hatTrickCount
        });

        return totalHatTricks;
    }

    handleOptionsChange(event) {
        const { name, value, checked, type } = event.target;
        var valueToUpdate = type === 'checkbox' ? checked : value;
        
        if (name === 'axisYInterval') {
            valueToUpdate = parseInt(value);
        }

        if (name === 'selectedNationalities') {
            valueToUpdate = this.state.selectedNationalities;
            valueToUpdate.filter(x => x.nationality === value)[0].checked = checked;
        }

        this.setState({
            [name]: valueToUpdate
        });
    }

    setDefaultValues(callback) {
        this.setState({
            interactivityEnabled: true,
            exportFileName: this.props.pageTitle,
            zoomEnabled: false,
            theme: "light1",
            title: this.props.pageTitle,
            type: "column",

            axisXTitle: "Lenktynininkas",
            axisXLabelAngle: 0,
            axisXGridThickness: 0,

            axisYTitle: "„Hat Trick“ skaičius, vnt.",
            axisYLabelAngle: 0,
            axisYGridThickness: 1,
            axisYMinimum: 0,
            axisYMaximum: '',
            axisYInterval: 5,
            
            titleFont: "Calibri",
            axisXFont: "Calibri",
            axisYFont: "Calibri"
        }, () => {
            callback();
        });
    }

    setDefaultDataFilters(callback) {
        this.setState({
            from: 0,
            to: '',
            selectedNationalities: []
        }, () => {
            this.initializeNationalities(this.getNationalities(this.state.hatTricks));
            callback();
        });
    }

    filterData(data) {
        var filteredData = JSON.parse(JSON.stringify(data));

        this.state.selectedNationalities.forEach(selectedNationality => {
            if (selectedNationality.checked === false) {
                for (let i = 0; i < filteredData.length; i++) {
                    if (filteredData[i].nationality === selectedNationality.nationality) {
                        filteredData.splice(i, 1);
                        i--;
                    }
                }
            }
        });

        filteredData = filteredData.filter(hatTrick => hatTrick.hatTrickCount >= this.state.from);

        if (this.state.to !== '') {
            filteredData = filteredData.filter(hatTrick => hatTrick.hatTrickCount <= this.state.to);
        }

        return filteredData;
    }

    getNationalities(data) {
        var uniqueNationalities = new Set();

        data.forEach(hatTrick => {
            uniqueNationalities.add(hatTrick.nationality);
        });

        return [...uniqueNationalities];
    }

    initializeNationalities(nationalities) {
        var nationalityObjects = [];
        nationalities.forEach(nationality => {
            var nationalityObject = { nationality: nationality, checked: true };

            nationalityObjects.push(nationalityObject);
        });

        nationalityObjects.sort((a, b) => (a.nationality > b.nationality ? 1 : -1));

        this.setState({
            selectedNationalities: nationalityObjects
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
        if (this.state.hatTricks !== null) {
            var filteredData = this.filterData(this.state.hatTricks);
            var totalHatTricks = this.calculateTotalHatTricks(filteredData);
            var data = filteredData.map((x, index) => ({ label: x.name, x: index + 1, y: x.hatTrickCount, percentage: Math.round((x.hatTrickCount / totalHatTricks * 100) * 100) / 100 }));
            
            if (this.state.axisYMaximum === '') {
                var defaultMaximum = -1;
                for (let i = 0; i < filteredData.length; i++) {
                    if (defaultMaximum < filteredData[i].hatTrickCount) {
                        defaultMaximum = filteredData[i].hatTrickCount;
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
                toolTip:{   
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
                    this.state.hatTricks !== null &&
                    <div>
                        <Button variant="primary" onClick={() => this.setState({chartOptionsModalShow: true})}>
                            Keisti grafiko parinktis
                        </Button>
                        <ChartOptionsModal 
                            animation={false}
                            size="lg"
                            show={this.state.chartOptionsModalShow} 
                            onHide={() => this.setState({chartOptionsModalShow: false})} 
                            handleoptionschange={this.handleOptionsChange} 
                            setdefaultvalues={this.setDefaultValues}
                            title={this.state.title}
                            exportfilename={this.state.exportFileName}
                            interactivityenabled={this.state.interactivityEnabled ? 1 : 0}
                            themes={[{value: "light1", content: "Light1"}, {value: "light2", content: "Light2"}, {value: "dark1", content: "Dark1"}, {value: "dark2", content: "Dark2"}]}
                            currenttheme={this.state.theme}
                            types={[{type: "column", name: "Stulpelinė"}, {type: "pie", name: "Skritulinė"}]}
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
                        <Button variant="primary" onClick={() => this.setState({ dataOptionsModalShow: true })}>
                            Keisti duomenų parinktis
                        </Button>
                        <DataOptionsModal
                            animation={false}
                            size="lg"
                            show={this.state.dataOptionsModalShow}
                            onHide={() => this.setState({ dataOptionsModalShow: false })}
                            handleoptionschange={this.handleOptionsChange}
                            setdefaultdatafilters={this.setDefaultDataFilters}
                            from={this.state.from}
                            to={this.state.to !== '' ? this.state.to : Math.max.apply(Math, this.state.hatTricks.map(hatTrick => hatTrick.hatTrickCount))}
                            selectednationalities={this.state.selectedNationalities}
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