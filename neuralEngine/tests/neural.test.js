import { Perceptron } from "../src/neural"

describe('Perceptron', () => {
  test('perceptron has correct output with multiple inputs', () => {
    const inputs = [4, 2, 3, 6]
    const weights = [-0.5, -1, 1.5, 0.5]
    const bias = -2 

    const p = new Perceptron(weights, bias)
    expect(p.evaluate(inputs)).toBe(1.5)
  })

  test('perceptron has value of zero when below threshold', () => {
    const inputs = [5]
    const weights = [-1]

    const p = new Perceptron(weights)
    expect(p.evaluate(inputs)).toBe(0)
  })
})