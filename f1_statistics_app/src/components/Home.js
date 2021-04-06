import React, { Component } from 'react';

export class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <br />
                <h1>F-1 lenktynių rezultatų portalas</h1>
                <h2>Bakalaurinis darbas</h2>
                <br />
                <p>
                    Bakalaurinio darbo tikslas - agreguoti įvairias „Formula 1“ statistikas ir pateikti jas vizualiai.
                    <br />
                    Duomenys imami iš <a href="https://ergast.com/mrd/" target="_blank"><i>Ergast Developer API</i></a>.
                    <br />
                    Front-end technologijos:
                </p>
                    <ol>
                        <li><a href="https://reactjs.org" target="_blank"><i>React.</i></a> Naudotojo sąsajos kūrimui.</li>
                        <li><a href="https://canvasjs.com/docs/charts/integration/react" target="_blank"><i>CanvasJS.</i></a> Grafikų piešimui.</li>
                        <li><a href="https://reactrouter.com/web/guides/quick-start" target="_blank"><i>React Router.</i></a> Maršrutizavimui.</li>
                        <li><a href="https://react-bootstrap.github.io" target="_blank"><i>Bootstrap.</i></a> Naudotojo sąsajos išvaizdos keitimui.</li>
                        <li><a href="https://codeseven.github.io/toastr" target="_blank"><i>Toastr.</i></a> Informacinių pranešimų rodymui.</li>
                        <li><a href="" target="_blank"><i style={{ color:"red", fontWeight: "bold" }}>TODO: Pridėti testavimo įrankį</i></a> Portalo testavimui.</li>
                    </ol>
                <p>
                    Back-end technologijos:
                </p>
                    <ol>
                        <li><a href="https://docs.microsoft.com/en-us/aspnet/core/web-api/?view=aspnetcore-5.0" target="_blank"><i>.NET Core Web Api.</i></a> API kūrimui.</li>
                        <li><a href="https://restsharp.dev" target="_blank"><i>RestSharp.</i></a> Duomenų paėmimui iš Ergast Developer API.</li>
                        <li><a href="https://docs.microsoft.com/en-us/dotnet/core/testing/unit-testing-with-mstest" target="_blank"><i>MSTest.</i></a> Vienetų testų rašymui.</li>
                        <li><a href="https://github.com/Moq/moq4/wiki/Quickstart" target="_blank"><i>Moq.</i></a> Netikrų objektų, reikalingų vienetų testavimui, kūrimui.</li>
                        <li><a href="https://marketplace.visualstudio.com/items?itemName=FortuneNgwenya.FineCodeCoverage" target="_blank"><i>Fine Code Coverage.</i></a> Vienetų testų kodo padengimui.</li>
                    </ol>
            </div>
        );
    }
}