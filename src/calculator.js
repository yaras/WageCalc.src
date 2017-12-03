import React, { Component } from 'react';
import { Button } from 'reactstrap';

import Summary from './summary.js'

export default class Calculator extends Component {

    constructor() {
        super();

        this.state = {
            isCalculated: false,
            brutto: null,
            isBruttoValid: false,
            kosztyMiejscowe: 111.25,
            stawkaWypadkowe: 6.7,
            isStawkaWypadkoweValid: true
        };
    }

    calc() {
        this.setState({
            isCalculated: true            
        });
    }

    setBrutto(e) {
        var val = Number(e.target.value);

        if (val > 0) {
            this.setState({ brutto: val, isBruttoValid: true, isCalculated: false }  );
        } else {
            this.setState({ isBruttoValid: false })
        }
    }

    setKoszty(e) {
        var val = Number(e.target.value);
        this.setState({kosztyMiejscowe: val, isCalculated: false});
    }

    setWypadkowe(e) {
        var val = Number(e.target.value);

        if (val > 0) {
            this.setState({stawkaWypadkowe: val, isCalculated: false, isStawkaWypadkoweValid: true });
        } else {
            this.setState({ isStawkaWypadkoweValid: false })
        }
    }

    render() {
        return <div className="container" style={{ 'textAlign': 'center' }}>
            <form onSubmit={e => { e.preventDefault(); this.calc() } }>
            
                <div className="input-group mb-2 mr-sm-2 mb-sm-0">                
                    <div className="input-group-addon">Pensja brutto</div>
                    <input
                        type="number"
                        className={this.state.isValueValid ? "form-control" : "form-control is-invalid " }
                        onChange={e => this.setBrutto(e)} />
                    <div className="input-group-addon">zł</div>
                </div>

                <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                    <div className="input-group-addon">Koszty miejscowe</div>

                    <select className="form-control" onChange={e => this.setKoszty(e)}>
                        <option value="111.25">111.25</option>
                        <option value="139.06">139.06</option>
                    </select>

                    <div className="input-group-addon">zł</div>
                </div>

                <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                    <div className="input-group-addon">Stawka wypadkowe</div>
                    <input
                        type="number"
                        className={this.state.isValueValid ? "form-control" : "form-control is-invalid " }
                        defaultValue="6.7"
                        onChange={e => this.setWypadkowe(e)} />
                    <div className="input-group-addon">%</div>
                </div>
            </form>

            <div className="row align-items-center" style={{ marginTop: '10px' }}>
                <Button disabled={!this.state.isBruttoValid || !this.state.isStawkaWypadkoweValid} 
                    onClick={e => this.calc()} className="btn btn-success btn-lg" >Wylicz</Button>
            </div>

            { this.state.isCalculated && <Summary brutto={this.state.brutto} kosztyMiejscowe={this.state.kosztyMiejscowe} stawkaWypadkowe={this.state.stawkaWypadkowe} /> }
        </div>;
    }
}