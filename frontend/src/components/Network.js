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

  // calculate locations of nodes
  const nodes = []

  if(networkOutput) {
    // vertical spacing between nodes
    const vSpace = 100

    // get vertical center of graph
    const maxLayer = Math.max(
      ...networkOutput.map((l) => 
        l.length
      )
    )
    const vCenter = (vSpace * maxLayer) / 2

    networkOutput.forEach((o, i) => {
      const layerNodes = []
      let vStart = vCenter - (((o.length - 1) / 2) * vSpace)
      o.forEach((l, j) => {
        let node = {}
        node.x = 100 + i * 170
        node.y = vStart + j * vSpace
        node.color = colorScale(l)
        layerNodes.push(node)
      })
      nodes.push(layerNodes)
    })
  }

  // calculate locations of lines
  const lines = []
  for(let i = 0; i < nodes.length - 1; i ++) {
    for(let j = 0; j < nodes[i].length; j++) {
      for(let k = 0; k < nodes[i + 1].length; k++) {
        let line = {}

        // starting node
        line.x1 = nodes[i][j].x
        line.y1 = nodes[i][j].y

        // node in next layer
        line.x2 = nodes[i + 1][k].x
        line.y2 = nodes[i + 1][k].y

        lines.push(line)
      }
    }
  }

  return (
    <div>
      <h2>Neural Network</h2>
      <svg viewBox='0 0 1200 4000'>
        {
          lines.map((l, i) => 
            <line
              key={i}
              x1={l.x1}
              y1={l.y1}
              x2={l.x2}
              y2={l.y2}
              stroke="black"
            />
          )
        }
        {
          nodes.flat().map((n) => 
            <circle
              cx={n.x}
              cy={n.y}
              r="20"
              style={{
                fill: n.color
              }}
            />
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