import React, { Component } from 'react';

export default class Summary extends Component {
    constructor() {
        super();

        this.state = {
            brutto: 0,
            netto: 0,
            kosztyMiejscowe: 0,
            dochod: 0,
            stawkaWypadkowe: 0,
            
            pracownikEmerytalna: 0,
            pracownikRentowa: 0,
            pracownikChorobowa: 0,
            pracownikZusRazem: 0,

            pracodawcaEmerytalna: 0,
            pracodawcaRentowa: 0,
            pracodawcaWypadkowa: 0,
            pracodawcaFP: 0,
            pracodawcaFGSP: 0,
            pracodawcaZusRazem: 0,

            podstawaOpodatkowania: 0,

            sklZdrowotnaPobierana: 0,
            sklZdrowotnaOdliczana: 0,

            podatek: 0,

            pracodawca: 0
        }

        this.const = {
            "koszty_miejscowe": 111.25,
            
            "emerytalna_pracownik": 0.0976,
            "rentowa_pracownik": 0.015,
            "chorobowa_pracownik": 0.0245,
            
            "emerytalna_pracodawca": 0.0976,
            "rentowa_pracodawca": 0.065,
            "fp_pracodawca": 0.0245,
            "fgsp_pracodawca": 0.0010,
            
            "podatek": 0.18,
            
            "kwota_zmniejszajaca": 46.33,
            
            "zdrowotna_pobierana": 0.09,
            "zdrowotna_odliczana": 0.0775,
            
            "chorobowe": 0.8
            };
    }

    round(n) {
        return Math.round(n * 100) / 100;
    }

    calc(brutto, kosztyMiejscowe, stawkaWypadkowe) {
        var dochod = brutto - kosztyMiejscowe;
        
        var pracownikEmerytalna = brutto * this.const.emerytalna_pracownik;
        var pracownikRentowa = brutto * this.const.rentowa_pracownik;
        var pracownikChorobowa = brutto * this.const.chorobowa_pracownik;
        var pracownikZusRazem = pracownikEmerytalna + pracownikRentowa + pracownikChorobowa;

        var pracodawcaEmerytalna = brutto * this.const.emerytalna_pracodawca;
        var pracodawcaRentowa = brutto * this.const.rentowa_pracodawca;
        var pracodawcaWypadkowa = brutto * stawkaWypadkowe / 100.0;
        var pracodawcaFP = brutto * this.const.fp_pracodawca;
        var pracodawcaFGSP = brutto * this.const.fgsp_pracodawca;
        var pracodawcaZusRazem = pracodawcaEmerytalna + pracodawcaRentowa + pracodawcaWypadkowa 
            + pracodawcaFP + pracodawcaFGSP;

        var podstawaOpodatkowania = this.round(dochod - pracownikZusRazem);

        var podstawaSkladek = brutto - pracownikZusRazem;

        var sklZdrowotnaPobierana = podstawaSkladek * this.const.zdrowotna_pobierana;
        var sklZdrowotnaOdliczana = podstawaSkladek * this.const.zdrowotna_odliczana;

        var zaliczkaPrzed = this.round(podstawaOpodatkowania * this.const.podatek) - this.const.kwota_zmniejszajaca;

        var podatek = Math.round(zaliczkaPrzed - sklZdrowotnaOdliczana);

        var netto = this.round(brutto - pracownikZusRazem 
            - sklZdrowotnaPobierana - podatek);

        var pracodawca = brutto + pracodawcaZusRazem;

        var s = {
            brutto: brutto.toFixed(2),
            kosztyMiejscowe: kosztyMiejscowe.toFixed(2),
            netto: netto.toFixed(2),
            dochod: dochod.toFixed(2),
            
            pracownikEmerytalna: pracownikEmerytalna.toFixed(2),
            pracownikRentowa: pracownikRentowa.toFixed(2),
            pracownikChorobowa: pracownikChorobowa.toFixed(2),
            pracownikZusRazem: pracownikZusRazem.toFixed(2),

            pracodawcaEmerytalna: pracodawcaEmerytalna.toFixed(2),
            pracodawcaRentowa: pracodawcaRentowa.toFixed(2),
            pracodawcaWypadkowa: pracodawcaWypadkowa.toFixed(2),
            pracodawcaFP: pracodawcaFP.toFixed(2),
            pracodawcaFGSP: pracodawcaFGSP.toFixed(2),
            pracodawcaZusRazem: pracodawcaZusRazem.toFixed(2),

            podstawaOpodatkowania: podstawaOpodatkowania.toFixed(2),

            sklZdrowotnaPobierana: sklZdrowotnaPobierana.toFixed(2),
            sklZdrowotnaOdliczana: sklZdrowotnaOdliczana.toFixed(2),

            podatek: podatek.toFixed(2),

            pracodawca: pracodawca.toFixed(2)
        }

        this.setState(s);
    }

    componentDidMount() {
        if (this.props.brutto !== undefined && this.props.brutto != null
            && this.props.kosztyMiejscowe !== undefined && this.props.kosztyMiejscowe != null
            && this.props.stawkaWypadkowe !== undefined && this.props.stawkaWypadkowe != null ) {
            this.calc(this.props.brutto, this.props.kosztyMiejscowe, this.props.stawkaWypadkowe);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.brutto !== undefined && nextProps.kosztyMiejscowe !== undefined && nextProps.stawkaWypadkowe !== undefined) {
            this.calc(nextProps.brutto, nextProps.kosztyMiejscowe, nextProps.stawkaWypadkowe);
        }
    }

