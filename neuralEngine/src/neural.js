class Perceptron {
  constructor(weights, bias = 0) {
    this.weights = weights;
    this.bias = bias
  }

  evaluate(inputs) {
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

class Layer {
  constructor(size, nInputs, randomSeed = Math.random()) {
    this.perceptrons = []

    // add perceptrons to layer
    for(let i = 0; i < size; i++) {
      // initialize weight using He method
      var std = Math.sqrt(2/nInputs)
      this.perceptrons.push()
    }
  }
}

export {
  Perceptron,
  Layer
}