import {
  Perceptron,
  Layer,
  Network,
  NetworkOutput
 } from "../src/neural"

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

  test('error if not enough inputs', () => {
    const l = new Layer(10, 10)
    const inputs = [3, 1]
    expect(() => {
        l.evaluate(inputs)
    })
      .toThrowError("Input size mismatch")
  })
})

describe("Network", () => {
  test('network gives expected output', () => {
    const n =  new Network([4, 10, 8, 5])
    const inputs = [0.4, 0.1, 0.5, -0.6]
    expect(n.evaluate(inputs).outputs)
      .toStrictEqual([
          0,
          1.3612844133589292,
          0.5245941614626803,
          2.4680381751431137,
          1.1084211422895172
        ])
  })

  test('network gives expect output with given seed', () => {
    const n =  new Network([4, 10, 8, 5], 101)
    const inputs = [0.4, 0.1, 0.5, -0.6]
    expect(n.evaluate(inputs).outputs)
      .toStrictEqual([
        0.5927792216329292,
        0,
        0.5696745474929503,
        0,
        0.4524785451551688
      ])
  })

  test('first layer in output map is inputs', () => {
    const n =  new Network([4, 10, 8, 5], 101)
    const inputs = [0.4, 0.1, 0.5, -0.6]
    expect(n.evaluate(inputs).outputMap[0])
      .toStrictEqual(inputs)
  })

  test('last layer in output map is final output', () => {
    const n =  new Network([4, 10, 8, 5], 101)
    const inputs = [0.4, 0.1, 0.5, -0.6]
    expect(n.evaluate(inputs).outputMap[3])
      .toStrictEqual(n.evaluate(inputs).outputs)
  })
})

describe("NetworkOutput", () => {
  test('mse loss function gives correct loss', () => {
    const outputs = {
      outputs: [1, 4, 2, 5],
      outputMap: [
        [2, 4, 3],
        [1, 4, 2, 5]
      ]
    }

    const no = new NetworkOutput(outputs)

    expect(no.loss([2, 6, 1, 5]))
      .toEqual(6)
  })
})