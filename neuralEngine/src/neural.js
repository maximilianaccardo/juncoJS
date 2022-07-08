import { RNG } from "./rng.js";
import { getId } from "./id.js"

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
    this.id = getId()

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
      throw new Error(`Input size mismatch: expected ${this.nInputs} got ${inputs.length}`)
    }

    var outputs = []
    for(let i = 0; i < this.size; i++) {
      outputs.push(this.perceptrons[i].evaluate(inputs))
    }

    return outputs
  }
}

class Network {
  constructor(sizes, seed = 42) {
    this.layers = []
    this.sizes = sizes
    this.nInputs = this.sizes[0]

    // add layers to network
    for(let i = 1; i < sizes.length; i++) {
      this.layers.push(new Layer(sizes[i], sizes[i - 1], seed))
    }
  }

  // get output of neural network
  evaluate(inputs) {
     var outputMap = [inputs]
    for(let i = 0; i < this.layers.length; i++) {
      let l = this.layers[i]

      inputs = l.evaluate(inputs)
      outputMap.push(inputs)
    }
    

    return {
      outputs: inputs,
      outputMap: outputMap
    }
  }
}

export {
  Perceptron,
  Layer,
  Network
}