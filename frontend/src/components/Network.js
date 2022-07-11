import React from 'react'
import chroma from "chroma-js"

import { StructureControls, InputControls } from './Controls'

const NetworkControls = ({
    network,
    setNetwork,
    setNetworkOutput,
    netStructure,
    setNetStructure,
    inputs,
    setInputs
  }) => {
  return (
    <div>
      <h2>Controls</h2>
      <StructureControls
          setNetwork={setNetwork}
          network={network}
          netStructure={netStructure}
          setNetStructure={setNetStructure}
          setNetworkOutput={setNetworkOutput}
          inputs={inputs}
          setInputs={setInputs}
      ></StructureControls>
      <h3>Inputs</h3>
      <InputControls
        inputs={inputs}
        setInputs={setInputs}
        network={network}
        setNetworkOutput={setNetworkOutput}
      ></InputControls>
    </div>
  )
}

const NetworkOptions = ({
  options,
  setOptions
}) => {
  const handleOptionChange = e => {
    var newOptions = structuredClone(options)
    newOptions[e.target.dataset.option] = e.target.checked
    console.log(e.target.checked)
    setOptions(newOptions)
  }

  return (
    <div>
      <h2>Options</h2>
      <input
        type="checkbox"
        id="cbEnableTraining"
        checked={options.training}
        data-option="training"
        onChange={handleOptionChange}
      ></input>
      <label>Enable Training</label>
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
      ...networkOutput.outputMap.map((l) => 
        l.length
      )
    )
    const vCenter = (vSpace * maxLayer) / 2

    // calculate locations of nodes
    networkOutput.outputMap.forEach((o, i) => {
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

        // get stroke from starting node
        line.stroke = nodes[i][j].color
      
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
              stroke={l.stroke}
            />
          )
        }
        {
          nodes.flat().map((n, i) => 
            <circle
              key={i}
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
  NetworkControls,
  NetworkOptions
}