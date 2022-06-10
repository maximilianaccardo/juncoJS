class perceptron {
  constructor(weights, bias) {
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
  constructor(size) 
}