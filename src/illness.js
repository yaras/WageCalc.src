import React, { Component } from 'react';
import { Button } from 'reactstrap';
import {constValues, formatValue} from './constValues';

export default class Illness extends Component {
    constructor() {
        super();
        this.state = {
            'pensje': [ null, null, null, null, null, null, null, null, null, null, null, null],
            'isCalculated': false,
            'wynagrodzenie': 0.8
        }
    }

    setPensja(n, val) {
        var pensje = this.state.pensje.slice();
        pensje[n - 1] = Number(val);

        this.setState({ 'pensje': pensje });
    }

    setDniChoroby(dni) {
        this.setState({'dni': Number(dni)});
    }

    setWynagrodzenie(w) {
        this.setState({'wynagrodzenie': w});
    }

    calc() {
        var pensje = this.state.pensje.slice();
        console.log(pensje);

        var sum = 0;
        var n = 0;

        pensje.map(v => {
            if (v > 0) {
                sum += v;
                n++;
            }
        });

        if (n > 0) {
            var average = sum / n;

            var podstawa = average - average * (constValues['emerytalna_pracownik']
                                        + constValues['rentowa_pracownik']
                                        + constValues['chorobowa_pracownik']);

            var dziennie = podstawa * this.state.wynagrodzenie / 30.0;
            var razem = dziennie * this.state.dni;

            this.setState({
                average: formatValue(average),
                podstawa: formatValue(podstawa),
                dziennie: formatValue(dziennie),
                razem: formatValue(razem),
                isCalculated: true
            });
        } else {
            alert('Błąd!');
        }
    }

    render() {
        return <div>
            <h1>Kalkulator chorobowego</h1>

            <div className="container" style={{ 'textAlign': 'center' }}>
                <form onSubmit={e => { e.preventDefault(); this.calc() } }>
                    {
                        [1,2,3,4,5,6,7,8,9,10,11,12].map(n => {
                            return <div key={n} className="input-group mb-2 mr-sm-2 mb-sm-0">                
                            <div className="input-group-addon">Pensja brutto {n}</div>
                            <input
                                type="number"
                                className="form-control"
                                onChange={e => this.setPensja(n, e.target.value)} />
                            <div className="input-group-addon">zł</div>
                        </div>;
                        })
                    }

                    <div className="input-group mb-2 mr-sm-2 mb-sm-0">                
                        <div className="input-group-addon">Dni choroby</div>
                        <input
                            type="number"
                            className="form-control"
                            onChange={e => this.setDniChoroby(e.target.value)} />
                        <div className="input-group-addon">dni</div>
                    </div>

                    <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                        <div className="input-group-addon">Wynagrodzenie</div>

                        <select className="form-control" onChange={e => this.setWynagrodzenie(e)}>
                            <option value="0.8">80</option>
                            <option value="1.0">100</option>
                        </select>

                        <div className="input-group-addon">%</div>
                    </div>

                    <div className="row align-items-center" style={{ marginTop: '10px' }}>
                        <Button onClick={e => this.calc()} className="btn btn-success btn-lg" >Wylicz</Button>
                    </div>
                </form>

                {this.state.isCalculated && <div>

                    <h2>Podsumowanie</h2>

                    <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                        <div className="input-group-addon">Średnia pensja</div>

                        <input 
                            type="text"
                            className="form-control"
                            disabled={true}
                            value={this.state.average}/>

                        <div className="input-group-addon">zł</div>
                    </div>

                    <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                        <div className="input-group-addon">Podstawa</div>

                        <input 
                            type="text"
                            className="form-control"
                            disabled={true}
                            value={this.state.podstawa}/>

                        <div className="input-group-addon">zł</div>
                    </div>

                    <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                        <div className="input-group-addon">Dziennie</div>

                        <input 
                            type="text"
                            className="form-control"
                            disabled={true}
                            value={this.state.dziennie}/>

                        <div className="input-group-addon">zł</div>
                    </div>

                    <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                        <div className="input-group-addon">Razem</div>

                        <input 
                            type="text"
                            className="form-control"
                            disabled={true}
                            value={this.state.razem}/>

                        <div className="input-group-addon">zł</div>
                    </div>
                </div>}
            </div>
        </div>;
    }
}