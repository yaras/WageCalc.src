import React, { Component } from 'react';

export default class Summary extends Component {
    render() {
        return <div>
            <h2>Wyliczenie</h2>
            <form>
                <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                    <div className="input-group-addon">Pensja netto</div>

                    <input 
                        type="number"
                        className="form-control"
                        disabled={true} />

                    <div className="input-group-addon">zł</div>
                </div>
            </form>
        </div>;
    }
}