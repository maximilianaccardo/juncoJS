import { Perceptron, Layer } from "../src/neural"

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

describe('Layer', () => {
  test('layer gives correct output', () => {
    const l = new Layer(10, 4)
    const inputs = [0.42, -.1, .9, 1]
    expect(l.evaluate(inputs))
      .toStrictEqual([
        0,
        0,
        1.1033309510559273,
        1.8544946340109705,
        1.1490863497528467,
        0.28412899883324727,
        0,
        0.21681104465821055,
        0.47895061448910736,
        0
      ])
  })

  test('layer gives correct output with given seed', () => {
    const l = new Layer(10, 4, 26)
    const inputs = [0.42, -.1, .9, 1]
    expect(l.evaluate(inputs))
      .toStrictEqual([
        0,
        0.5673702010972761,
        0.3464103846157112,
        0,
        0.03798421200938584,
        0.3756912151543452,
        0.059735653494415175,
        0,
        0,
        0
      ])
  })
})