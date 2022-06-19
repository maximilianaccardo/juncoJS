import { RNG } from "../src/rng"

describe('RNG', () => {
  test('randomizer generates same results with same seed', () => {
    var r = new RNG(42)
    expect([r.random(), r.random(), r.random(), r.random()])
      .toStrictEqual([
          0.6011037519201636,
          0.44829055899754167,
          0.8524657934904099,
          0.6697340414393693
        ])
  })

  test('randomizer generates different numbers with different seed', () => {
    var r = new RNG(632)
    expect([r.random(), r.random(), r.random(), r.random()])
      .toStrictEqual([
        0.2550223192665726,
        0.5146399955265224,
        0.008521740324795246,
        0.3200802174396813
      ])
  })

  test('randomizer generates gaussian random number correctly', () => {
    var r = new RNG(42)
    expect([r.randGaussian(), r.randGaussian(), r.randGaussian(), r.randGaussian()])
      .toStrictEqual([
        -0.956162229384149,
        -0.2730261048826104,
        -1.8416271847835968,
        -1.1408820709540242
      ])
  })

  test('randomizer generates correct gaussian numbers with given standard deviation', () => {
    var r = new RNG(42)
    expect([r.randGaussian(10), r.randGaussian(10), r.randGaussian(10), r.randGaussian(10)])
      .toStrictEqual([
        -9.56162229384149,
        -2.730261048826104,
        -18.416271847835965,
        -11.408820709540242
      ])
  })
})