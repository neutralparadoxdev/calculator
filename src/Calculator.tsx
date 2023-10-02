import React, { FunctionComponent, useState } from 'react';

import './Calculator.css';

interface Props {

}

const Calculator: FunctionComponent<Props> = (props: Props) => {
    const [calcDisplayValue, setCalcDisplayValue] = useState<number>(0.0);
    return (

        <div className="calc-container">
            <input type="number" className="calc-display" value={calcDisplayValue} />

            <button className="calc-button-ac" >AC</button>
            <button className="calc-button-p">+</button>
            <button className="calc-button-m">-</button>
            <button className="calc-button-mx">X</button>
            <button className="calc-button-d">/</button>
            <button className="calc-button-pe">+/-</button>
            <button className="calc-button-eq">=</button>
            <button className="calc-button-0">0</button>
            <button className="calc-button-period">.</button>

            <button className="calc-button-1">1</button>
            <button className="calc-button-2">2</button>
            <button className="calc-button-3">3</button>
            <button className="calc-button-4">4</button>
            <button className="calc-button-5">5</button>
            <button className="calc-button-6">6</button>
            <button className="calc-button-7">7</button>
            <button className="calc-button-8">8</button>
            <button className="calc-button-9">9</button>

        </div>
    );
}

export default Calculator;