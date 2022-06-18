class RNG {
  constructor(seed = Math.random() * Math.MAX_SAFE_INTEGER) {
    this.state = seed
  }

  random() {
    var t = this.state += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  }

  randGaussian(std = 1) {
    var u = 0, v = 0;
    while(u === 0) u = this.random(); //Converting [0,1) to (0,1)
    while(v === 0) v = this.random();
    return std * Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v ); 
  }
}

var r = new RNG(632)
var rs = []
for(let i = 0; i < 4; i++) {
  rs.push(r.random())
}
console.log(rs)

export {
  RNG
}