    render() {
        return <div>
            <h2>Wyliczenie</h2>
                <form onSubmit={e => e.preventDefault()}>
                    <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                        <div className="input-group-addon">Pensja brutto</div>

                        <input 
                            type="number"
                            className="form-control"
                            disabled={true}
                            value={this.state.brutto} />

                        <div className="input-group-addon">zł</div>
                    </div>

                    <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                        <div className="input-group-addon">Koszty miejscowe</div>

                        <input 
                            type="number"
                            className="form-control"
                            disabled={true}
                            value={this.state.kosztyMiejscowe} />

                        <div className="input-group-addon">zł</div>
                    </div>

                    <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                        <div className="input-group-addon">Dochód</div>

                        <input 
                            type="number"
                            className="form-control"
                            disabled={true}
                            value={this.state.dochod} />

                        <div className="input-group-addon">zł</div>
                    </div>              

                    <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                        <div className="input-group-addon">Pensja netto</div>

                        <input 
                            type="number"
                            className="form-control"
                            disabled={true}
                            value={this.state.netto}/>

                        <div className="input-group-addon">zł</div>
                    </div>

                    <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                        <div className="input-group-addon">Koszt pracodawca</div>

                        <input 
                            type="number"
                            className="form-control"
                            disabled={true}
                            value={this.state.pracodawca}/>

                        <div className="input-group-addon">zł</div>
                    </div>

                    <h4>ZUS (pracownik)</h4>

                    <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                        <div className="input-group-addon">Składka emerytalna</div>

                        <input 
                            type="number"
                            className="form-control"
                            disabled={true}
                            value={this.state.pracownikEmerytalna}/>

                        <div className="input-group-addon">zł</div>
                    </div>

                    <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                        <div className="input-group-addon">Składka rentowa</div>

                        <input 
                            type="number"
                            className="form-control"
                            disabled={true}
                            value={this.state.pracownikRentowa}/>

                        <div className="input-group-addon">zł</div>
                    </div>

                    <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                        <div className="input-group-addon">Składka chorobowa</div>

                        <input 
                            type="number"
                            className="form-control"
                            disabled={true}
                            value={this.state.pracownikChorobowa}/>

                        <div className="input-group-addon">zł</div>
                    </div>

                    <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                        <div className="input-group-addon">Składki razem</div>

                        <input 
                            type="number"
                            className="form-control"
                            disabled={true}
                            value={this.state.pracownikZusRazem}/>

                        <div className="input-group-addon">zł</div>
                    </div>

                    <h4>ZUS (pracodawca)</h4>

                    <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                        <div className="input-group-addon">Składka emerytalna</div>

                        <input 
                            type="number"
                            className="form-control"
                            disabled={true}
                            value={this.state.pracodawcaEmerytalna}/>

                        <div className="input-group-addon">zł</div>
                    </div>

                    <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                        <div className="input-group-addon">Składka rentowa</div>

                        <input 
                            type="number"
                            className="form-control"
                            disabled={true}
                            value={this.state.pracodawcaRentowa}/>

                        <div className="input-group-addon">zł</div>
                    </div>

                    <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                        <div className="input-group-addon">Składka wypadkowa</div>

                        <input 
                            type="number"
                            className="form-control"
                            disabled={true}
                            value={this.state.pracodawcaWypadkowa}/>

                        <div className="input-group-addon">zł</div>
                    </div>

                    <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                        <div className="input-group-addon">Składka FP</div>

                        <input 
                            type="number"
                            className="form-control"
                            disabled={true}
                            value={this.state.pracodawcaFP}/>

                        <div className="input-group-addon">zł</div>
                    </div>

                    <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                        <div className="input-group-addon">Składka FGŚP</div>

                        <input 
                            type="number"
                            className="form-control"
                            disabled={true}
                            value={this.state.pracodawcaFGSP}/>

                        <div className="input-group-addon">zł</div>
                    </div>

                    <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                        <div className="input-group-addon">Składki razem</div>

                        <input 
                            type="number"
                            className="form-control"
                            disabled={true}
                            value={this.state.pracodawcaZusRazem}/>

                        <div className="input-group-addon">zł</div>
                    </div>

                    <h4>Składki razem</h4>

                    <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                        <div className="input-group-addon">Podstawa</div>

                        <input 
                            type="number"
                            className="form-control"
                            disabled={true}
                            value={this.state.podstawaOpodatkowania}/>

                        <div className="input-group-addon">zł</div>
                    </div>

                    <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                        <div className="input-group-addon">Zdrowotna pobierana</div>

                        <input 
                            type="number"
                            className="form-control"
                            disabled={true}
                            value={this.state.sklZdrowotnaPobierana}/>

                        <div className="input-group-addon">zł</div>
                    </div>

                    <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                        <div className="input-group-addon">Zdrowotna odliczana</div>

                        <input 
                            type="number"
                            className="form-control"
                            disabled={true}
                            value={this.state.sklZdrowotnaOdliczana}/>

                        <div className="input-group-addon">zł</div>
                    </div>

                    <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                        <div className="input-group-addon">Podatek</div>

                        <input 
                            type="number"
                            className="form-control"
                            disabled={true}
                            value={this.state.podatek}/>

                        <div className="input-group-addon">zł</div>
                    </div>
                </form>
        </div>;
    }
}