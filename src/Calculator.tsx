import React, { FunctionComponent, useState, useEffect } from 'react';

import './Calculator.css';

interface Props {

}

enum MathOp {
    NONE,
    PLUS,
    MINUS,
    DIVIDE,
    MULTIPLY,
    EQUAL,
    INVERSE
}


const Calculator: FunctionComponent<Props> = (props: Props) => {
    const [hidden, setHidden] = useState<boolean>(false);
    const [savedValue, setSavedValue] = useState<number>(0.0);
    const [wasSaved, setWasSaved] = useState<boolean>(false);
    const [savedOp, setSavedOp] = useState<MathOp>(MathOp.NONE);
    const [calcDisplayValue, setCalcDisplayValue] = useState<string>("0");
    const [newInput, setNewInput] = useState<boolean>(false)

    useEffect(() => {
        if (hidden) {
            setTimeout(() => {
                setHidden(false)
            }, 200)
        }
    }, [hidden])

    function GenerateAddNumber(digit: string) {
        return () => {
            if(hidden) {
                return;
            }

            setCalcDisplayValue((val: string) => {
                if(newInput === true) {
                    val = ""
                    setNewInput(false);
                }

                if(digit == ".") {
                    return val + "."
                }
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
        if(hidden) {
            return;
        }
        setSavedValue(0.0);
        setWasSaved(false);
        setSavedOp(MathOp.NONE)
        setNewInput(false);

        setCalcDisplayValue("0");
    }

    function flipFieldSign() {
        if(hidden) {
                return;
        }
        setCalcDisplayValue((val: string) => {
            if (val.length === 0 || val === "0") return val;
            if (val[0] === "-") return val.split('-')[1];
            return "-" + val
       })
       setHidden(true)
    }

    function resolveOp(): number {
        let val = parseFloat(calcDisplayValue)
        if (savedOp === MathOp.NONE) {
            return 0.0;
        }
        if (savedOp === MathOp.PLUS) {
            return (val + savedValue);
        }

        if (savedOp === MathOp.MINUS) {
            return (val - savedValue);
        }

        if (savedOp === MathOp.DIVIDE) {
            return (savedValue /  val);
        }

        if (savedOp === MathOp.MULTIPLY) {
            return (val * savedValue);
        }
        return 0
    }

    function addOp(op: MathOp) {
        return () => {
            if(hidden) {
                return;
            }
            if(op == MathOp.EQUAL && !wasSaved) {
                return
            }

            if(op == MathOp.EQUAL && wasSaved) {
                let x = resolveOp();
                setCalcDisplayValue(x.toString());
                setHidden(true);
                setSavedValue(x);
                setWasSaved(false);
                setNewInput(true);
                return
            }

            if(wasSaved) {
                let x = resolveOp();
                setCalcDisplayValue(x.toString());
                setHidden(true)
                setSavedValue(x)
                setSavedOp(op)
                setWasSaved(true);
                setNewInput(true);
                return 
            }

            setSavedValue(parseFloat(calcDisplayValue))
            setSavedOp(op)
            setWasSaved(true);
            setNewInput(true);
            setHidden(true)
            return
        }
    }

    return (
        <div className="calc-container">
            <input type="text" className={ "calc-display " + (hidden ? "hidden" : "")} value={calcDisplayValue} />

            <button className="calc-button calc-button-ac" onClick={clearCalculator}>AC</button>
            <button className="calc-button calc-button-p" onClick={addOp(MathOp.PLUS)}>+</button>
            <button className="calc-button calc-button-m" onClick={addOp(MathOp.MINUS)}>-</button>
            <button className="calc-button calc-button-mx" onClick={addOp(MathOp.MULTIPLY)}>X</button>
            <button className="calc-button calc-button-d" onClick={addOp(MathOp.DIVIDE)}>/</button>
            <button className="calc-button calc-button-pe" onClick={flipFieldSign}>+/-</button>
            <button className="calc-button calc-button-eq" onClick={addOp(MathOp.EQUAL)}>=</button>
            <button className="calc-button calc-button-period" onClick={GenerateAddNumber(".")}>.</button>
            <button className="calc-button calc-button-0" onClick={GenerateAddNumber("0")}>0</button>
            <button className="calc-button calc-button-1" onClick={GenerateAddNumber("1")}>1</button>
            <button className="calc-button calc-button-2" onClick={GenerateAddNumber("2")}>2</button>
            <button className="calc-button calc-button-3" onClick={GenerateAddNumber("3")}>3</button>
            <button className="calc-button calc-button-4" onClick={GenerateAddNumber("4")}>4</button>
            <button className="calc-button calc-button-5" onClick={GenerateAddNumber("5")}>5</button>
            <button className="calc-button calc-button-6" onClick={GenerateAddNumber("6")}>6</button>
            <button className="calc-button calc-button-7" onClick={GenerateAddNumber("7")}>7</button>
            <button className="calc-button calc-button-8" onClick={GenerateAddNumber("8")}>8</button>
            <button className="calc-button calc-button-9" onClick={GenerateAddNumber("9")}>9</button>
        </div>
    );
}

export default Calculator;