import { getRandomizer, randoms, randGaussian } from "../src/mathExtras"

describe('getRandomizer', () => {
  test('randomizer generates same results with same seed', () => {
    var r = getRandomizer(42)
    expect([r(), r(), r(), r()])
      .toStrictEqual([
          0.6011037519201636,
          0.44829055899754167,
          0.8524657934904099,
          0.6697340414393693
        ])
  })
})

describe('randoms', () => {
  test('generates same random numbers from given seed', () => {
    expect(randoms(4, 42))
      .toStrictEqual([
          0.8036511461250484,
          0.6387486082967371,
          0.8804983065929264,
          0.3318546339869499
        ])
  })
})

// test('randGaussian generates expected pseudorandom values', () => {
//   r = function() {
//     var t = 42 += 0x6D2B79F5;
//     t = Math.imul(t ^ t >>> 15, t | 1);
//     t ^= t + Math.imul(t ^ t >>> 7, t | 61);
//     return ((t ^ t >>> 14) >>> 0) / 4294967296;
//   }
// })