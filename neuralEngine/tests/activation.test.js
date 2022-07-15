import { relu, sigmoid } from "../src/activation.js"

describe("relu", () => {
  test("outputs zero for negative number", () => {
    expect(relu(-3)).toEqual(0)
  })

  test("output is equality for positive number", () => {
    expect(relu(5)).toEqual(5)
  })
})

describe("sigmoid", () => {
  test("output is close to one for high inputs", () => {
    const a = sigmoid(10)
    expect(a).toBeLessThan(1)
    expect(a).toBeGreaterThan(0.99)
  })

  test("output is 0.5 for zero", () => {
    const a = sigmoid(0)
    expect(a).toBe(0.5)
  })

  test("output is close to zero for low inputs", () => {
    const a = sigmoid(-10)
    expect(a).toBeGreaterThan(0)
    expect(a).toBeLessThan(0.01)
  })
})