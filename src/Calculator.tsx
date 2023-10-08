import React, { FunctionComponent, useState, useEffect } from 'react';

import { MathOp, appendNumberToValue, flipSignString, resolveOp } from './calculator';

import './Calculator.css';

interface Props {

}

const Calculator: FunctionComponent<Props> = (props: Props) => {
    const [hidden, setHidden] = useState<boolean>(false);
    const [valueState, setValueState] = useState<number>(0.0);
    const [wasSaved, setWasSaved] = useState<boolean>(false);
    const [savedOp, setSavedOp] = useState<MathOp>(MathOp.NONE);
    const [calcDisplayValue, setCalcDisplayValue] = useState<string>("0");
    const [newInput, setNewInput] = useState<boolean>(false)

    // Blink
    useEffect(() => {
        if (hidden) {
            setTimeout(() => {
                setHidden(false)
            }, 200)
        }
    }, [hidden])

    function updateValue(val: number, saved: boolean) {
        setCalcDisplayValue(val.toString())
        if(saved) setValueState(val);
        setWasSaved(saved);
    }

    function addDigitToDisplay(digit: string) {
        return () => {
            if(hidden) {
                return;
            }

            setCalcDisplayValue((currentState: string) => {
                if(newInput === true) {
                    currentState = ""
                    setNewInput(false);
                }

                return appendNumberToValue(digit, currentState)
            });
        }
    }

    function clearCalculator() {
        if(hidden) {
            return;
        }
        setValueState(0.0);
        setWasSaved(false);
        setSavedOp(MathOp.NONE)
        setNewInput(false);

        setCalcDisplayValue("0");
    }

    function flipFieldSign() {
        if(hidden) {
            return;
        }
        setCalcDisplayValue(flipSignString)
        setHidden(true)
    }

    function addOp(op: MathOp) {
        return () => {
            if(hidden || (op == MathOp.EQUAL && !wasSaved)) {
                return;
            }

            if(op == MathOp.EQUAL && wasSaved) {
                let x = resolveOp(parseFloat(calcDisplayValue), valueState, savedOp);
                updateValue(x, false);
                setHidden(true);
                setValueState(x);
                setNewInput(true);
                setSavedOp(MathOp.NONE);
                return
            }

            if(wasSaved) {
                let x = resolveOp(parseFloat(calcDisplayValue), valueState, savedOp);
                updateValue(x, true);
                setHidden(true)
                setValueState(x)
                setSavedOp(op)
                setNewInput(true);
                return 
            }

            setValueState(parseFloat(calcDisplayValue))
            setSavedOp(op)
            setWasSaved(true);
            setNewInput(true);
            setHidden(true)
            return
        }
    }

    return (
        <div className="calc-container">
            <input type="text" className={ "calc-display " + (hidden ? "hidden" : "")} value={calcDisplayValue} readOnly/>

            <button className="calc-button calc-button-ac" onClick={clearCalculator}>AC</button>
            <button className="calc-button calc-button-p" onClick={addOp(MathOp.PLUS)}>+</button>
            <button className="calc-button calc-button-m" onClick={addOp(MathOp.MINUS)}>-</button>
            <button className="calc-button calc-button-mx" onClick={addOp(MathOp.MULTIPLY)}>X</button>
            <button className="calc-button calc-button-d" onClick={addOp(MathOp.DIVIDE)}>/</button>
            <button className="calc-button calc-button-pe" onClick={flipFieldSign}>+/-</button>
            <button className="calc-button calc-button-eq" onClick={addOp(MathOp.EQUAL)}>=</button>
            <button className="calc-button calc-button-period" onClick={addDigitToDisplay(".")}>.</button>
            <button className="calc-button calc-button-0" onClick={addDigitToDisplay("0")}>0</button>
            <button className="calc-button calc-button-1" onClick={addDigitToDisplay("1")}>1</button>
            <button className="calc-button calc-button-2" onClick={addDigitToDisplay("2")}>2</button>
            <button className="calc-button calc-button-3" onClick={addDigitToDisplay("3")}>3</button>
            <button className="calc-button calc-button-4" onClick={addDigitToDisplay("4")}>4</button>
            <button className="calc-button calc-button-5" onClick={addDigitToDisplay("5")}>5</button>
            <button className="calc-button calc-button-6" onClick={addDigitToDisplay("6")}>6</button>
            <button className="calc-button calc-button-7" onClick={addDigitToDisplay("7")}>7</button>
            <button className="calc-button calc-button-8" onClick={addDigitToDisplay("8")}>8</button>
            <button className="calc-button calc-button-9" onClick={addDigitToDisplay("9")}>9</button>
        </div>
    );
}

export default Calculator;