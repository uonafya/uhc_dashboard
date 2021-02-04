/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default class YearsDropDown extends React.Component {

    constructor() {
        super();
        this.state = {
            showModal: false,
            currenTperiod: new Date().getFullYear() - 1,
            years: [],
        };

    }

    componentDidMount() {
        //fetch counties handlePeriodChange
        let years = [];
        let max = new Date().getFullYear()
        let min = max - 11
        for (var i = min; i <= max; i++) {
            let yrValue = { 'title':  `${i}` };
            years.push(yrValue);
        }
        this.setState({
            years: years
        });
        console.log(years);
    }


    


    render() {
        return (
            <Autocomplete
                id="counties-combo-box"
                size="small"
                value={this.state.selectedVal}
                onChange={(event, newValue) => {
                    if (newValue == null || newValue == undefined) newValue = new Date().getFullYear() - 1;
                    this.setState({
                        selectedVal: newValue
                    });
                    this.props.handlePeriodChange(newValue.title);
                }}
                options={this.state.years}
                getOptionLabel={(option) => option.title}
                style={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Period" variant="outlined" />}
            />
        );
    }

}


