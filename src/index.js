import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { MemoryRouter } from 'react-router-dom'

ReactDOM.render(<MemoryRouter basename="/WageCalc">
        <App />
    </MemoryRouter>, 
    document.getElementById('root'));
