// get random number between 0 and 1 generated with specified seed
function getRandomizer(a=42) {
  return function() {
    var t = a += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  }
}

// get array of random numbers between 0 and 1
function randoms(n = 1, seed = 42) {
  var rands = []
  var r = seed
  for(let i = 0; i < n; i++) {
    r = getRandomizer(r*Number.MAX_SAFE_INTEGER)()
    rands.push(r)
  }

  return rands
}


// get random gaussian number using randomizer and given standard deviation
function randGaussian(std = 1, randomizer = Math.random) {
  var u = 0, v = 0;
  while(u === 0) u = randomizer(); //Converting [0,1) to (0,1)
  while(v === 0) v = randomizer();
  return std * Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
}

export {
  getRandomizer,
  randGaussian,
  randoms
}