import { Network } from "junco"

const StructureControls = ({
  network,
  setNetwork,
  setNetworkOutput,
  netStructure,
  setNetStructure,
  inputs,
  setInputs
}) => {
  const handleStructureChange = (e) => {
    var newStructure = [...netStructure]

    const i = e.target.dataset.layer
    const val = e.target.value
 
    newStructure[i] = val
    setNetStructure(newStructure)
  }

  // remove layer when button clicked
  const handleLayerRemoval = (e) => {
    e.preventDefault()

    const i = e.target.dataset.layer
    var newStructure = netStructure.filter((_, j) => j !== Number(i))
    console.log(newStructure)
    setNetStructure(newStructure) 
  }

  // add layer when button clicked
  const handleLayerAddition = (e) => {
    e.preventDefault()

    const i = e.target.dataset.layer
    const newStructure = [...netStructure]
    const newLayerDefault = 4

    newStructure.splice(i+1, 0, newLayerDefault)

    setNetStructure(newStructure)
  }

  const updateNetwork = (e) => {
    e.preventDefault()

    const newNetwork = new Network(netStructure)

     // set new default inputs
     var n = newNetwork.nInputs
     const d = Array(Number(n)).fill(0)
     setInputs(d)
    
    setNetwork(newNetwork)
    setNetworkOutput(newNetwork.evaluate(d).outputMap)
  }

  return (
    <div>
      <h3>Structure</h3>
      <form onSubmit={updateNetwork}>
        {
          netStructure.map((l, i) => 
            <LayerInput
              key={i}
              i={i}
              value={l}
              handleStructureChange={handleStructureChange}
              handleLayerRemoval={handleLayerRemoval}
              handleLayerAddition={handleLayerAddition}
              >
            </LayerInput>
          )
        }
        <button type="submit">Update</button>
      </form>
    </div>
  )
}

const LayerInput = ({
  i,
  value,
  handleStructureChange,
  handleLayerRemoval,
  handleLayerAddition
}) => {
  return (
    <div>
          <label>{i}  </label>
          <input
            type="number"
            id={`structure_input_${i}`}
            data-layer={i}
            value={value}
            onChange={handleStructureChange}
          >
          </input>
          <button data-layer={i} onClick={handleLayerRemoval}>-</button>
          <button data-layer={i} onClick={handleLayerAddition}>+</button>
    </div>
  )
}

const InputControls = ({
  inputs,
  setInputs,
  network,
  setNetworkOutput
}) => {
  const handleFocus = e => e.target.select()

  const handleInputChange = (event) => {
    var newInputs = [...inputs]
    const i = event.target.dataset.inputNode
    const val = Number(event.target.value)

    newInputs[i] = val
    setInputs(newInputs)
  }

  const updateOutput = (event) => {
    event.preventDefault()

    var o = network.evaluate(inputs).outputMap
    setNetworkOutput(o)
  }

  return (
    <form onSubmit={updateOutput}>
    {
      inputs.map((el, i) => {
        return (
          <div key={i}>
            <label>{i}  </label>
            <input
              type="number"
              id={`input_${i}`}
              data-input-node={i}
              onChange={handleInputChange}
              value={el}
              onFocus={handleFocus}
            >
            </input>
          </div>
        )
      })
    }
    <button type="submit">Run</button>
</form>
  )
}

export {
  StructureControls,
  InputControls
}