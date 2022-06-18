import { RNG } from "./rng.js";

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
  constructor(size, nInputs, randomSeed = 42) {
    this.nInputs = nInputs
    this.size = size

    this.perceptrons = []
    var r = new RNG(randomSeed)

    // add perceptrons to layer
    for(let i = 0; i < size; i++) {
      // initialize weight using He method
      var std = Math.sqrt(2/nInputs)
      var weights = []
      for(let j = 0; j < nInputs; j++) {
        weights.push(r.randGaussian(std))
      }

      this.perceptrons.push(new Perceptron(weights))
    }
  }

  evaluate(inputs) {
    if(inputs.length != this.nInputs) {
      throw new Error("Input size mismatch")
    }

    var outputs = []
    for(let i = 0; i < this.size; i++) {
      outputs.push(this.perceptrons[i].evaluate(inputs))
    }

    return outputs
  }
}

export {
  Perceptron,
  Layer
}