import React,{Component} from 'react';
import {DataRangeForm} from '../../DataRangeForm';

export class DriverWins extends Component {
    constructor(props) {
        super(props);
        this.state = {
            winners: []
        };

        this.fillData = this.fillData.bind(this);
    }

    fillData(data){
        this.setState({
            winners: data
        });
    }

    render() {
        return (
            <div>
                <h2>{this.props.pageTitle}</h2>
                <br/>
                <DataRangeForm api={this.props.api} callback={this.fillData}/>
            </div>
        );
    }
}