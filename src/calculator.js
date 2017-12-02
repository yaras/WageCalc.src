import React, { Component } from 'react';
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import Summary from './summary.js'

export default class Calculator extends Component {

    constructor() {
        super();

        this.state = {
            isCalculated: false,
            brutto: null,
            isValueValid: true
        };
    }

    componentDidMount() {
        this.setState({
            isCalculated: true,
            brutto: 3000,
            isValueValid: true
        });
    }

    calc() {
        this.setState({
            isCalculated: true            
        });
    }

    setBrutto(e) {
        var val = e.target.value;

        if (val > 0) {
            this.setState({ brutto: val, isValueValid: true, isCalculated: false }  );
        } else {
            this.setState({ isValueValid: false })
        }
    }

    render() {
        return <div className="container" style={{ 'textAlign': 'center' }}>
            <form>
                <div className="row">                    
                    <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                        <div className="input-group-addon">Pensja brutto</div>

                        <input 
                            type="number" 
                            className={this.state.isValueValid ? "form-control" : "form-control is-invalid " }
                            id="inlineFormInputGroupUsername" placeholder="pensja" 
                            onChange={e => this.setBrutto(e)} />

                        <div className="input-group-addon">zł</div>
                    </div>

                    {!this.state.isValueValid && <div className="invalid-feedback">
                        Wprowadzona wartość jest niepoprawna
                    </div>}
                </div>
            </form>

            <div className="row align-items-center">
                    <Button disabled={this.state.brutto == null} onClick={e => this.calc()} className="btn btn-success btn-lg" >Wylicz</Button>
            </div>

            { this.state.isCalculated && <Summary brutto={this.state.brutto} /> }
        </div>;
    }
}