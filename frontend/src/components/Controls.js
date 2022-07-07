const StructureControls = ({network, updateNetwork}) => {
  return (
    <div>
      <h3>Structure</h3>
      <form>
        <LayerInput i={0} value={network.nInputs}></LayerInput>
        {
          network.layers.map((l, i) => 
            <LayerInput key={i + 1} i={i + 1} value={l.size}>
            </LayerInput>
          )
        }
        <button>+</button>
        <button type="submit">Update</button>
      </form>
    </div>
  )
}

const LayerInput = ({i, value}) => {
  return (
    <div>
          <label>{i}  </label>
          <input
            type="number"
            id={`input_${i}`}
            data-input-node={i}
            value={value}
          >
          </input>
          <button>-</button>
    </div>
  )
}


export {
  StructureControls
}