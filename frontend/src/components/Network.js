import React from 'react'
import {useState} from 'react'
import chroma from "chroma-js"

const NetworkControls = ({network, setNetworkOutput}) => {
  const [inputs, setInputs] = useState([0, 0, 0, 0])

  const handleInputChange = (event) => {
    var newInputs = [...inputs]
    const i = event.target.dataset.inputNode
    const val = Number(event.target.value)

    newInputs[i] = val
    setInputs(newInputs)
    console.log(newInputs)
  }

  const updateOutput = (event) => {
    event.preventDefault()

    var o = network.evaluate(inputs).outputMap
    setNetworkOutput(o)
  }

  return (
    <div>
      <h2>Controls</h2>
      <h3>Inputs</h3>
      <form onSubmit={updateOutput}>
          {
            [...Array(network.nInputs)].map((el, i) => {
              return (
                <div key={i}>
                  <label>{i}  </label>
                  <input
                    type="number"
                    id={`input_${i}`}
                    data-input-node={i}
                    onChange={handleInputChange}
                  >
                  </input>
                </div>
              )
            })
          }
          <button type="submit">Run</button>
      </form>
    </div>
  )
}

const NetworkView = ({network, networkOutput}) => {
  const colorScale = chroma.scale(["black", "red"])

  return (
    <div>
      <h2>Neural Network</h2>
      <svg viewBox='0 0 1000 5000'>
      {
        networkOutput &&
        networkOutput.map((o, i) =>
          o.map((l, j) => 
            <circle
              cx={100 + i * 200}
              cy={50 + j * 100}
              r="20"
              style={{
                fill: colorScale(l)
              }}
            />
          ) 
        )
      }
      
      </svg>
    </div>
  )
}

export {
  NetworkView,
  NetworkControls
}