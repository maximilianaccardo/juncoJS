import { Network } from "junco"

const StructureControls = ({network, setNetwork, setNetworkOutput, netStructure, setNetStructure, inputs}) => {
  const handleStructureChange = (e) => {
    var newStructure = [...netStructure]

    const i = e.target.dataset.layer
    const val = e.target.value
    console.log(i,val)

    newStructure[i] = val
    console.log(newStructure)
    setNetStructure(newStructure)
  }

  const updateNetwork = (e) => {
    e.preventDefault()
    setNetwork(new Network(netStructure))
    setNetworkOutput(network.evaluate(inputs).outputMap)
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
              handleStructureChange={handleStructureChange}>
            </LayerInput>
          )
        }
        <button type="submit">Update</button>
      </form>
    </div>
  )
}

const LayerInput = ({i, value, handleStructureChange}) => {
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
          <button>-</button>
          <button>+</button>
    </div>
  )
}


export {
  StructureControls
}