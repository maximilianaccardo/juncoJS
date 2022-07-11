import { Network } from "junco"
import { GenericInput } from "./Inputs"

const StructureControls = ({
  network,
  setNetwork,
  setNetworkOutput,
  netStructure,
  setNetStructure,
  inputs,
  setInputs
}) => {
  // update structure state when input changed
  const handleStructureChange = (e) => {
    var newStructure = [...netStructure]

    const i = e.target.dataset.i
    const val = Number(e.target.value)
 
    newStructure[i] = val
    console.log(newStructure)
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

  // replace network when update pressed with new strucutre
  const updateNetwork = (e) => {
    e.preventDefault()

    const newNetwork = new Network(netStructure)

     // set new default inputs
     var n = newNetwork.nInputs
     const d = Array(Number(n)).fill(0)
     setInputs(d)
    
    setNetwork(newNetwork)
    setNetworkOutput(newNetwork.evaluate(d))
  }

  return (
    <div>
      <h3>Structure</h3>
      <form onSubmit={updateNetwork}>
        {
          netStructure.map((l, i) => 
            <div key={i}>
              <GenericInput
                handleInputChange={handleStructureChange}
                value={l}
                i={i}
                idPrefix="strucutre_input"
              >
              </GenericInput>
              <button data-layer={i} onClick={handleLayerRemoval}>-</button>
              <button data-layer={i} onClick={handleLayerAddition}>+</button>
            </div>
          )
        }
        <button type="submit">Update</button>
      </form>
    </div>
  )
}

const InputControls = ({
  inputs,
  setInputs,
  network,
  setNetworkOutput
}) => {
  // change input state when form changed
  const handleInputChange = (event) => {
    var newInputs = [...inputs]
    const i = event.target.dataset.i
    const val = Number(event.target.value)

    newInputs[i] = val
    setInputs(newInputs)
  }

  // evaluate new output of network
  const updateOutput = (event) => {
    event.preventDefault()

    var o = network.evaluate(inputs)
    setNetworkOutput(o)
  }

  return (
    <form onSubmit={updateOutput}>
    {
      inputs.map((el, i) => {
        return (
          <div key={i}>
            <GenericInput
              handleInputChange={handleInputChange}
              idPrefix="input"
              i={i}
              value={el}
            >
            </GenericInput>
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