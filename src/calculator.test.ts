import { resolveOp, MathOp, appendNumberToValue, flipSignString } from "./calculator"

test('ResolveOp:Addition', () => {
    expect(resolveOp(1, 2, MathOp.PLUS)).toBe(3)
})

test('ResolveOp:Subtraction', () => {
    expect(resolveOp(10.1, 3.3, MathOp.MINUS)).toBe(6.8)
})

test('ResolveOp:Multiplication', () => {
    expect(resolveOp(20, 50, MathOp.MULTIPLY)).toBe(1000)
})

test('ResolveOp:Division', () => {
    expect(resolveOp(8, 40, MathOp.DIVIDE)).toBe(5)
})

test('AppendNumberToValue:dot', () => {
    expect(appendNumberToValue(".", "0")).toBe("0.")
})

test('AppendNumberToValue:zero', () => {
    expect(appendNumberToValue("0", "0")).toBe("0")
})

test('AppendNumberToValue:zerodot', () => {
    expect(appendNumberToValue("5", "0")).toBe("5")
})

test('FlipSignString:0', () => {
    expect(flipSignString("0")).toBe("0")
})

test('FlipSignString:5', () => {
    expect(flipSignString("5")).toBe("-5")
})

test('FlipSignString:-5', () => {
    expect(flipSignString("-5")).toBe("5")
})