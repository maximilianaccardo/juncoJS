import { RNG } from "./rng.js";
import { getId } from "./id.js"
import { relu } from "./activation.js"

class Perceptron {
  constructor(weights, params = {}) {
    const defaults = {
      activation: relu,
      bias: 0
    }
    params = {...defaults, ...params}
    
    this.activation = params.activation
    this.weights = weights
    this.bias = params.bias
  }

  evaluate(inputs, params) {
    const defaults = {
      verbose: false,
    }
    params = { ...defaults, ...params }

    if(inputs.length != this.weights.length) {
      throw new Error('Weights and inputs must be same length')
    }
    else {
      var z = 0

      for(let i = 0; i < inputs.length; i++) {
        // add each input to sum according to weights
        z += inputs[i] * this.weights[i]
      }

      // add bias
      z = z + this.bias

      // apply activation function
      const a = this.activation(z)
  
      if(params.verbose) {
        return {
          activation: a,
          z: z,
          bias: this.bias,
          weights: this.weights
        }
      }
      else {
        return a
      }
      
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

  // iterate over perceptrons
  iterate(f) {
    for(perceptron in this.perceptrons) {
      f(perceptron)
    }
  }

  evaluate(inputs, params) {
    const defaults = {
      verbose: false
    }
    params = {...defaults, ...params}

    if(inputs.length != this.nInputs) {
      throw new Error(`Input size mismatch: expected ${this.nInputs} got ${inputs.length}`)
    }

    var outputs = []

    // iterate through perceptrons
    for(let i = 0; i < this.size; i++) {
      var p = this.perceptrons[i]

      // evaluate each perceptron with inputs
      var output = p.evaluate(inputs, {verbose: params.verbose})

      // add activation from each perceptron to output
      outputs.push(output)
    }

    return outputs
  }
}

class Network {
  // private fields
  #zeroNabla

  constructor(sizes, seed = 42) {
    this.layers = []
    this.sizes = sizes
    this.nInputs = this.sizes[0]
    this.nOutputs = this.sizes[this.sizes.length - 1]

    // add layers to network
    for(let i = 1; i < sizes.length; i++) {
      this.layers.push(new Layer(sizes[i], sizes[i - 1], seed))
    }

    // starting nablas (used for training)
    this.#zeroNabla = this.layers.map(l => {
      l.perceptrons.map(p => {
        return {
          weights: Array(p.weights.length).fill(0),
          bias: 0
        }
      })
    })
  }

  // get output of neural network
  evaluate(inputs) {
     var outputMap = [inputs]
    for(let i = 0; i < this.layers.length; i++) {
      let l = this.layers[i]

      inputs = l.evaluate(inputs)
      outputMap.push(inputs)
    }
    

    return new NetworkOutput({
      outputs: inputs,
      outputMap: outputMap
    })
  }

  // iterate over each layer
  iterate(f) {
    for(layer in this.layers) {
      f(layer)
    }
  }

  // train on one mini-batch of examples
  train_batch(batch) {

  
    for(example in batch) {
      var nabla = this.#zeroNabla

    }
  }

  // run backpropagation one one example
  backprop(x, y) {
    nabla = this.#zeroNabla


  }
}

class NetworkOutput {
  constructor(outputs) {
    this.outputs = outputs.outputs
    this.outputMap = outputs.outputMap
  }

  // calculate loss
  loss(expectedOutputs, lossFunc="mse") {
    if(lossFunc == "mse") {
      lossFunc = this.#mse
    }

    return lossFunc(this.outputs, expectedOutputs)
  }

  // mean squared error
  #mse(actual, expected) {
    var loss = 0

    for(let i = 0; i < actual.length; i++) {
      loss += (actual[i] - expected[i]) ** 2
    }

    return loss
  }
}

export {
  Perceptron,
  Layer,
  Network,
  NetworkOutput
}