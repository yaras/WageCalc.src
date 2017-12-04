import React, { Component } from 'react';
import { Button } from 'reactstrap';
import constValues from './constValues';

export default class Illness extends Component {
    constructor() {
        super();
        this.state = {
            'pensje': [ null, null, null, null, null, null, null, null, null, null, null, null],
            'isCalculated': false
        }
    }

    setPensja(n, val) {
        var pensje = this.state.pensje.slice();
        pensje[n - 1] = Number(val);

        this.setState({ 'pensje': pensje });
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

            var podstawa = average * (constValues['emerytalna_pracownik']
                                        + constValues['rentowa_pracownik']
                                        + constValues['chorobowa_pracownik']);

            

            this.setState({
                average: average,
                podstawa: podstawa,
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

                    <div className="row align-items-center" style={{ marginTop: '10px' }}>
                        <Button onClick={e => this.calc()} className="btn btn-success btn-lg" >Wylicz</Button>
                    </div>
                </form>

                {this.state.isCalculated && <div>

                    <h2>Podsumowanie</h2>

                    <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                        <div className="input-group-addon">Średnia pensja</div>

                        <input 
                            type="number"
                            className="form-control"
                            disabled={true}
                            value={this.state.average}/>

                        <div className="input-group-addon">zł</div>
                    </div>
                </div>}
            </div>
        </div>;
    }
}