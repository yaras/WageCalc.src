import React, { Component } from 'react';
import { Button } from 'reactstrap';

import Summary from './summary.js'

export default class Calculator extends Component {

    constructor() {
        super();

        this.state = {
            isCalculated: false,
            brutto: null,
            isValueValid: false,
            kosztyMiejscowe: 111.25
        };
    }

    componentDidMount() {
        // this.setState({
        //     isCalculated: true,
        //     brutto: 13000,
        //     isValueValid: true,
        //     kosztyMiejscowe: 139.06
        // });
    }

    calc() {
        this.setState({
            isCalculated: true            
        });
    }

    setBrutto(e) {
        var val = Number(e.target.value);

        if (val > 0) {
            this.setState({ brutto: val, isValueValid: true, isCalculated: false }  );
        } else {
            this.setState({ isValueValid: false })
        }
    }

    setKoszty(e) {
        var val = Number(e.target.value);
        this.setState({kosztyMiejscowe: val, isCalculated: false});
    }

    render() {
        return <div className="container" style={{ 'textAlign': 'center' }}>
            <form onSubmit={e => { e.preventDefault(); this.calc() } }>
            
                <div className="input-group mb-2 mr-sm-2 mb-sm-0">                
                    <div className="input-group-addon">Pensja brutto</div>
                            <input 
                                type="number" 
                                className={this.state.isValueValid ? "form-control" : "form-control is-invalid " }
                                id="exampleFormControlInput1" 
                                onChange={e => this.setBrutto(e)} />
                            <div className="input-group-addon">zł</div>
                </div>

                <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                    <div className="input-group-addon">Koszty miejscowe</div>

                    <select className="form-control" id="exampleFormControlSelect1" onChange={e => this.setKoszty(e)}>
                        <option value="111.25">111.25</option>
                        <option value="139.06">139.06</option>
                    </select>

                    <div className="input-group-addon">zł</div>
                </div>
            </form>

            <div className="row align-items-center" style={{ marginTop: '10px' }}>
                    <Button disabled={!this.state.isValueValid} onClick={e => this.calc()} className="btn btn-success btn-lg" >Wylicz</Button>
            </div>

            { this.state.isCalculated && <Summary brutto={this.state.brutto} kosztyMiejscowe={this.state.kosztyMiejscowe} /> }
        </div>;
    }
}