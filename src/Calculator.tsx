import React, { FunctionComponent, useState, useEffect } from 'react';

import './Calculator.css';

interface Props {

}


const Calculator: FunctionComponent<Props> = (props: Props) => {
    const [hidden, setHidden] = useState<string>("");
    const [savedValue, setSavedValue] = useState<number>(0.0);
    const [wasSaved, setWasSaved] = useState<boolean>(false);
    const [savedOp, setSavedOp] = useState<string>("") 
    const [calcDisplayValue, setCalcDisplayValue] = useState<string>("0");
    const [newInput, setNewInput] = useState<boolean>(false)

    useEffect(() => {
        if (hidden === "hidden") {
            setTimeout(() => {
                setHidden("")
            }, 200)
        }
    }, [hidden])

    function GenerateAddNumber(digit: string) {
        return () => {
            if(hidden !== "") {
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
        if(hidden !== "") {
            return;
        }
        setSavedValue(0.0);
        setWasSaved(false);
        setSavedOp("")
        setNewInput(false);

        setCalcDisplayValue("0");
    }

    function flipFieldSign() {
        if(hidden !== "") {
                return;
        }
        setCalcDisplayValue((val: string) => {
            if (val.length === 0 || val === "0") return val;
            if (val[0] === "-") return val.split('-')[1];
            return "-" + val
       })
       setHidden("hidden")
    }

    function resolveOp(): number {
        let val = parseFloat(calcDisplayValue)
        if (savedOp === "") {
            return 0.0;
        }
        if (savedOp === "+") {
            return (val + savedValue);
        }

        if (savedOp === "-") {
            return (val - savedValue);
        }

        if (savedOp === "/") {
            return (val / savedValue);
        }

        if (savedOp === "*") {
            return (val * savedValue);
        }
        return 0
    }

    function addOp(op: string) {
        return () => {
            if(hidden != "") {
                return;
            }
            if(op == "=" && !wasSaved) {
                return
            }

            if(op == "=" && wasSaved) {
                let x = resolveOp();
                setCalcDisplayValue(x.toString());
                setHidden("hidden");
                setSavedValue(x);
                setWasSaved(false);
                setNewInput(true);
                return
            }

            if(wasSaved) {
                let x = resolveOp();
                setCalcDisplayValue(x.toString());
                setHidden("hidden")
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
            setHidden("hidden")
            return
        }
    }

    return (
        <div className="calc-container">
            <input type="text" className={ "calc-display " + hidden } value={calcDisplayValue} />

            <button className="calc-button calc-button-ac" onClick={clearCalculator}>AC</button>
            <button className="calc-button calc-button-p" onClick={addOp("+")}>+</button>
            <button className="calc-button calc-button-m" onClick={addOp("-")}>-</button>
            <button className="calc-button calc-button-mx" onClick={addOp("*")}>X</button>
            <button className="calc-button calc-button-d" onClick={addOp("/")}>/</button>
            <button className="calc-button calc-button-pe" onClick={flipFieldSign}>+/-</button>
            <button className="calc-button calc-button-eq" onClick={addOp("=")}>=</button>
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