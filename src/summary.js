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

    formatValue(v) {
        return v.toLocaleString('pl-pl', {
            style: 'currency', 
            currency:"PLN"
        });
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

        var podstawaOpodatkowania = dochod - pracownikZusRazem;

        var podstawaSkladek = brutto - pracownikZusRazem;
        var sklZdrowotnaPobierana = podstawaSkladek * this.const.zdrowotna_pobierana;
        var sklZdrowotnaOdliczana = podstawaSkladek * this.const.zdrowotna_odliczana;

        var zaliczkaPrzed = podstawaOpodatkowania * this.const.podatek - this.const.kwota_zmniejszajaca;

        var podatek = Math.round(zaliczkaPrzed - sklZdrowotnaOdliczana);

        var netto = brutto - pracownikZusRazem - sklZdrowotnaPobierana - podatek;

        var pracodawca = brutto + pracodawcaZusRazem;

        var s = {
            brutto: this.formatValue(brutto),
            kosztyMiejscowe: this.formatValue(kosztyMiejscowe),
            netto: this.formatValue(netto),
            dochod: this.formatValue(dochod),
            
            pracownikEmerytalna: this.formatValue(pracownikEmerytalna),
            pracownikRentowa: this.formatValue(pracownikRentowa),
            pracownikChorobowa: this.formatValue(pracownikChorobowa),
            pracownikZusRazem: this.formatValue(pracownikZusRazem),

            pracodawcaEmerytalna: this.formatValue(pracodawcaEmerytalna),
            pracodawcaRentowa: this.formatValue(pracodawcaRentowa),
            pracodawcaWypadkowa: this.formatValue(pracodawcaWypadkowa),
            pracodawcaFP: this.formatValue(pracodawcaFP),
            pracodawcaFGSP: this.formatValue(pracodawcaFGSP),
            pracodawcaZusRazem: this.formatValue(pracodawcaZusRazem),

            podstawaOpodatkowania: this.formatValue(podstawaOpodatkowania),

            sklZdrowotnaPobierana: this.formatValue(sklZdrowotnaPobierana),
            sklZdrowotnaOdliczana: this.formatValue(sklZdrowotnaOdliczana),

            podatek: this.formatValue(podatek),

            pracodawca: this.formatValue(pracodawca)
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
                            type="text"
                            className="form-control"
                            disabled={true}
                            value={this.state.brutto} />
                    </div>

                    <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                        <div className="input-group-addon">Koszty miejscowe</div>

                        <input 
                            type="text"
                            className="form-control"
                            disabled={true}
                            value={this.state.kosztyMiejscowe} />
                    </div>

                    <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                        <div className="input-group-addon">Dochód</div>

                        <input 
                            type="text"
                            className="form-control"
                            disabled={true}
                            value={this.state.dochod} />
                    </div>              

                    <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                        <div className="input-group-addon">Pensja netto</div>

                        <input 
                            type="text"
                            className="form-control"
                            disabled={true}
                            value={this.state.netto}/>
                    </div>

                    <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                        <div className="input-group-addon">Koszt pracodawca</div>

                        <input 
                            type="text"
                            className="form-control"
                            disabled={true}
                            value={this.state.pracodawca}/>
                    </div>

                    <h4>ZUS (pracownik)</h4>

                    <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                        <div className="input-group-addon">Składka emerytalna</div>

                        <input 
                            type="text"
                            className="form-control"
                            disabled={true}
                            value={this.state.pracownikEmerytalna}/>
                    </div>

                    <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                        <div className="input-group-addon">Składka rentowa</div>

                        <input 
                            type="text"
                            className="form-control"
                            disabled={true}
                            value={this.state.pracownikRentowa}/>
                    </div>

                    <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                        <div className="input-group-addon">Składka chorobowa</div>

                        <input 
                            type="text"
                            className="form-control"
                            disabled={true}
                            value={this.state.pracownikChorobowa}/>
                    </div>

                    <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                        <div className="input-group-addon">Składki razem</div>

                        <input 
                            type="text"
                            className="form-control"
                            disabled={true}
                            value={this.state.pracownikZusRazem}/>
                    </div>

                    <h4>ZUS (pracodawca)</h4>

                    <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                        <div className="input-group-addon">Składka emerytalna</div>

                        <input 
                            type="text"
                            className="form-control"
                            disabled={true}
                            value={this.state.pracodawcaEmerytalna}/>
                    </div>

                    <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                        <div className="input-group-addon">Składka rentowa</div>

                        <input 
                            type="text"
                            className="form-control"
                            disabled={true}
                            value={this.state.pracodawcaRentowa}/>
                    </div>

                    <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                        <div className="input-group-addon">Składka wypadkowa</div>

                        <input 
                            type="text"
                            className="form-control"
                            disabled={true}
                            value={this.state.pracodawcaWypadkowa}/>
                    </div>

                    <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                        <div className="input-group-addon">Składka FP</div>

                        <input 
                            type="text"
                            className="form-control"
                            disabled={true}
                            value={this.state.pracodawcaFP}/>
                    </div>

                    <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                        <div className="input-group-addon">Składka FGŚP</div>

                        <input 
                            type="text"
                            className="form-control"
                            disabled={true}
                            value={this.state.pracodawcaFGSP}/>
                    </div>

                    <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                        <div className="input-group-addon">Składki razem</div>

                        <input 
                            type="text"
                            className="form-control"
                            disabled={true}
                            value={this.state.pracodawcaZusRazem}/>
                    </div>

                    <h4>Składki razem</h4>

                    <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                        <div className="input-group-addon">Podstawa</div>

                        <input 
                            type="text"
                            className="form-control"
                            disabled={true}
                            value={this.state.podstawaOpodatkowania}/>
                    </div>

                    <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                        <div className="input-group-addon">Zdrowotna pobierana</div>

                        <input 
                            type="text"
                            className="form-control"
                            disabled={true}
                            value={this.state.sklZdrowotnaPobierana}/>
                    </div>

                    <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                        <div className="input-group-addon">Zdrowotna odliczana</div>

                        <input 
                            type="text"
                            className="form-control"
                            disabled={true}
                            value={this.state.sklZdrowotnaOdliczana}/>
                    </div>

                    <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                        <div className="input-group-addon">Podatek</div>

                        <input 
                            type="text"
                            className="form-control"
                            disabled={true}
                            value={this.state.podatek}/>
                    </div>
                </form>
        </div>;
    }
}