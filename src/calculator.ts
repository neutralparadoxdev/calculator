export enum MathOp {
    NONE,
    PLUS,
    MINUS,
    DIVIDE,
    MULTIPLY,
    EQUAL,
    INVERSE
}

export function resolveOp(val: number, state: number, op: MathOp): number {
    if (op === MathOp.NONE) {
        return 0.0;
    }
    if (op === MathOp.PLUS) {
        return (val + state);
    }

    if (op === MathOp.MINUS) {
        return (val - state);
    }

    if (op === MathOp.DIVIDE) {
        return (state /  val);
    }

    if (op === MathOp.MULTIPLY) {
        return (val * state);
    }
    return 0;
}

export function appendNumberToValue(digit: string, state: string): string {
    if(digit === ".") {
        return state + "."
    }
    if (digit !== "." && state === "0") {
        state = ""
    }
    if (digit === '.' && (state.includes('.') || state === "0")) {
        return state
    }

    return state + digit 
}

export function flipSignString(val: string): string {
    if (val.length === 0 || val === "0") return val;
    if (val[0] === "-") return val.split('-')[1];
    return "-" + val
}
