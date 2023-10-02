import React, { FunctionComponent, useState } from 'react';

import './Calculator.css';

interface Props {

}


const Calculator: FunctionComponent<Props> = (props: Props) => {
    const [savedValue, setSavedValue] = useState<number>(0.0);
    const [wasSaved, setWasSaved] = useState<boolean>(false);
    const [savedOp, setSavedOp] = useState<string>("") 
    const [calcDisplayValue, setCalcDisplayValue] = useState<string>("0");

    function GenerateAddNumber(digit: string) {
        return () => {
            setCalcDisplayValue((val: string) => {
                if (digit !== "." && val === "0") {
                    val = ""
                }
                if (digit === '.' && (val.includes('.') || val === "0")) {
                    return val
                }

                return val + digit 
            });
        }
    }

    function clearCalculator() {
        setSavedValue(0.0);
        setWasSaved(false);
        setCalcDisplayValue("0")
    }

    function flipFieldSign() {
        setCalcDisplayValue((val: string) => {
            if (val.length === 0 || val === "0") return val;
            if (val[0] === "-") return val.split('-')[1];
            return "-" + val
        })
    }

    function resolveOp() {
        let val = parseFloat(calcDisplayValue)
        if (savedOp === "+") {
            setCalcDisplayValue((val + savedValue).toString())
        }

    }

    function addOp(op: string) {
        if(!wasSaved) {
            resolveOp();
        }

        setSavedValue(parseFloat(calcDisplayValue))
        setSavedOp(op)
        setWasSaved(true);
        return
    }

    return (
        <div className="calc-container">
            <input type="text" className="calc-display" value={calcDisplayValue} />

            <button className="calc-button-ac" onClick={clearCalculator}>AC</button>
            <button className="calc-button-p">+</button>
            <button className="calc-button-m">-</button>
            <button className="calc-button-mx">X</button>
            <button className="calc-button-d">/</button>
            <button className="calc-button-pe" onClick={flipFieldSign}>+/-</button>
            <button className="calc-button-eq">=</button>
            <button className="calc-button-period" onClick={GenerateAddNumber(".")}>.</button>
            <button className="calc-button-0" onClick={GenerateAddNumber("0")}>0</button>
            <button className="calc-button-1" onClick={GenerateAddNumber("1")}>1</button>
            <button className="calc-button-2" onClick={GenerateAddNumber("2")}>2</button>
            <button className="calc-button-3" onClick={GenerateAddNumber("3")}>3</button>
            <button className="calc-button-4" onClick={GenerateAddNumber("4")}>4</button>
            <button className="calc-button-5" onClick={GenerateAddNumber("5")}>5</button>
            <button className="calc-button-6" onClick={GenerateAddNumber("6")}>6</button>
            <button className="calc-button-7" onClick={GenerateAddNumber("7")}>7</button>
            <button className="calc-button-8" onClick={GenerateAddNumber("8")}>8</button>
            <button className="calc-button-9" onClick={GenerateAddNumber("9")}>9</button>

        </div>
    );
}

export default Calculator;