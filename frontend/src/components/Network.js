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

export {
  NetworkControls,
  NetworkOptions
}