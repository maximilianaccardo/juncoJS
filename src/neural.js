// get random gaussian number with standard deviation using Box-Muller transform
function randGaussian(std = 1) {
  var u = 0, v = 0;
  while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
  while(v === 0) v = Math.random();
  return std * Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
}

class perceptron {
  constructor(weights, bias = 0) {
    this.weights = weights;
    this.bias = bias
  }

  calculateOutput(inputs) {
    if(inputs.length != this.weights.length) {
      throw new Error('Weights and inputs must be same length')
    }
    else {
      var a = 0

      for(let i = 0; i < inputs.length; i++) {
        // add each input to sum according to weights
        a += inputs[i] * this.weights[i]
      }

      // add bias
      var a = a + this.bias

      // apply relu
      return Math.max(0, a)
    }
  }
}

class layer {
  constructor(size, nInputs) {
    this.perceptrons = []

    // add perceptrons to layer
    for(let i = 0; i < size; i++) {
      // initialize weight using He method
      var std = 
      this.perceptrons.push()
    }
  }
}